(function() {
  'use strict';

  angular
    .module('app.database')
    .factory( 'dataserviceDatabase', dataserviceDatabase )

    dataserviceDatabase.$inject = ['DatabaseService', '$location', '$rootScope', '$q', 'logger']

    function dataserviceDatabase( DatabaseService, $location, $rootScope, $q, logger ) {

      var service = {
        getAdminDatabase : getAdminDatabase
      }

      return service;

      function getAdminDatabase( api ) {
        return DatabaseService.get( api )
          .then( getAdminDatabaseData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getAdminDatabaseData(data, status, headers, config) {
          return data;
        }
      }
    }
})()
