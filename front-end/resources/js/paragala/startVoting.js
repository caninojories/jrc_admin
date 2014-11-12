
  'use strict';

  angular
    .module('app.paragala')
    .controller('StartVoting', StartVoting)

    StartVoting.$inject = [ '$q', '$window', 'paragalaDataservice']

    function StartVoting( $q, $window, paragalaDataservice ) {
      var vm = this;

      vm.startVoting = startVoting;

      function startVoting() {
        $q.all( questionsListAdminData() )
          .then(function( response ) {
            $window.location.href = 'paragala/questions?category=' +
            response.questions[0].title.toLowerCase() + '&sub=2'
          })
      }

      function questionsListAdminData() {
        return paragalaDataservice.questionsList( 'questionsListAdmin', {} )
          .then(function( response ) {
            return response;
          })
      }
    }
