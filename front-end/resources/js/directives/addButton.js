"use strict";

angular.module('ngAPI')
  .directive('addButton', function ($routeParams, restangularService) {
    return {
      restrict : "E",
      replace : true,
      controller : function ($scope) {
        $scope.addDb = function (db) {
          _.extend($scope, $routeParams);
          var context = "admin";
          var route = null;

          if($routeParams.database) context = "";

          switch (context) {
            case "admin":
              route = "dbs";
            break;
            default:
              route =  $scope.runningUrl.join('/');
              route  = 'db/' + route
    }

          var dbName = db;
          var dbexisted = true
          console.log("route: "+ route)
          //ensuring our dbName is not already created
          $scope.items.forEach(function (db) {
            if(dbName == db.name) dbexisted = false;
          })

          if(dbName && dbexisted) {
            var newDb = ({name : dbName});
            console.log({name:newDb})
            restangularService.database.all(route).post(newDb)
            $scope.items.push({name : dbName})
          }
        }
      },
      template :  '<button class = "btn btn-sm btn-success" ng-click="addDb(newDbName)">Add</button>'
    }
  })
