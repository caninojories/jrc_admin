"use strict";

angular.module('app.paragala')
  .directive('studentLogout', function ($routeParams, ParagalaStudent, Restangular) {
    return {
      restrict : "E",
      replace : true,
      controller : function ($scope, $location, $route) {
        $scope.studentLogout = function() {
          ParagalaStudent.all('logout').post().then(function (response) {
            if(response.response == "success"){
              $location.path('/paragala')
            }
          });

        }
      },
      template :  '<button ng-click="studentLogout()" class="btn btn-success btn-xs"><i class="fa fa-signin"></i> &nbsp;Student Logout</button>'
    }
  })
