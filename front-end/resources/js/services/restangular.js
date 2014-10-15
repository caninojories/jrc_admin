
  "use strict";

  angular.module('app.restangular', [])
    .factory( 'DatabaseService', function ( Restangular ) {
      //return Restangular.all( 'mongo-api' )
      return Restangular.all( 'database-api' )
    })
    .factory('serviceRestAdmin', function (Restangular) {
    	return Restangular.all("admin-api")
    })
    .factory('ParagalaStudent', function (Restangular) {
      return Restangular.all("paragala-student-api")
    })
    .factory('ParagaQuestions', function (Restangular) {
      return Restangular.all("paragala-student-api")
    })
    .factory( 'isserviceRestAdminLogin', function (Restangular)  {
      return Restangular.all( 'isserviceRestAdminLogin' )
    })
    .factory( 'isStudentLogin', function (Restangular) {
      return Restangular.all( 'isStudentLogin' )
    })
    .factory( 'RaveJudges', function (Restangular) {
      return Restangular.all( 'rave-api' )
    })
