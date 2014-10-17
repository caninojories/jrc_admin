(function() {
  'use strict';

  angular
    .module('app.database')
    .factory( 'databaseDataservice', databaseDataservice )

    databaseDataservice.$inject = ['serviceDatabaseApi', '$location', '$rootScope', '$q', 'logger']

    function databaseDataservice( serviceDatabaseApi, $location, $rootScope, $q, logger ) {

      var service = {
        getserviceRestAdminDatabase : getserviceRestAdminDatabase
      }

      return service;

      function getserviceRestAdminDatabase( api ) {
        return serviceDatabaseApi.get( api )
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
