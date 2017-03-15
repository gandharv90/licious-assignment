const mongoose = require('mongoose');

var ordersSchema = mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  products : [{
    productId : {
      type : String,
      required : true
    },
    qty : {
      type : Number,
      required : true
    },
    price : Number,
    name : String
  }],
  address : {
    type : String
  },
  state : String,
  city : String,
  phone : String,
  orderAmount : Number
});

var Orders = module.exports = mongoose.model('Orders', ordersSchema);

module.exports.getOrders = function (userId, callback ,limit) {
  Orders.find({userId : userId},callback).limit(limit);
}

module.exports.placeNewOrder = (userId,address,state, city, phone, products, orderAmount, callback) => {
  console.log(products + " from orders.js");
  console.log(userId,address,state, city, phone, products, orderAmount);
  var order = {
    userId : userId,
    address : address,
    state : state,
    city : city,
    phone : phone,
    products : products,
    orderAmount : orderAmount
  }
	Orders.create(order, callback);
}
