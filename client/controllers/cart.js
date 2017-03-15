app.controller("cart", cartController);

function cartController($scope, $rootScope, $http, $location, $route) {
    console.log("ran!!");
    $scope.cartInit = function(){
      $scope.getUser();
      // $scope.getCart();
      // $scope.getTotal();
      // $scope.getProducts();
      console.log("ran?");
    }
    $scope.getUser = function(){
      console.log("ran here?");
      $http.get('/apis/isUser').then(function(response){
        console.log("get user");
        $rootScope.user = response.data;
        console.log(response.data);
        console.log($rootScope.user.userId);
        $http.get('/apis/getCart/'+$rootScope.user.userId).then(function(response){
          console.log("get cart function "+ $rootScope.user.userId);
          $scope.productList = response.data.cartItems;
          var total = 0;
          for(var i = 0; i < $scope.productList.length; i++){
              var product = $scope.productList[i];
              console.log(product);
              total += (product.price * product.qty);
          }
          console.log(total);
          $scope.cartTotal =  total;
        });
      });
    }
    $scope.removeFromCart = function(userId, productId){
      $http.put("/apis/removeFromCart", {userId : userId, productId : productId}).then(function(error){
        alert("removed from cart");
        $route.reload();
      })
    }

}
