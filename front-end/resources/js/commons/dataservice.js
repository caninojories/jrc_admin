(function() {
  'use strict';

  angular
    .module('commons.control')
    .factory('commonsDataservice', commonsDataservice)

    commonsDataservice.$inject = ['isserviceRestAdminLogin', 'isStudentLogin', 'serviceRestAdmin']

    function commonsDataservice( isserviceRestAdminLogin, isStudentLogin, serviceRestAdmin ) {
      var service = {
        getserviceRestAdminLoginStatus   : getserviceRestAdminLoginStatus,
        createserviceRestAdminAccount    : createserviceRestAdminAccount,
        getStudentLoginStatus            : getStudentLoginStatus,
        adminLogin                       : adminLogin,
        adminLogout                      : adminLogout

      }

      return service;

      function getserviceRestAdminLoginStatus( api, param ) {
        return isserviceRestAdminLogin.one( api ).get( param )
          .then( getserviceRestAdminLoginStatusData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getserviceRestAdminLoginStatusData( data, status, headers, config ) {
          return data;
        }
      }

      function getStudentLoginStatus( api, param ) {
        return isStudentLogin.one( api ).get( param )
          .then( getStudentLoginStatusData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getStudentLoginStatusData( data, status, headers, config ) {
          return data;
        }
      }

      function adminLogout( api, param ) {
        return serviceRestAdmin.all( api ).post()
          .then( adminLogout )
          .catch( function (message ) {
            $location.url( '/' )
          })

        function adminLogout( data, status, headers, config ) {
          return data.response;
        }
      }

      function createserviceRestAdminAccount( api, param ) {
        return serviceRestAdmin.all( api ).post( param )
          .then( adminAccount )
          .catch(function( message ) {
            $location.url( '/' )
          })

        function adminAccount( data, status, headers, config ) {
          return data.response;
        }
      }

      function adminLogin( api, param ) {
        return serviceRestAdmin.all( api )
          .post( param )
          .then( adminLoginData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function adminLoginData( data, status, headers, config ) {
          return data.response;
        }
      }
    }
})()
