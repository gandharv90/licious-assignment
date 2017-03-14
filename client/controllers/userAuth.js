app.controller("userAuth", userAuthController);

function userAuthController ($scope, $http, $location){
  $scope.register = function(e){
    e.preventDefault();
    $http.post("apis/signup", {
      name : $scope.name,
      username : $scope.username,
      phone : $scope.phone,
      password : $scope.password,
      password2 : $scope.password2,
      email : $scope.email
    }).then(function(response){
      console.log(response);
      if(response.data.status == "error"){
        $scope.errors = response.data.errors;
        $location.path("/signup");
      } else if(response.data.status == "success") {
        $location.path("/login");
      } else {
        $location.path("/signup");
      }
    })

  }
}
