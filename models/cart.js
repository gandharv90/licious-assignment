const mongoose = require('mongoose');

var cartSchema = mongoose.Schema({
  userId : {
    type : String,
    required : true,
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  updatedAt : {
    type : Date,
    default : Date.now
  },
  cartItems : [{
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

var Cart = module.exports = mongoose.model('Cart', cartSchema);


module.exports.getCart = function (callback ,limit) {
  console.log("working?");
  Cart.find(callback).limit(limit);
}
