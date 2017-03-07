var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/products", {
        controller : 'products',
        templateUrl : "views/productList.html"
    })
});
