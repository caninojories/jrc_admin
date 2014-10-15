(function() {
  'use strict';

  angular
    .module('app.login')
    .run(appRun)

    function appRun( routehelper ) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
        state: 'main',
        config: {
          url: '/',
          templateUrl: '/login/index.html',
          controller: 'Login as vm',
          title: 'main'
        }
      }]
    }
})()
