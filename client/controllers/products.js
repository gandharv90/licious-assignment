app.controller("products", function ($scope, $http) {
    $scope.getProducts = function(){
      $http.get('/apis/productList').then(function(response){
        $scope.products = response.data;
      });
}
});
