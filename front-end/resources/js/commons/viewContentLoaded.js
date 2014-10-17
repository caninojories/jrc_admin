(function() {
  'use strict';

  angular
    .module('commons.control')
    .factory('viewContentLoaded', viewContentLoaded);

    viewContentLoaded.$inject = [ '$rootScope', 'logger' ];

    function viewContentLoaded ( $rootScope, logger ) {

      loadScript();
  
      function loadScript() {
        $rootScope.$on('$viewContentLoaded', function(){
          jcaLayout.init()
        });
      }
    }
})()
