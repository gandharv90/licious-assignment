//imports
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
var flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');


//controllers
Products = require('./models/products');
Orders = require('./models/orders');
Cart = require('./models/cart');
User = require('./models/user.js');

// iniciate app
const app = express();

//connect to db
mongoose.connect('mongodb://localhost/licious');
const db = mongoose.connection;

//static client side code
app.use(express.static(__dirname+'/client'));

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//passoport and sessions
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


////////////////////////////////////////////////////
////////////////////////////////////////////////////
//////////////////UI APIs///////////////////////////
////////////////////////////////////////////////////
////////////////////////////////////////////////////

app.get('/apis/productList',function (req,res) {
  Products.getProducts( function (err, productList) {
    if(err) throw err;
    res.json(productList);
  });
});

app.get('/apis/isUser',function (req,res) {
  var isUser = req.user ? true : false;
  var userId = req.user ? req.user._id : false;
  console.log(req.session.userId);
  res.json({
    isUser : isUser,
    userId : userId
  });
});

app.get('/apis/product/:_id', (req, res) => {
  var productId = req.params._id;
	Products.getProductbyId(productId, (err, product) => {
		if(err){
			throw err;
		}
		res.json(product);
	});
});

app.get('/apis/cart',function (req,res) {
  if(req.user){
  console.log(req.user.username);
}
  Cart.getCart( function (err, cart) {
    if(err) throw err;
    res.json(cart);
  });
});

//cart
app.put('/apis/addToCart', function(req,res){
  var userId = req.user._id;
  console.log(userId);
  var productId = req.body.productId;
  console.log(productId);
  var productPrice = req.body.productPrice;
  console.log(productPrice);
  var productName = req.body.productName;
  console.log(productName);

  Cart.getCurrentCart(userId , function(error, currentCart){
    if(error) throw error;
    console.log(currentCart.cartItems);
    function lookup( name ) {
      for(var i = 0, len = currentCart.cartItems.length; i < len; i++) {
        console.log();
        if( currentCart.cartItems[ i ].productId === name )
          return true;
      }
      return false;
    }
    var updatedCart;
    console.log(productId,  currentCart.cartItems);
    if(lookup(productId)) {
      console.log(true);
      updatedCart = currentCart.cartItems.map(function(x){
        if(x.productId == productId){
          if(x.qty < 0){
            x.qty = 1;
            x.price = productPrice;
            x.name = productName;
            return;
          } else {
            x.qty = x.qty +1 ;
            x.price = productPrice;
            x.name = productName;
          }
        }

        return x;
      });
    } else {
      console.log(false);
      updatedCart = currentCart.cartItems;
      updatedCart.push({productId : productId , qty : 1, price :productPrice, name : productName });
    }
    console.log("this is updated cart happy? " + updatedCart);
    Cart.updateCart(userId, updatedCart, {}, function (err, cart) {
      if(err) throw err;
      res.json(cart);
    });
  });
})

app.put('/apis/removeFromCart', function(req,res){
  var userId = req.body.userId;
  console.log(userId);
  var productId = req.body.productId;
  console.log(productId);

  Cart.getCurrentCart(userId , function(error, currentCart){
    if(error) throw error;
    console.log(currentCart.cartItems);
    function lookup( name ) {
      for(var i = 0, len = currentCart.cartItems.length; i < len; i++) {
        console.log();
        if( currentCart.cartItems[ i ].productId === name )
          return true;
      }
      return false;
    }
    var updatedCart;
    console.log(productId,  currentCart.cartItems);
    if(lookup(productId)) {
      console.log(true);
      updatedCart = currentCart.cartItems.map(function(x){
        if(x.productId == productId){
          x.qty = 0;
        }
        return x;
      });
    } else {
      console.log(false);
      updatedCart = currentCart.cartItems;
      updatedCart.push({productId : productId , qty : 1}); //needed for a bug fix
    }
    console.log("this is updated cart happy? " + updatedCart);
    Cart.updateCart(userId, updatedCart, {}, function (err, cart) {
      if(err) throw err;
      res.json(cart);
    });
  });
})


app.put('/apis/removeCart', function(req,res){
  var userId = req.body.userId;
  console.log(userId);
  Cart.getCurrentCart(userId , function(error, currentCart){
    var updatedCart = [];
    Cart.updateCart(userId, updatedCart, {}, function (err, cart) {
      if(err) throw err;
      res.json(cart);
    });
  });
})

app.get('/apis/getCart/:userId', function(req,res){
  var userId = req.params.userId;
  console.log(userId + "cart");
  Cart.getCurrentCart(userId , function(error, currentCart){
    res.json(currentCart);
  });
})



app.get('/apis/orders/user/:userId',function (req,res) {
  var userId = req.params.userId;
  Orders.getOrders(userId, function (err, orderList) {
    if(err) throw err;
    res.json(orderList);
  });
});

app.post('/apis/placeNewOrder', function(req, res){
  var userId = req.body.userId;
  var cartId = req.body.cart;
  var address = req.body.address;
  var phone = req.body.phone;

  var products =   Cart.getCurrentCart(userId , function(error, currentCart){
    var products = currentCart.cartItems;
      console.log(products[0]);
    Orders.placeNewOrder(userId,address, phone, products, function(error, order){
      if(error) throw error;
      res.json(order);
    });
    });

})

////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////////Auth Apis//////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

app.post('/apis/signup',function (req,res) {
  var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
  var phone = req.body.phone

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('phone', 'Phone is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
    console.log(errors);
    var errorResponse = {
      status : "error",
      errors : errors
    }
    res.json(errorResponse);
	} else {
		var newUser = new User({
			name: name,
			email:email,
			username: username,
			password: password
		});
		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
      var successresponse = {
        status : "success",
        user : user
      }
      Cart.createCart(user._id, function(error){
        if(error) throw error;
        return;
      });
      console.log("user created");
      res.json(successresponse);
		});
	}
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid password'});
   		}
   	});
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

app.post('/apis/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/#!/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/#!/');
  });

app.get('/apis/logout', function(req, res){
	req.logout();
	res.redirect('/#!/');
});

app.get('/test', function(req,res){
  console.log(req.user);
});

app.listen(3000);
console.log("running!!!");
