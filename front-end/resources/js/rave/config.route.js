(function() {
  'use strict';

  angular
    .module('app.rave')
    .run(appRun);

    function appRun( routehelper ) {
      routehelper.configureRoutes( getRoutes() );
    }

    function getRoutes() {
      return [{
        state : 'rave',
        config: {
          url: '/rave',
          templateUrl: '/rave/index.html',
          controller: 'Rave as vm'
        }
      }]
    }
})()
