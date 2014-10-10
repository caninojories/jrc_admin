(function() {
	'use strict';

	angular
		.module('app.database')
		.directive('addButton', addButton)

    addButton.$inject = [ '$rootScope', 'dataserviceDatabase', 'DatabaseService' ]

		function addButton( $rootScope, dataserviceDatabase, DatabaseService ) {
      var directive = {
        restrict: 'E',
        replace: true,
        template: template
      }

      return directive;

      function template() {
        return '<button class = "btn btn-success" ng-click="vm.addDb(newDbName)">Add</button>'
      }
		}
})()
