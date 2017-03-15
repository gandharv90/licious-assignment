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
      if(confirm("Remove from cart?")){
        $http.put("/apis/removeFromCart", {userId : userId, productId : productId}).then(function(error){
          $route.reload();
        })
      } else {
        return false;
      }
    }
    $scope.deleteCart = function(userId){
      if(confirm("Delete cart?")){
        $http.put("/apis/deleteCart",{userId : userId}).then(function(){
          $route.reload();
        })
      } else {
        return false
      }
    }
    $scope.placeOrder = function(productList,cartTotal){
      var userId = $rootScope.user.userId;
      var address = $scope.address;
      var state= $scope.state;
      var city = $scope.city;
      var phone = $scope.phone;
      var products = productList;
      var orderAmount = cartTotal;
      console.log(userId && address && state && city && phone && products && orderAmount);
      if(userId && address && state && city && phone && products && orderAmount){
        $http.post('/apis/placeNewOrder', {
          userId : userId,
          address : address,
          state : state,
          city : city,
          phone : phone,
          products : productList,
          orderAmount : cartTotal
        }).then(function(){
          console.log("order placed!!");
          $http.put("/apis/deleteCart",{userId : $rootScope.user.userId}).then(function(){
            return false
          })
          $location.path('/orders')
        })
      } else {
        return false
      }
    }
}
