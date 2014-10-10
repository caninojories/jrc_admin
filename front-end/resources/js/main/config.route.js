(function() {
  'use strict';

  angular
    .module('app.main')
    .run(appRun)

    function appRun( routehelper ) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [{
          state: 'main',
          config: {
            url: '/',
            templateUrl: '/main/index.html',
            controller: 'Main as vm',
            title: 'main'
          }
        }, {
          state: 'main_about',
          config: {
            url: '/about',
            templateUrl: '/main/about/index.html'
            // controller: 'Main as vm',
            // title: 'main'
          }
        }]
    }
})()
