(function () {
  'use strict';

  angular
    .module('app.paragala')
    .controller( 'ParagalaResults', ParagalaResults )

    ParagalaResults.$inject = [ '$q', 'paragalaDataservice', 'commonsDataservice'];

    function ParagalaResults( $q, paragalaDataservice, commonsDataservice ) {
      var vm = this;

      vm.all        = "Know the Results?"
      vm.trimAll    = true
      vm.trimWinner = false

      /*
       * Function Call
       **/
      vm.winner = winner;

      init();

      function init() {
        voteResults();
        adminLoginData();
      }

      function voteResults() {
        var promise = [getVoteResults()]
        return $q.all( promise ).then( function ( data ) {
          var result = data[0]
          vm.data = result[0].results
          vm.actors = result[1]
          vm.actresses = result[2]
          vm.maleChildPerformers = result[3]
          vm.femaleChildPerformers = result[4]
          vm.teleseryes = result[5]
          vm.sitComs = result[6]
          vm.gagShows = result[7]
          vm.musicalVarietyShows = result[8]
          vm.talkShows = result[9]
          vm.talkShowHosts = result[10]
          vm.entertainmentNewsPrograms = result[11]
          vm.entertainmentNewsProgramHosts = result[12]
          vm.varietyShows = result[13]
          vm.varietyShowHosts = result[14]
          vm.gameShows = result[15]
          vm.gameShowHosts = result[16]
          vm.dramaAnthologies = result[17]
          vm.morningShows = result[18]
          vm.morningShowHosts = result[19]
          vm.newsPrograms = result[20]
          vm.newsProgramMaleAnchors = result[21]
          vm.newsProgramFemaleAnchors = result[22]
          vm.publicAffairsTalkShows = result[23]
          vm.magazineShows = result[24]
          vm.magazineShowHosts = result[25]
          vm.investigativeShows = result[26]
          vm.educationalShows = result[27]
          vm.documentaryShows = result[28]
          vm.localTVStations = result[29]
          vm.TVStations = result[30]
          console.log( vm.data )
        })
      }

      function winner() {
        if( vm.all == "Know the Results?" ) {
          vm.trimWinner = !vm.trimWinner
          vm.all = "Return"
        } else {
          vm.trimWinner = !vm.trimWinner
          vm.all = "Know the Results?"
        }
      }

      function getVoteResults() {
        return paragalaDataservice.voteResultsData( 'userResults', {} )
          .then( function ( data ) {
            return data;
          })
      }

      function adminLoginData() {
        var promise = [getserviceRestAdminLoginData()]
        return $q.all( promise ).then(function ( data ) {
          return data
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
