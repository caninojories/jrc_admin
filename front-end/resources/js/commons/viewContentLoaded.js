(function() {
  'use strict';

  angular
    .module('commons.main')
    .factory('viewContentLoaded', viewContentLoaded);

    viewContentLoaded.$inject = [ 'logger', 'angularLoad' ];

    function viewContentLoaded ( logger, angularLoad ) {

      var service = {
        loadScript : loadScript
      }

      return service;

      function loadScript(str) {
        angularLoad.loadScript(str).then(function() {
            logger.info('JS LOADED');
        }).catch(function() {

        });
      }
    }
})()