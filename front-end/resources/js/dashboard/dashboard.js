(function() {
    'use strict';

    angular
      .module('app.dashboard')
      .controller('MainDashBoard', MainDashBoard);

    MainDashBoard.$inject = ['$q', 'logger', 'commonsDataservice'];

    function MainDashBoard( $q, logger, commonsDataservice ) {
      /*jshint validthis: true */
      var vm = this;

      init();

      function init() {
        isserviceAdminApiLogin();
      }

      function isserviceAdminApiLogin() {
        var promise = [ getserviceAdminApiLoginData() ]
        return $q.all( promise ).then( function() {
          logger.success('Activated Dashboard View');
        })
      }

      function getserviceAdminApiLoginData() {
        commonsDataservice.getserviceAdminApiLoginStatus( 'admin', {} ).then( function ( data ) {
          vm.adminLogin = data.isserviceAdminApiLogin
          return vm.adminLogin;
        })
      }
    }
})();
