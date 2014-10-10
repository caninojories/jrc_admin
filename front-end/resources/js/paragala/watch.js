(function() {
	'use strict';

	angular
		.module('app.paragala')
		.factory('watch', watch);

		watch.$inject = ['$rootScope']

		function watch( $rootScope ) {

			var service = {
				modelWatch : modelWatch
			}

			return service;

			function modelWatch( model ) {
				console.log( model );
				$rootScope.$watch( vm.actor, function () {
  				//$rootScope.itemData.actor = $rootScope.actor
       		console.log( 'ROOTSCOPE: ' + $rootScope.actor )
     		})
			}
		}
})()
