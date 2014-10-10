(function() {
  'use strict';

  angular
    .module('commons.main')
    .factory('dataserviceCommons', dataserviceCommons)

    dataserviceCommons.$inject = ['isAdminLogin', 'isStudentLogin', 'ParagalaAdmin']

    function dataserviceCommons( isAdminLogin, isStudentLogin, ParagalaAdmin ) {
      var service = {
        getAdminLoginStatus   : getAdminLoginStatus,
        getStudentLoginStatus : getStudentLoginStatus,
        getAdminLogoutData    : getAdminLogoutData
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

      function getAdminLogoutData( api, param ) {
        return ParagalaAdmin.all( api ).post()
          .then( adminLogout )
          .catch( function (message ) {
            $location.url( '/' )
          })

        function adminLogout( data, status, headers, config ) {
          return data;
        }
      }
    }
})()
