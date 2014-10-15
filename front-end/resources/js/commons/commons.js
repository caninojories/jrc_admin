(function() {
  'use strict';

  angular
    .module('commons.control')
    .controller('Control', Control);

    Control.$inject = ['viewContentLoaded'];

    function Control( viewContentLoaded ) {
      var vm = this;

      viewContentLoaded();

      function viewContentLoaded() {
        viewContentLoaded.loadScript('/js/custom/layout.js');
      }
    }
})()
