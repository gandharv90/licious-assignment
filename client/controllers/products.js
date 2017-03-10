app.controller("products", productsController);

function productsController($scope, $http) {
    console.log("ran!!");
    $scope.getUser = function(){
      $http.get('/apis/isUser').then(function(response){
        $scope.user = response.data;
        console.log(response.data);
      });
    }
    $scope.getProducts = function(){
      $http.get('/apis/productList').then(function(response){
        $scope.products = response.data;
      });
    }
    $scope.addToCart = function(productId){
      console.log(productId);
    }
    $scope.homeInit = function(){
      $scope.getUser();
      $scope.getProducts();
    }
    $scope.addToCart = function(userId, productId,productPrice){
      $http.put('/apis/addToCart', {
        userId : userId,
        productId : productId,
        productPrice : productPrice}
      ).then(function(){
        alert("added to cart");
      })
    }

}
