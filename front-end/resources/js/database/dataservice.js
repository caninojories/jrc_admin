(function() {
  'use strict';

  angular
    .module('app.database')
    .factory( 'dataserviceDatabase', dataserviceDatabase )

    dataserviceDatabase.$inject = ['DatabaseService', '$location', '$rootScope', '$q', 'logger']

    function dataserviceDatabase( DatabaseService, $location, $rootScope, $q, logger ) {

      var service = {
        getserviceRestAdminDatabase : getserviceRestAdminDatabase
      }

      return service;

      function getserviceRestAdminDatabase( api ) {
        return DatabaseService.get( api )
          .then( getserviceRestAdminDatabaseData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getserviceRestAdminDatabaseData(data, status, headers, config) {
          return data;
        }
      }
    }
})()
