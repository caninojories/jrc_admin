(function() {
	'use strict';

	angular
		.module( 'app.main' )
		.controller( 'Main', Main )

		Main.$inject = [ 'viewContentLoaded', 'dataserviceCommons' ];

		function Main( viewContentLoaded, dataserviceCommons ) {
			var vm = this;

			init();

			function init() {
				viewContentLoadedJS();
				isAdminLogin();
			}

			function viewContentLoadedJS() {
				console.log( 'jories' )
				viewContentLoaded.loadScript('/js/custom/main.js')
			}

			function isAdminLogin() {
				dataserviceCommons.getAdminLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isAdminLogin
				})
			}
		}
})()
