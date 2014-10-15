"use strict";

angular.module('ngAPI')
  .directive('mainLogin', function ($routeParams, Admin, Restangular, loginService) {
    return {
      restrict : "E",
      replace : true,
      controller : function ($scope,$location, $route,  $timeout) {
        $scope.item;
      	$scope.login = function (email, password) {
          if($scope.loginForm.$valid) {
        		$scope.result = Admin.all('users').post({email:email, password: password}).then(function (valid) {
              //console.log(valid.adminUser)
              if(valid.valid == "success") {
                window.location.href = "#/dashboard";
                location.reload();
              } else {
                $scope.valid = valid;
              }
            })
          }
        }
      },
      template :  '<button id="mainLogin" class = "btn btn-success btn-sm" type="submit" ng-click="login(email, password)">Login</button>'
    }
  })
