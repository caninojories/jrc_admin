(function() {
	'use strict';

	angular
		.module( 'app.paragala' )
		.controller( 'ParagalaStudents', ParagalaStudents )

		ParagalaStudents.$inject = ['$q', 'paragalaDataservice', 'logger', 'commonsDataservice' ]

		function ParagalaStudents( $q, paragalaDataservice, logger, commonsDataservice ) {
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
				var promise = [getserviceRestAdminLoginData()]
				return $q.all( promise ).then(function () {
					logger.success('Activated Add-Student View');
				})
			}

			function addStudent( isValid, SN ) {
				if( isValid !== false) {
					var promise = [addStudentData( SN )]
					return $q.all( promise ).then( function ( data ) {
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
				return paragalaDataservice.postAddStudent( 'addStudent', { SN:SN } )
					.then( function ( data ) {
						return data;
					})
			}

			function getserviceRestAdminLoginData() {
				commonsDataservice.getserviceRestAdminLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isserviceRestAdminLogin
					return vm.adminLogin;
				})
			}
		}
})()
