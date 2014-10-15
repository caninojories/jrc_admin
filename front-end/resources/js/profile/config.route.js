
  (function() {
    'use strict';

    angular
      .module('app.profile')
      .run(appRun)

      function appRun( routehelper ) {
        routehelper.configureRoutes(getRoutes());
      }

      function getRoutes() {
        return [{
          state: 'profile',
          config: {
            url: '/profile',
            templateUrl: '/profile/index.html',
            controller: 'Profile as vm',
            title: 'Profile'
          }
        }]
      }
  })()
