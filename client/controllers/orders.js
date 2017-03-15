app.controller("orders", orderController);

function orderController ($scope, $rootScope, $http){
  console.log("orderController");
  $scope.getUserOrders = function(){
    console.log("ran here?");
    $http.get('/apis/isUser').then(function(response){
      console.log("get user");
      $rootScope.user = response.data;
      console.log(response.data);
      console.log($rootScope.user.userId);
      $http.get('/apis/orders/user/'+$rootScope.user.userId).then(function(response){
        console.log("get order function "+ $rootScope.user.userId);
        $scope.orderList = response.data;
      });
    });
  }
}
