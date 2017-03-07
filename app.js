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

//static client side code
app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());

//connect to db
mongoose.connect('mongodb://localhost/licious');
const db = mongoose.connection;

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

app.listen(3000);
console.log("running!!!");
