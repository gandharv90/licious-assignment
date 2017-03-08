var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/products", {
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
});
