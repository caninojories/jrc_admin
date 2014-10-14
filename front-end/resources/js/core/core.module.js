(function() {
    'use strict';

    angular.module('app.core', [
        /*
         * Angular modules
         */
        'ngAnimate',
        'ui.router',
        'restangular',
        //'ngSanitize',
        /*
         * Commons module
        **/
        'commons.main',
        /*
         * Our reusable cross app code modules
         */
        //'blocks.exception',
        'blocks.logger',
        'blocks.router',
        'strapService',
        /*
         * 3rd Party modules
         */
        'ngplus',
        'angularLoad',
        'ui.ace',
        'ui.bootstrap',
        'mgcrea.ngStrap'
    ]);
})();
