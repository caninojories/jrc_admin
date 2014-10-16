
  (function() {
    'use strict';

    angular
      .module( 'app.profile' )
      .controller( 'Profile', Profile )

      Profile.$inject = ['$q', '$timeout', '$window', 'flash', 'profileDataservice', 'commonsDataservice']

      function Profile( $q, $timeout, $window, flash, profileDataservice, commonsDataservice ) {
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

        function updateProfile( isValid, email, username, password ) {
          if( isValid == false ) {
            return false;
          }
          return $q.all( getUpdateProfileData( email, username, password ) )
            .then(function( response ) {
              if( response == 'Successfully updated Profile with the new Email Address') {
                commonsDataservice.adminLogin( 'adminLogin', {email:email, password: password} )
                  .then(function( response ) {
                    $timeout(function() {
                      $window.location.reload();
                    }, 1000);
                  })
              }
              flash.success = response.toString();
              $timeout(function() {
                $window.location.reload();
              }, 1000);
              return vm.message = response;
            })
        }

        function getUpdateProfileData( email, username, password ) {
          return profileDataservice
            .updateProfile( 'adminUpdateProfile', {email:email, username:username, password:password} )
            .then(function( response ) {
              return response;
            })
        }
      }
  })()
