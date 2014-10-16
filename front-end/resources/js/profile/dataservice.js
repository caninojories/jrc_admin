
  (function() {
    'use strict';

    angular
      .module( 'app.profile' )
      .factory( 'profileDataservice', profileDataservice )

      profileDataservice.$inject = ['serviceRestAdmin']

      function profileDataservice( serviceRestAdmin ) {
        var service = {
          getProfile    : getProfile,
          updateProfile : updateProfile,
        }

        return service;

        function getProfile( api ) {
          return serviceRestAdmin.get( api )
            .then( getProfileData )
            .catch(function( response ) {

            })

          function getProfileData( data, status, headers, config ) {
            return data.response;
          }
        }

        function updateProfile( api, param ) {
          console.log( param )
          return serviceRestAdmin.one( api )
            .put( param )
            .then( updateProfileData )
            .catch(function( response ) {

            })
          function updateProfileData( data, status, headers, config ) {
            return data.response;
          }
        }

      }
  })()
