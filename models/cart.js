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
      required : true,
      min : 0
    }
  }]
});

var Cart = module.exports = mongoose.model('Cart', cartSchema);

//create cart on register
module.exports.createCart = function (newUser ,callback) {
  console.log("cart");
  console.log(newUser);
  Cart.create({userId : newUser},callback);
}

module.exports.getCart = function (callback ,limit) {
  console.log("working?");
  Cart.find(callback).limit(limit);
}

module.exports.getCurrentCart = function(userId, callback){
  Cart.findOne({userId : userId},{_id : 0, cartItems : 1}, callback);
}

module.exports.updateCart = function(userId, updatedCart, options, callback){
  var query = {userId : userId};
  var updateOptions = {$set : {cartItems : updatedCart}};
  Cart.findOneAndUpdate(query, updateOptions, options, callback);

}
