
(function() {
  'use strict';

  angular
    .module('app.login')
    .directive('mainLogin', mainLogin)

    mainLogin.$inject = [ '$rootScope', '$timeout', '$window', '$loginModal', 'commonsDataservice' ]

    function mainLogin( $rootScope, $timeout, $window, $loginModal, commonsDataservice ) {
      var directive = {
        restrict : "E",
        replace : true,
        controller: controller,
        template: '<button id="mainLogin" class = "btn btn-success btn-sm" type="submit"' +
                  'ng-click="login(loginForm.$valid, email, password)">Login</button>',
      };

      return directive;

      function controller( $rootScope, $modal ) {
        $rootScope.login = function ( isValid, email, password ) {
          if( isValid !== false ) {
            commonsDataservice.adminLogin( 'adminLogin', {email:email, password: password} ).then(function( response ) {
              if( response === 'success' ) {
                /**
                 ** Use $loginModal.hide() if you want
                 ** to hide the modal before refreshing the page
                ***/
                $timeout(function() {
                  $window.location.reload();
                }, 100);
              } else {
                $rootScope.error  = true;
                $rootScope.valid  = response;
              }
            })
          } else {
            $rootScope.error      = false;
            $rootScope.submitted  = true;

          }
        }
      }
    }

})()
