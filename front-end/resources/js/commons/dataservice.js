(function() {
  'use strict';

  angular
    .module('commons.control')
    .factory('commonsDataservice', commonsDataservice)

    commonsDataservice.$inject = ['isAdminLogin', 'isStudentLogin', 'Admin']

    function commonsDataservice( isAdminLogin, isStudentLogin, Admin ) {
      var service = {
        getAdminLoginStatus   : getAdminLoginStatus,
        getStudentLoginStatus : getStudentLoginStatus,
        adminLogout           : adminLogout,
        createAdminAccount    : createAdminAccount
      }

      return service;

      function getAdminLoginStatus( api, param ) {
        return isAdminLogin.one( api ).get( param )
          .then( getAdminLoginStatusData )
          .catch( function ( message ) {
            $location.url( '/' );
          })

        function getAdminLoginStatusData( data, status, headers, config ) {
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
        return Admin.all( api ).post()
          .then( adminLogout )
          .catch( function (message ) {
            $location.url( '/' )
          })

        function adminLogout( data, status, headers, config ) {
          return data.response;
        }
      }

      function createAdminAccount( api, param ) {
        return Admin.all( api ).post( param )
          .then( adminAccount )
          .catch(function( message ) {
            $location.url( '/' )
          })

        function adminAccount( data, status, headers, config ) {
          return data.response;
        }
      }
    }
})()
