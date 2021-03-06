(function() {
  'use strict';

  angular
    .module('app.login')
    .factory( 'dataserviceLogin', dataserviceLogin )

    dataserviceLogin.$inject = ['$http', '$location', '$q', 'logger', 'serviceAdminApi', 'isserviceAdminApiLogin']

    function dataserviceLogin($http, $location, $q, logger, serviceAdminApi, isserviceAdminApiLogin) {

      var service = {
        getUser: getUser
      }

      return service;

      function getUser( api, param ) {
        return serviceAdminApi.all( api )
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
