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
        isAdminLogin();
      }

      function viewContentLoadedJS() {
        viewContentLoaded.loadScript('/js/custom/layout.js')
      }

       function isAdminLogin() {
        var promise = [ getAdminLoginData() ]
        return $q.all( promise ).then( function() {
          logger.success('Activated Dashboard View');
        })
      }

      function getAdminLoginData() {
        commonsDataservice.getAdminLoginStatus( 'admin', {} ).then( function ( data ) {
          vm.adminLogin = data.isAdminLogin
          return vm.adminLogin;
        })
      }
    }
})();
