//imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

Products = require('./models/products');
Orders = require('./models/orders');
Cart = require('./models/cart');


//static client side code
app.use(express.static(__dirname+'/client'));

//connect to db
mongoose.connect('mongodb://localhost/licious');
const db = mongoose.connection;

app.get('/', function (req, res) {
  res.send("hello!!");
});

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
