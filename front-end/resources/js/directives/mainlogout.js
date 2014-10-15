(function() {
  'use strict';

  angular
    .module('ngAPI')
    .directive( 'mainLogout', mainLogout )

    mainLogout.$inject = [ 'commonsDataservice', '$state', '$q' ]

    function mainLogout( commonsDataservice, $state, $q ) {
      var directive = {
        restrict: 'E',
        replace: true,
        template: template,
        controller: controller
      }

      return directive;

      function controller( $scope ) {
        $scope.logout = function () {
          console.log('jories')
          var promise = [logoutPromise()]
          return $q.all( promise ).then(function (data) {
            $state.go('main')
          })
        }
      }

      function logoutPromise() {
        return commonsDataservice.getAdminLogoutData( 'logout' )
          .then(function(data) {
            return data;
          })
      }

      function template() {
        return '<a href=""><span ng-click="logout()"> Sign-Out </span></a>'
      }
    }
})()
