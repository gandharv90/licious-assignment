var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        controller : 'products',
        templateUrl : "views/productList.html"
    })
    .when("/signup", {
        controller : 'userAuth',
        templateUrl : "views/signup.html"
    })
    .when("/orders", {
        controller : 'orders',
        templateUrl : "views/placeOrder.html"
    })
    .when("/login", {
        templateUrl : "views/login.html"
    })
    .when("/cart", {
      controller : 'cart',
        templateUrl : "views/cart.html"
    })
});
