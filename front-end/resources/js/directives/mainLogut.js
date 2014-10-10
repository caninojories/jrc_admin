"use strict";

angular.module('ngAPI')
  .directive('mainLogout', function ($routeParams, ParagalaAdmin, Restangular, loginService) {
    return {
      restrict : "E",
      replace : true,
      controller : function ($scope, $location) {
      	$scope.logout = function () {
          ParagalaAdmin.all('logout').post();
          //$location.path('/')
          setTimeout(function () {
            window.location.reload();
          }, 500)
        }
      },
      template :  '<a href=""><span ng-click="logout()"> Sign-Out </span></a>'
    }
  })
