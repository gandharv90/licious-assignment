app.controller("products", function ($scope, $http) {
    console.log("ran!!");
    $scope.getProducts = function(){
      $http.get('/apis/productList').then(function(response){
        console.log(response.data);
        $scope.products = response.data;
      });
    }
    $scope.addToCart = function(productId){
      console.log(productId);
    }
});
