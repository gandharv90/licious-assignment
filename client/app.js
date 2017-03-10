var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        controller : 'products',
        templateUrl : "views/productList.html"
    })
    .when("/signup", {
        controller : 'accounts',
        templateUrl : "views/signup.html"
    })
    .when("/orders", {
        controller : 'orders',
        templateUrl : "views/placeOrder.html"
    })
    .when("/login", {
        templateUrl : "views/login.html"
    })
});
