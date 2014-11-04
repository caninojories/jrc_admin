(function() {
	'use strict';

	angular
		.module('app.paragala')
		.factory('paragalaDataservice', paragalaDataservice)

		paragalaDataservice.$inject = ['$rootScope', 'serviceParagalaStudentApi']

		function paragalaDataservice( $rootScope, serviceParagalaStudentApi ){
			var service = {
				studentLogout			: studentLogout,
				studentLogin			: studentLogin,
				postAnswerStudent	: postAnswerStudent,
				addStudent				: addStudent,
				voteResultsData		: voteResultsData,
				questionsUpdate		: questionsUpdate,
				questionsList			: questionsList
			}

			return service;

			function studentLogout( api ) {
				return serviceParagalaStudentApi.all( api ).post({})
					.then( studentLogoutStatus )
					.catch( function ( message ) {
						$location.url( '/' );
					})

				function studentLogoutStatus( data, status, headers, config ) {
					return data;
				}
			}

			function studentLogin( api, param ) {
				return serviceParagalaStudentApi.all( api )
					.post( param )
					.then( studentLoginData )
					.catch( function ( message ) {
						$location.url( '/' )
					})

				function studentLoginData( response, status, headers, config ) {
					return response;
				}
			}

			function postAnswerStudent ( api, param ) {
				return serviceParagalaStudentApi.all( api ).post( param )
					.then( getPostAnswerStudent )
					.catch( function ( message ) {
						$location.url( '/' )
					})

				function getPostAnswerStudent( data, status, headers, config ) {
					return data.response;
				}
			}

			function addStudent( api, param ) {
				console.log( api, param )
				return serviceParagalaStudentApi.all( api ).post( param )
					.then( addStudentData )
					.catch( function ( message ) {
						$location.url( '/' )
					})

				function addStudentData( data, status, headers, config ) {
					console.log( data )
					return data.response;
				}
			}

			function voteResultsData( api, param ) {
				return serviceParagalaStudentApi.all( api ).getList( {} )
					.then( getVoteResultsData )
					.catch( function ( message ) {
						$location.url( '/' )
					})
			}

			function getVoteResultsData( data, status, headers, config ) {
				return data;
			}

			function questionsUpdate( api, param ) {
				return serviceParagalaStudentApi.one( api )
					.put( param )
					.then( questionsUpdateData )
					.catch(function( message ) {
						//error for update angular ui
					})

					function questionsUpdateData( response, status, headers, config ) {
						return response
					}
			}

			function questionsList( api, param ) {
				return serviceParagalaStudentApi.one(api).get( param )
					.then( questionsListData )
					.catch(function( message ) {
						$location.url( '/' )
					})

				function questionsListData( response, status, headers, config ) {
					return response;
				}
			}
		}
})()
