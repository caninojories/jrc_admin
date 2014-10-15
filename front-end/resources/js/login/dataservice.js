(function() {
  'use strict';

  angular
    .module('app.login')
    .factory( 'dataserviceLogin', dataserviceLogin )

    dataserviceLogin.$inject = ['$http', '$location', '$q', 'logger', 'Admin', 'isAdminLogin']

    function dataserviceLogin($http, $location, $q, logger, Admin, isAdminLogin) {

      var service = {
        getUser               : getUser
        //getAdminLoginStatus   : getAdminLoginStatus
      }

      return service;

      function getUser(api, param) {
        console.log( api )
        return Admin.all( api ).post( param )
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
