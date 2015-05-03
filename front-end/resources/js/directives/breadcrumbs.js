"use strict";

angular.module('ngAPI')
  .directive('breadCrumbs', function ($stateParams) {
    return {
      restrict : "E",
      controller : function ($scope) {
        var rootUrl = '/database';
        $scope.crumbs = [{url : rootUrl, text : "Database"}];
        var runningUrl = rootUrl;
        var counter = 0;
        for(var param in $stateParams) {
          if(counter === 0) {
            runningUrl = '/database'
            counter += 1;
          }
          runningUrl += '/' + $stateParams[param];
          $scope.crumbs.push({url : runningUrl, text : $stateParams[param]})
        }
        $scope.notLast = function (crumb){
          return crumb !== _.last($scope.crumbs)
        }
      },
      template :  '<div class = "row">' +
                    '<div class = "col-lg-12">' +
                      '<ol class = "breadcrumb">' +
                        '<li ng-repeat = "crumb in crumbs">' +
                          '<a href = "{{crumb.url}}"> {{crumb.text}} </a>' +
                        '</li>' +
                      '</ol>' +
                    '</div>' +
                  '</div>'
    }
  })
