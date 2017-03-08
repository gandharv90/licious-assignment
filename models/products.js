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
  var options = {_id : 1};
  Products.find(query, options, callback).limit(limit);
}
