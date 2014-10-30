(function () {
  'use strict';

  angular
    .module( 'app.paragala' )
    .directive( 'studentLogin', studentLogin )

    studentLogin.$inject = ['$q', '$timeout', '$location', 'logger', 'paragalaDataservice', 'serviceParagalaStudentApi']

    function studentLogin( $q, $timeout, $location, logger, paragalaDataservice, serviceParagalaStudentApi ) {
      var directive = {
        restrict: 'A',
        replace: true,
        require: '?ngModel',
        controller: controller
      }

      return directive;

      var vm = this;
      vm.status = null;

      function controller( $scope ) {
        $scope.vm.studentLogin = function( isValid, SN ) {
          if( isValid !== false) {
            var promise = [studentLoginData( SN )]
            return $q.all( promise ).then(function ( data ) {
              if( data[0] == 'success' ) {
                $scope.vm.response = true
                $location.path('/paragala/questions');
                $timeout(function () {
                  window.location.reload();
                }, 0 )
              }
            })
          }
        }

        function studentLoginData( SN ) {
          return paragalaDataservice.studentLogin( 'studentLogin', {studentNumber: SN} )
            .then(function( data ) {
              return data;
            })
        }
      }
    }
})()
