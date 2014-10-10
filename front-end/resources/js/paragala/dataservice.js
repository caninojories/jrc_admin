(function() {
	'use strict';

	angular
		.module('app.paragala')
		.factory('ParagalaDataService', ParagalaDataService)

		ParagalaDataService.$inject = ['$rootScope', 'ParagalaStudent']

		function ParagalaDataService( $rootScope, ParagalaStudent ){
			var service = {
				studentLogout: studentLogout,
				studentLogin: studentLogin,
				postAnswerStudent: postAnswerStudent,
				postAddStudent: postAddStudent,
				voteResultsData: voteResultsData
			}

			return service;

			function studentLogout( api ) {
				return ParagalaStudent.all( api ).post({})
					.then( studentLogoutStatus )
					.catch( function ( message ) {
						$location.url( '/' );
					})

				function studentLogoutStatus( data, status, headers, config ) {
					return data;
				}
			}

			function studentLogin( api, param ) {
				return ParagalaStudent.one( api ).get( param )
					.then( getStudent )
					.catch( function ( message ) {
						$location.url( '/' )
					})

				function getStudent( data, status, headers, config ) {
					return data;
				}
			}

			function postAnswerStudent ( api, param ) {
				return ParagalaStudent.all( api ).post( param )
					.then( getPostAnswerStudent )
					.catch( function ( message ) {
						$location.url( '/' )
					})

				function getPostAnswerStudent( data, status, headers, config ) {
					return data.response;
				}
			}

			function postAddStudent( api, param ) {
				return ParagalaStudent.all( api ).post( param )
					.then( getPostAddStudent )
					.catch( function ( message ) {
						$location.url( '/' )
					})

				function getPostAddStudent( data, status, headers, config ) {
					return data.response;
				}
			}

			function voteResultsData( api, param ) {
				return ParagalaStudent.all( api ).getList( {} )
					.then( getVoteResultsData )
					.catch( function ( message ) {
						$location.url( '/' )
					})
			}

			function getVoteResultsData( data, status, headers, config ) {
				return data;
			}
		}
})()
