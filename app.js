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

app.get('/apis/orders',function (req,res) {
  Orders.getOrders( function (err, orderList) {
    if(err) throw err;
    res.json(orderList);
  });
});

app.get('/apis/cart',function (req,res) {
  Cart.getCart( function (err, cart) {
    if(err) throw err;
    res.json(cart);
  });
});





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

	// Validation
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('password', 'Password is required').notEmpty();
	req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

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
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  });

app.get('/apis/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/');
});



app.listen(3000);
console.log("running!!!");
