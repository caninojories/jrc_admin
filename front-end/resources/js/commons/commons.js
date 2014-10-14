(function() {
  'use strict';

  angular
    .module('commons.main')
    .controller('Main', Main);

    Main.$inject = ['viewContentLoaded'];

    function Main( viewContentLoaded ) {
      var vm = this;

      viewContentLoaded();

      function viewContentLoaded() {
        viewContentLoaded.loadScript('/js/custom/layout.js');
      }
    }
})()
