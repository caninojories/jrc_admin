(function() {
    'use strict';

    angular
      .module('app.dashboard')
      .controller('MainDashBoard', MainDashBoard);

    MainDashBoard.$inject = ['$q', 'logger', 'angularLoad', 'viewContentLoaded', 'commonsDataservice'];

    function MainDashBoard( $q, logger, angularLoad , viewContentLoaded, commonsDataservice ) {
      /*jshint validthis: true */
      var vm = this;

      init();

      function init() {
        viewContentLoadedJS();
        isserviceRestAdminLogin();
      }

      function viewContentLoadedJS() {
        viewContentLoaded.loadScript('/js/custom/layout.js')
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
