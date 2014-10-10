(function() {
  'use strict';

  angular
    .module( 'app.rave' )
    .factory( 'RaveDataservice',  RaveDataservice)

    RaveDataservice.$inject = [ 'RaveJudges' ]

    function RaveDataservice( RaveJudges ) {

      var service = {
        judges        : judges,
        judgesVote    : judgesVote,
        getJudgesVote : getJudgesVote
      }

      return service;

      function judges( api, param ) {
        return RaveJudges.all( api ).post( param )
          .then( postJudges )
          .catch( function ( message) {
            $location.url( '/' );
          })

          function postJudges( data, status, headers, config ) {
            return data;
          }
      }

      function judgesVote( api, param ) {
        return RaveJudges.all( api ).post( param )
          .then( postJudgesVote )
          .catch( function( message ) {
            $location.url( '/' );
          })

          function postJudgesVote( data, status, headers, config ) {
            return data;
          }
      }

      function getJudgesVote( api ) {
        return RaveJudges.one( api ).get({})
          .then( readJudgesVote )
          .catch( function( message ) {
            $location.url( '/' );
          })

        function readJudgesVote( data, status, headers, config ) {
          return data;
        }
      }

    }
})()
