(function() {
  'use strict';

  angular
    .module('app.main')
    .factory( 'dataserviceLogin', dataserviceLogin )

    dataserviceLogin.$inject = ['$http', '$location', '$q', 'logger', 'ParagalaAdmin', 'isAdminLogin']

    function dataserviceLogin($http, $location, $q, logger, ParagalaAdmin, isAdminLogin) {

      var service = {
        getUser               : getUser
        //getAdminLoginStatus   : getAdminLoginStatus
      }

      return service;

      function getUser(api, param) {
        return ParagalaAdmin.all( api ).post( param )
          .then( getUserData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getUserData(data, status, headers, config) {
          return data.valid;
        }
      }
    }
})()
