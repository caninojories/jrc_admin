"use strict";

angular.module('ngAPI')
  .directive('studentLogin', function ($routeParams, ParagalaStudent, Restangular) {
    return {
      restrict : "E",
      replace : true,
      controller : function ($scope, $location, $route) {
        $scope.studentLogin = function(SN) {
          ParagalaStudent.one('student').get({studentNumber: SN}).then(function (response) {
            if($scope.studentForm.$valid) {
              if(response.response == 'success' && response.isAlreadyVoted == "false") {
                $scope.response = false;
                $location.path('/paragala/questions');
                setTimeout(function () {
                  window.location.reload();
                }, 100)
              } else {
                $scope.response = true;
                if(response.isAlreadyVoted == "true") {
                  $scope.error = "This #" + SN + "is already VOTED"
                } else {
                  $scope.error = "Unrecognized Student Number for #" + SN;
                }
              }
            }
          })
        }
      },
      template :  '<button ng-model="response" ng-click="studentLogin(SN)" class="btn btn-success" data-toggle="modal" data-target="#myModal"><i class="fa fa-sign-in"> &nbsp;Sign-in</i></button>'
    }
  })
