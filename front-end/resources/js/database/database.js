(function() {
    'use strict';

    angular
        .module('app.database')
        .controller('Database', Database);


    Database.$inject = ['$q', '$rootScope', '$stateParams', '$location', 'dataserviceDatabase', 'DatabaseService',
                        'logger', 'viewContentLoaded', 'angularLoad', 'commonsDataservice', 'Restangular'];
    function Database($q, $rootScope, $stateParams, $location, dataserviceDatabase, DatabaseService, logger, viewContentLoaded, angularLoad, commonsDataservice, Restangular ) {

        /*jshint validthis: true */
        var vm = this;

        vm.database     = [];
        vm.route        = null;
        vm.adminLogin   = null;
        vm.showAce      = null;
        vm.addDb        = addDb;
        vm.removeDb     = removeDb;
        vm.aceLoaded    = aceLoaded;
        vm.saveDocument = saveDocument;

        init();

        function init() {
            runningUrl();
            loadDatabase();
            getAdminLoginData();
            loadScript();
        }

        function loadScript() {
            angularLoad.loadScript('/js/custom/layout.js').then(function() {
                logger.info('JS LOADED');
            }).catch(function() {

            });
        }

        function loadDatabase() {
            var promise = [getDatabaseData(), getAdminLoginData()];
            return $q.all(promise).then(function() {
                logger.success('Activated Database View');
            });
        }

        function getDatabaseData() {
            return dataserviceDatabase.getAdminDatabase( vm.route ).then(function( data ) {
              if ($stateParams['id'] ) {

                vm.database = JSON.stringify( Restangular.stripRestangular( data ), null, 2 )
                console.log( vm.database )
                vm.showAce = true;
              } else {
                console.log( data );
                vm.database = data
                vm.showAce = false
              }
              return vm.database
            });
        }

        function getAdminLoginData() {
          return commonsDataservice.getAdminLoginStatus( 'admin', {} ).then( function ( data ) {
            vm.adminLogin = data.isAdminLogin
            return vm.adminLogin;
          })
        }

        function addDb( dbName ) {
            var dbexisted = true
            vm.database.forEach(function ( db ) {
              if(dbName == db.name) dbexisted = false;
            })

            if( dbName && dbexisted ) {
                var newDb = ({name : dbName});
                DatabaseService.all( vm.route ).post( newDb )
                _.extend($rootScope, $stateParams);
                vm.database.push({name : dbName, url : $location.path().slice(1) + '/' + dbName })
            }
        }

        function removeDb( db ) {
            if(confirm( 'Delete' )) {
                DatabaseService.all( vm.route ).remove({name : db.name})
                vm.database.splice(vm.database.indexOf( db ), 1)
            }
        }

        function aceLoaded( _editor ) {
          //ace editor
          var _session = _editor.getSession();
          var _renderer = _editor.renderer;

          _editor.setReadOnly(false);
          _session.setUndoManager(new ace.UndoManager());

          _editor.on("change", function(){
          vm.database = _editor.getValue();
          });
        }

        function saveDocument( doc ) {
          var parse = JSON.parse(doc)
          DatabaseService.all( vm.route ).post({documentId:parse})
        }

        function runningUrl() {
            console.log( $stateParams )
            _.extend($rootScope, $stateParams );
            var context = "admin";
            var route = null;

            if($stateParams.database) context = "";

            $rootScope.runningUrl = [];

            for(var param in $stateParams){
              $rootScope.runningUrl.push($stateParams[param])
            }

            switch (context) {
                case "admin":
                    route = "dbs";
                    break;
                default:
                    route =  $rootScope.runningUrl.join('/');
                    route  = 'db/' + route
            }

            return vm.route = route;
        }
    }
})();
