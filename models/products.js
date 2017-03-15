const mongoose = require('mongoose');

var productsSchema = mongoose.Schema({
  name : String,
  price : Number,
  description : String,
  imageUrl : String,
  author : String
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
