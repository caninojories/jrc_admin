(function() {
  'use strict';

  angular
    .module('app.login')
    .factory( 'dataserviceLogin', dataserviceLogin )

    dataserviceLogin.$inject = ['$http', '$location', '$q', 'logger', 'serviceRestAdmin', 'isserviceRestAdminLogin']

    function dataserviceLogin($http, $location, $q, logger, serviceRestAdmin, isserviceRestAdminLogin) {

      var service = {
        getUser: getUser
      }

      return service;

      function getUser( api, param ) {
        return serviceRestAdmin.all( api )
          .post( param )
          .then( getUserData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getUserData( data, status, headers, config ) {
          return data.valid;
        }
      }
    }
})()
