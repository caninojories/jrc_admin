(function() {
	'use strict';

	angular
		.module( 'app.login' )
		.controller( 'Login', Login )

		Login.$inject = [ '$q', '$window', '$timeout', 'viewContentLoaded', 'commonsDataservice', '$loginModal' ];

		function Login( $q, $window, $timeout, viewContentLoaded, commonsDataservice, $loginModal ) {
			var vm 		= this;

			vm.strapLoginHtml = strapLoginHtml;
			vm.logout 				= logout;
			vm.signup					= signup;
			init();

			function init() {
				viewContentLoadedJS();
				isAdminLogin();
			}

			function viewContentLoadedJS() {
				viewContentLoaded.loadScript('/js/custom/main.js')
			}

			function isAdminLogin() {
				commonsDataservice.getAdminLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isAdminLogin
				})
			}

			function strapLoginHtml() {
				$loginModal.show();
			}

			function logout() {
				return $q.all( adminLogout() )
					.then(function( response ) {
						if( response === 'success') {
							$timeout(function() {
                $window.location.reload();
            	}, 100);
						}
					})
			}

			function adminLogout() {
				return commonsDataservice
					.adminLogout( 'logout' )
					.then(function ( response ) {
						return response
					})
			}

			function signup( email, username, password, confirmPassword ) {
				console.log( email, username, password, confirmPassword )
				return $q.all( createAdminAccount( email, username, password, confirmPassword ) )
					.then(function( response ) {
						console.log( response )
					})
			}

			function createAdminAccount( email, username, password, confirmPassword ) {
				return commonsDataservice
					.createAdminAccount( 'createAdminAccount', {email: email, username: username, password: password} )
					.then(function( response ) {
						return response;
					})
			}
		}
})()
