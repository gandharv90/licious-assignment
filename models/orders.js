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
  }]
});

var Orders = module.exports = mongoose.model('Orders', ordersSchema);

module.exports.getOrders = function (callback ,userID, limit) {
  Orders.find(callback).limit(limit);
}
