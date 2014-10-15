
  "use strict";

  angular.module('app.restangular', [])
    .factory( 'DatabaseService', function ( Restangular ) {
      //return Restangular.all( 'mongo-api' )
      return Restangular.all( 'database-api' )
    })
    .factory('Admin', function (Restangular) {
    	return Restangular.all("paragala-api")
    })
    .factory('ParagalaStudent', function (Restangular) {
      return Restangular.all("paragala-student-api")
    })
    .factory('ParagaQuestions', function (Restangular) {
      return Restangular.all("paragala-student-api")
    })
    .factory( 'isAdminLogin', function (Restangular)  {
      return Restangular.all( 'isAdminLogin' )
    })
    .factory( 'isStudentLogin', function (Restangular) {
      return Restangular.all( 'isStudentLogin' )
    })
    .factory( 'RaveJudges', function (Restangular) {
      return Restangular.all( 'rave-api' )
    })
