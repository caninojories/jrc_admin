(function () {
  'use strict';

  angular
    .module('app.paragala')
    .directive('clearInput', clearInput)

    function clearInput() {
      var directive = {
        restrict: 'A',
        replace: true,
        link: link
      }

      return directive;

      function link( scope, element, attr ) {
        element.on('click', function () {
          $('#SN').focus();
        })
      }
    }
})()
