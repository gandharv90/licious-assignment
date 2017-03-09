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
    }
  }],
  address : {
    type : String
  },
  phone : {
    type : Number
  }
});

var Orders = module.exports = mongoose.model('Orders', ordersSchema);

// module.exports.getOrders = function (callback ,userId, limit) {
//   Orders.find(callback).limit(limit);
// }

module.exports.placeNewOrder = (userId,address, phone, products,callback) => {
  console.log(products + " from orders.js");
  var order = {
    userId : userId,
    address : address,
    phone : phone,
    products : products
  }
	Orders.create(order, callback);
}
