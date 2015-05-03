(function() {
  'use strict';

  angular
    .module('app.login')
    .run(appRun);

    function appRun( routehelper ) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'primary',
        config: {
          url: '/',
          templateUrl: '/primary/index.html',
          controller: 'Login as vm',
          title: 'main',
          resolve: {
            fullPage: function ( viewContentLoaded ) {
              viewContentLoaded.loadScript();
            }
          }
        }
      }];
    }
})();
