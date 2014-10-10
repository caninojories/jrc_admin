(function() {
    'use strict';

    angular
        .module('app.dashboard')
        .run(appRun);

    //appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                state: 'dashboard',
                config: {
                    url: '/dashboard',
                    templateUrl: '/dashboard/index.html',
                    controller: 'MainDashBoard as vm',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-lock"></i> Dashboard'
                    }
                }
            }
        ];
    }
})();
