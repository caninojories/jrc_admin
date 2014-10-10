"use strict";


angular.module("ngAPI")
  .controller("databaseCtrl", function($scope, $routeParams, restangularService, Restangular) {
    $scope.$on('$viewContentLoaded', function() {
      jcaLayout.init();
    });
    console.log((this))
    _.extend($scope, $routeParams);
    var context = "admin";
    var route = null;

    if($routeParams.database) context = "";

    $scope.runningUrl = [];
    for(var param in $routeParams){
      $scope.runningUrl.push($routeParams[param])
    }
    console.log("Full URL from databaseList Controller: " + $scope.runningUrl.join('/'));

    switch (context) {
      case "admin":
        route = "dbs";
        break;
      default:
        route =  $scope.runningUrl.join('/');
        route  = 'db/' + route
    }
    if($routeParams['id']){
    	console.log('id')
    	restangularService.database.one(route).get().then(function (data) {
    		$scope.items = JSON.stringify(Restangular.stripRestangular(data),null,2)
    		$scope.bool = false;
    	})
    }else {
      console.log('db/' + route)
    	$scope.items = restangularService.database.all(route).getList({}).$object
      // restangularService.database.one(route).get().then(function (data) {
      //    // $scope.items = JSON.stringify(Restangular.stripRestangular(data),null,2)
      //   console.log(data)
      // })
    		$scope.bool = true;
    }

    	//$scope.items = $scope.collection.doc;


    $scope.addDb = function () {

      var dbName = $scope.newDbName;
      var dbexisted = true
      console.log("dbName: "+ db)
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

    $scope.removeDb = function (db) {
      if(confirm("Delete this " + context)) {
        restangularService.database.all(route).remove({name : db.name})
        $scope.items.splice($scope.items.indexOf(db), 1)
      }
    }

    $scope.saveDocument = function (doc) {
    	var parse = JSON.parse(doc)
    	console.log(parse)
      console.log(route)
    	restangularService.database.all(route).post({documentId:parse})
    }


    //ace editor
    $scope.aceLoaded = function(_editor) {
    	var _session = _editor.getSession();
    	var _renderer = _editor.renderer;

    	_editor.setReadOnly(false);
    	_session.setUndoManager(new ace.UndoManager());

    	_editor.on("change", function(){
    		$scope.items = _editor.getValue();
    		console.log($scope.items)
    	});
    }

  })
