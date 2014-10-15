
  (function() {
    'use strict';

    angular
      .module( 'app.profile' )
      .controller( 'Profile', Profile )

      Profile.$inject = ['$q', 'flash', 'profileDataservice']

      function Profile( $q, flash, profileDataservice ) {
        var vm = this;

        vm.updateProfile = updateProfile;

        init()

        function init() {
          profileData();
        }

        function profileData() {
          return $q.all( getProfileData() )
            .then(function( response ) {
              vm.email    = response._id;
              vm.username = response.username;
            })
        }

        function getProfileData() {
          return profileDataservice
            .getProfile( 'adminProfile' )
            .then(function( response ) {
              return response
            })
        }

        function updateProfile( email, username, password, confirmPassword ) {
          return $q.all( getUpdateProfileData( email, username, password, confirmPassword ) )
            .then(function( response ) {
              vm.error = true;
              flash.success = response.toString();
              return vm.message = response;
            })
        }

        function getUpdateProfileData( email, username, password, confirmPassword ) {
          return profileDataservice
            .updateProfile( 'adminUpdateProfile', {email:email, username:username, password:password} )
            .then(function( response ) {
              return response;
            })
        }
      }
  })()
