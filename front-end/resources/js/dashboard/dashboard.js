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
        isserviceRestAdminLogin();
      }

      function isserviceRestAdminLogin() {
        var promise = [ getserviceRestAdminLoginData() ]
        return $q.all( promise ).then( function() {
          logger.success('Activated Dashboard View');
        })
      }

      function getserviceRestAdminLoginData() {
        commonsDataservice.getserviceRestAdminLoginStatus( 'admin', {} ).then( function ( data ) {
          vm.adminLogin = data.isserviceRestAdminLogin
          return vm.adminLogin;
        })
      }
    }
})();
