
  (function() {
    'use strict';

    angular
      .module( 'app.profile' )
      .factory( 'profileDataservice', profileDataservice )

      profileDataservice.$inject = ['serviceAdminApi']

      function profileDataservice( serviceAdminApi ) {
        var service = {
          getProfile    : getProfile,
          updateProfile : updateProfile,
        }

        return service;

        function getProfile( api ) {
          return serviceAdminApi.get( api )
            .then( getProfileData )
            .catch(function( response ) {

            })

          function getProfileData( data, status, headers, config ) {
            return data.response;
          }
        }

        function updateProfile( api, param ) {
          console.log( param )
          return serviceAdminApi.one( api )
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
