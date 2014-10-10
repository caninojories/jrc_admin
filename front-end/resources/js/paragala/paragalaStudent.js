(function() {
	'use strict';

	angular
		.module( 'app.paragala' )
		.controller( 'ParagalaStudents', ParagalaStudents )

		ParagalaStudents.$inject = ['$q', 'ParagalaDataService', 'logger', 'dataserviceCommons' ]

		function ParagalaStudents( $q, ParagalaDataService, logger, dataserviceCommons ) {
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
				var promise = [getAdminLoginData()]
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
				return ParagalaDataService.postAddStudent( 'addStudent', { SN:SN } )
					.then( function ( data ) {
						return data;
					})
			}

			function getAdminLoginData() {
				dataserviceCommons.getAdminLoginStatus( 'admin', {} ).then( function ( data ) {
					vm.adminLogin = data.isAdminLogin
					return vm.adminLogin;
				})
			}
		}
})()
