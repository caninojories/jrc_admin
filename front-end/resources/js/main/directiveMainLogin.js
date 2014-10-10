(function() {
  'use strict';

  angular
    .module('app.main')
    .directive('mainLogin', mainLogin)

    mainLogin.$inject = [ '$rootScope', 'dataserviceLogin', '$state', '$location', '$window' ]

    function mainLogin( $rootScope, dataserviceLogin, $state, $location, $window ) {
      var directive = {
        restrict : "E",
        replace : true,
        controller: controller,
        template: '<button id="mainLogin" class = "btn btn-success btn-sm" type="submit"' +
                  'ng-click="login(loginForm.$valid, email, password)">Login</button>',
      };

      return directive;

      function controller( $rootScope ) {
        $rootScope.login = function ( isValid, email, password ) {
          if( isValid !== false ) {
            dataserviceLogin.getUser( 'users', {email:email, password: password} ).then(function( valid ) {
              if( valid === 'success' ) {
                $rootScope.error  = false;
                init();
              } else {
                $rootScope.error  = true;
                $rootScope.valid  = valid;
              }
            })
          } else {
            $rootScope.error      = false;
            $rootScope.submitted  = true;

          }

          function init() {
            if($location.path() == '/') {
              dashboard();
            } else {
              reloadUrl();
            }
          }

          function reloadUrl() {
            $window.location.reload()
          }

          function dashboard() {
            $state.go( 'dashboard' );
          }
        }
      }
    }

})()
