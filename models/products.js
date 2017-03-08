const mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
  name : {
    type : String,
    required : true,
  },
  createdAt : {
    type : Date,
    default : Date.now
  },
  stock : Number
});

var Products = module.exports = mongoose.model('Products', productsSchema);


//get product list

module.exports.getProducts = function (callback , limit) {
  var query = {};
  var options = {};
  Products.find(query, options, callback).limit(limit);
}

module.exports.getProductbyId = function (productId, callback) {
  var query = {_id : productId};
  var options = {};
  Products.findOne(query, options, callback);
}
