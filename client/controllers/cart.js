app.controller("cart", cartController);

function cartController($scope, $rootScope, $http) {
    console.log("ran!!");
    $scope.getUser = function(){
      $http.get('/apis/isUser').then(function(response){
        $rootScope.user = response.data;
        console.log(response.data);
      });
    }
    $scope.getCart = function(){
      $http.get('/apis/getCart/'+$rootScope.user.userId).then(function(response){
        $scope.productList = response.data.cartItems;
      });
    }
    $scope.cartInit = function(){
      $scope.getUser();
      $scope.getCart();
      // $scope.getProducts();
      console.log("ran?");
    }
}
