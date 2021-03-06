(function() {
	'use strict';

	angular
		.module( 'app.login' )
		.controller( 'Login', Login );

		Login.$inject = [ '$q', '$window', '$timeout', 'commonsDataservice', '$loginModal', '$SignUpModal' ];

		function Login( $q, $window, $timeout, commonsDataservice, $loginModal, $SignUpModal ) {
			var vm 		= this;

			vm.strapLoginHtml 	= strapLoginHtml;
			vm.strapSignUpHtml 	= strapSignUpHtml;
			vm.logout 					= logout;
			vm.signup						= signup;
			init();

			function init() {
				isserviceAdminApiLogin();
			}

			function isserviceAdminApiLogin() {
				commonsDataservice.getserviceAdminApiLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isserviceAdminApiLogin;
				});
			}

			function strapLoginHtml() {
				$loginModal.show();
			}

			function strapSignUpHtml() {
				$SignUpModal.show();
			}

			function logout() {
				return $q.all( adminLogout() )
					.then(function( response ) {
						if( response === 'success') {
							$timeout(function() {
                $window.location.reload();
            	}, 100);
						}
					});
			}

			function adminLogout() {
				return commonsDataservice
					.adminLogout( 'adminLogout' )
					.then(function ( response ) {
						return response;
					});
			}

			function signup( email, username, password, confirmPassword ) {
				console.log( email, username, password, confirmPassword );
				return $q.all( createserviceAdminApiAccount( email, username, password, confirmPassword ) )
					.then(function( response ) {
						console.log( response );
					});
			}

			function createserviceAdminApiAccount( email, username, password, confirmPassword ) {
				return commonsDataservice
					.createserviceAdminApiAccount( 'createAdminAccount', {email: email, username: username, password: password} )
					.then(function( response ) {
						return response;
					});
			}
		}
})();
