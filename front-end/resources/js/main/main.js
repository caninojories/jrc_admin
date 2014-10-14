(function() {
	'use strict';

	angular
		.module( 'app.main' )
		.controller( 'Main', Main )

		Main.$inject = [ 'viewContentLoaded', 'dataserviceCommons', '$loginModal' ];

		function Main( viewContentLoaded, dataserviceCommons, $loginModal ) {
			var vm 		= this;

			vm.strapLoginHtml = strapLoginHtml;
			init();

			function init() {
				viewContentLoadedJS();
				isAdminLogin();
			}

			function viewContentLoadedJS() {
				viewContentLoaded.loadScript('/js/custom/main.js')
			}

			function isAdminLogin() {
				dataserviceCommons.getAdminLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isAdminLogin
				})
			}

			function strapLoginHtml() {
				$loginModal.show();
			}
		}
})()
