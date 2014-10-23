(function() {
	'use strict';

	angular
		.module( 'app.paragala' )
		.controller( 'ParagalaAddStudent', ParagalaAddStudent )

		ParagalaAddStudent.$inject = ['$q', 'paragalaDataservice', 'logger', 'commonsDataservice' ]

		function ParagalaAddStudent( $q, paragalaDataservice, logger, commonsDataservice ) {
			var vm = this;

			vm.SN         				= false;
			vm.alreadyRegistered 	= false;
			vm.submitted 					= false
			vm.addStudent 				= addStudent;

			init();

			function init() {
				getView();
			}

			function getView() {
				var promise = [getserviceAdminApiLoginData()]
				return $q.all( promise ).then(function () {
					logger.success('Activated Add-Student View');
				})
			}

			function addStudent( isValid, SN ) {
				console.log( isValid )
				if( isValid !== false) {
					console.log( 'valid' )
					return $q.all( addStudentData(SN) ).then( function ( response ) {
						console.log( response )
						if( data[0] == 'isAlreadyRegistered' ) {
							vm.isAlreadyRegistered = true;
							vm.notYetVoted = false;
							vm.SN = ''
						} else {
							vm.isAlreadyRegistered = false;
							vm.notYetVoted = true;
							vm.SN = ''
						}
						vm.studentNumber = SN;
					})
				}
				vm.submitted = true;
				vm.SN = ''
			}

			function addStudentData( SN ) {
				return paragalaDataservice.addStudent( 'paragalaAddStudent', { SN:SN } )
					.then( function ( response ) {
						console.log( response )
						return response;
					})
			}

			function getserviceAdminApiLoginData() {
				commonsDataservice.getserviceAdminApiLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isserviceAdminApiLogin
					return vm.adminLogin;
				})
			}
		}
})()
