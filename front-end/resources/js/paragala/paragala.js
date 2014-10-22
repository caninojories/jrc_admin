(function() {
    'use strict';

    angular
        .module('app.paragala')
        .controller('Paragala', Paragala);

    Paragala.$inject = [ '$location', '$q', '$rootScope', '$state', '$timeout', '$window'
      , 'logger', '$ParagalaLoginModal', 'viewContentLoaded', 'commonsDataservice', 'paragalaDataservice'  ];

    function Paragala( $location, $q, $rootScope, $state, $timeout, $window
      , logger, $ParagalaLoginModal, viewContentLoaded, commonsDataservice, paragalaDataservice ) {

        /*jshint validthis: true */
        var vm = this;

        vm.studentLogin                 = null;
        vm.actor                        = null;
        vm.actress                      = null;
        vm.maleChildPerformer           = null;
        vm.femaleChildPerformer         = null;
        vm.teleserye                    = null;
        vm.sitcom                       = null;
        vm.gagShow                      = null;
        vm.musicalVarietyShow           = null;
        vm.talkShow                     = null;
        vm.talkShowHost                 = null;
        vm.entertainmentNewsProgram     = null;
        vm.entertainmentNewsProgramHost = null;
        vm.varietyShow                  = null;
        vm.varietyShowHost              = null;
        vm.gameShow                     = null;
        vm.gameShowHost                 = null;
        vm.dramaAnthology               = null;
        vm.morningShow                  = null;
        vm.morningShowHost              = null;
        vm.newsProgram                  = null;
        vm.newsProgramMaleAnchor        = null;
        vm.newsProgramFemaleAnchor      = null;
        vm.newsPublicAffairsTalkShow    = null;
        vm.magazineShow                 = null;
        vm.magazineShowHost             = null;
        vm.investigativeShow            = null;
        vm.educationShow                = null;
        vm.documentaryShow              = null;
        vm.localTVStation               = null;
        vm.TVStation                    = null;

        vm.one          = true;
        vm.two          = true;
        vm.three        = true;
        vm.four         = true;
        vm.five         = true;
        vm.six          = true;
        vm.seven        = true;
        vm.finalSubmit  = true;

        vm.header       = "ENTERTAINMENT PROGRAMS"

        /*
         * Function
         **/
        //vm.counter = counter;
        vm.ngWatchActor                        = ngWatchActor;
        vm.ngWatchActress                      = ngWatchActress;
        vm.ngWatchMaleChildPerformer           = ngWatchMaleChildPerformer;
        vm.ngWatchFemaleChildPerformer         = ngWatchFemaleChildPerformer;
        vm.ngWatchTeleserye                    = ngWatchTeleserye;
        vm.ngWatchSitcom                       = ngWatchSitcom;
        vm.ngWatchGagShow                      = ngWatchGagShow;
        vm.ngWatchMusicalVarietyShow           = ngWatchMusicalVarietyShow;
        vm.ngWatchTalkShow                     = ngWatchTalkShow;
        vm.ngWatchTalkShowHost                 = ngWatchTalkShowHost;
        vm.ngWatchEntertainmentNewsProgram     = ngWatchEntertainmentNewsProgram;
        vm.ngWatchEntertainmentNewsProgramHost = ngWatchEntertainmentNewsProgramHost;
        vm.ngWatchVarietyShow                  = ngWatchVarietyShow;
        vm.ngWatchVarietyShowHost              = ngWatchVarietyShowHost;
        vm.ngWatchGameShow                     = ngWatchGameShow;
        vm.ngWatchGameShowHost                 = ngWatchGameShowHost;
        vm.ngWatchDramaAnthology               = ngWatchDramaAnthology;
        vm.ngWatchMorningShow                  = ngWatchMorningShow;
        vm.ngWatchMorningShowHost              = ngWatchMorningShowHost;
        vm.ngWatchNewsProgram                  = ngWatchNewsProgram;
        vm.ngWatchNewsProgramMaleAnchor        = ngWatchNewsProgramMaleAnchor;
        vm.ngWatchNewsProgramFemaleAnchor      = ngWatchNewsProgramFemaleAnchor;
        vm.ngWatchNewsPublicAffairsTalkShow    = ngWatchNewsPublicAffairsTalkShow;
        vm.ngWatchMagazineShow                 = ngWatchMagazineShow;
        vm.ngWatchMagazineShowHost             = ngWatchMagazineShowHost;
        vm.ngWatchInvestigativeShow            = ngWatchInvestigativeShow;
        vm.ngWatchEducationShow                = ngWatchEducationShow;
        vm.ngWatchDocumentaryShow              = ngWatchDocumentaryShow;
        vm.ngWatchLocalTVStation               = ngWatchLocalTVStation;
        vm.ngWatchTVStation                    = ngWatchTVStation;

        /*
         * Student Logout Click and
         * Student Login Click
         **/
        vm.studentLogout     = studentLogout;
        vm.studentLoginData  = studentLoginData;
        vm.counter           = counter;
        vm.submitted         = false;
        vm.SN                = null;
        vm.header            = 'ENTERTAINMENT PROGRAMS';
        vm.count             = 0;
        vm.response          = false;
        vm.error             = false;
        vm.text              = null

        vm.paragalaLogin     = paragalaLogin;

        init();

        function init() {
          isStudentLogin();
        }

        function studentLogout() {
          var promise = [getStudentLogout()]
          return $q.all( promise ).then(function( data ) {
            $state.go( 'paragala', null, {'reload':true} )
          })
        }

        function getStudentLogout() {
          return paragalaDataservice.studentLogout( 'logout' ).then(function( data ) {
            return data;
          })
        }

        function studentLoginData( isValid, SN ) {
          if( isValid !== false) {
            var promise = [getStudentLogin( SN )]
            return $q.all( promise ).then(function ( data ) {
              if( data[0].response == 'success' && data[0].isAlreadyVoted == 'false' ) {
                $state.go('paragala_questions');
              } else if( data[0].response == 'success' && data[0].isAlreadyVoted == 'true' ) {
                vm.errors = true;
                vm.text   = 'Opps!!! You are already Voted'
              } else if( data[0].response == 'fail' ) {
                vm.errors = true;
                vm.text   = 'Opps!!! Please Register First Before Voting'
              }
            })
          }
          vm.submitted = true;
        }

        function getStudentLogin( SN ) {
          return paragalaDataservice.studentLogin( 'student', {studentNumber: SN} ).then(function( data ) {
            return data;
          })
        }

        function isStudentLogin() {
          var promise = [getStudentLoginData()]
          return $q.all( promise ).then( function( data ) {
            return data;
          })
        }

        function getStudentLoginData() {
          return commonsDataservice.getStudentLoginStatus( 'student', {} ).then( function ( data ) {
            vm.studentLogin = data.isStudentLogin;
            return vm.studentLogin
          })
        }

        function counter( header ) {
          vm.header = header;
        }

        function ngWatchActor( model ) {
          console.log(model)
          vm.actor = model;
          firstPagination();
        }

        function ngWatchActress( model ) {
          vm.actress = model;
          firstPagination();
        }

        function ngWatchMaleChildPerformer( model ) {
          vm.maleChildPerformer = model;
          firstPagination();
        }

        function ngWatchFemaleChildPerformer( model ) {
          vm.femaleChildPerformer = model;
          firstPagination();
        }

        function ngWatchTeleserye( model ) {
          vm.teleserye = model;
          secondPagination();
        }

        function ngWatchSitcom( model ) {
          vm.sitcom = model;
          secondPagination();
        }

        function ngWatchGagShow( model ) {
          vm.gagshow = model;
          secondPagination();
        }

        function ngWatchMusicalVarietyShow( model ) {
          vm.musicalVarietyShow = model;
          secondPagination();
        }

        function ngWatchTalkShow( model ) {
          vm.talkShow = model;
          thirdPagination();
        }

        function ngWatchTalkShowHost( model ) {
          vm.talkShowHost = model;
          thirdPagination();
        }

        function ngWatchEntertainmentNewsProgram( model ) {
          vm.entertainmentNewsProgram = model;
          thirdPagination();
        }

        function ngWatchEntertainmentNewsProgramHost( model ) {
          vm.entertainmentNewsProgramHost = model;
          thirdPagination();
        }

        function ngWatchVarietyShow( model ) {
          vm.varietyShow = model;
          fourthPagination();
        }

        function ngWatchVarietyShowHost( model ) {
          vm.varietyShowHost = model;
          fourthPagination();
        }

        function ngWatchGameShow( model ) {
          vm.gameShow = model;
          fourthPagination();
        }

        function ngWatchGameShowHost( model ) {
          vm.gameShowHost = model;
          fourthPagination();
        }

        function ngWatchDramaAnthology( model ) {
          vm.dramaAnthology = model
          fourthPagination();
        }

        function ngWatchMorningShow( model ) {
          vm.morningShow = model;
          fifthPagination();
        }

        function ngWatchMorningShowHost( model ) {
          vm.morningShowHost = model;
          fifthPagination();
        }

        function ngWatchNewsProgram( model ) {
          vm.newsProgram = model;
          fifthPagination();
        }

        function ngWatchNewsProgramMaleAnchor( model ) {
          vm.newsProgramMaleAnchor = model;
          fifthPagination();
        }

        function ngWatchNewsProgramFemaleAnchor( model ) {
          vm.newsProgramFemaleAnchor = model;
          sixthPagination();
        }

        function ngWatchNewsPublicAffairsTalkShow( model ) {
          vm.newsPublicAffairsTalkShow = model;
          sixthPagination();
        }

        function ngWatchMagazineShow( model ) {
          vm.magazineShow = model;
          sixthPagination();
        }

        function ngWatchMagazineShowHost( model ) {
          vm.magazineShowHost = model;
          sixthPagination();
        }

        function ngWatchInvestigativeShow( model ) {
          vm.investigativeShow = model;
          sevenPagination();
        }

        function ngWatchEducationShow( model ) {
          vm.educationShow = model;
          sevenPagination();
        }

        function ngWatchDocumentaryShow( model ) {
          vm.documentaryShow = model;
          sevenPagination();
        }

        function ngWatchLocalTVStation( model ) {
          console.log( 'local' )
          vm.localTVStation = model;
          eightPagination();
        }

        function ngWatchTVStation( model ) {
          console.log( 'TVStation' )
          vm.TVStation = model;
          eightPagination();
        }

        function firstPagination() {
          if( vm.actor !== null && vm.actress !== null && vm.maleChildPerformer !== null && vm.femaleChildPerformer !== null ) {
            vm.one = false;
          }
        }

        function secondPagination() {
          if( vm.teleserye !== null && vm.sitcom !== null && vm.gagshow !== null && vm.musicalVarietyShow !== null ) {
            vm.two = false;
          }
        }

        function thirdPagination() {
          if( vm.talkShow !== null && vm.talkShowHost !== null && vm.entertainmentNewsProgram !==null && vm.entertainmentNewsProgramHost !==null ) {
            vm.three = false;
          }
        }

        function fourthPagination() {
          if( vm.varietyShow !== null && vm.varietyShowHost !== null && vm.gameShow !== null && vm.gameShowHost !== null && vm.dramaAnthology !== null ) {
            vm.four = false;
          }
        }

        function fifthPagination() {
          if( vm.morningShow !== null && vm.morningShowHost !== null && vm.newsProgram !== null && vm.newsProgramMaleAnchor !== null ) {
            vm.five = false;
          }
        }

        function sixthPagination() {
          if( vm.newsProgramFemaleAnchor !== null && vm.newsPublicAffairsTalkShow !== null && vm.magazineShow !== null && vm.magazineShowHost !== null ) {
            vm.six = false;
          }
        }

        function sevenPagination() {
          if( vm.investigativeShow !== null && vm.educationShow !== null && vm.documentaryShow !== null ) {
            console.log( 'seven' )
            vm.seven = false;
          }
        }

        function eightPagination() {
          if( vm.localTVStation !== null && vm.TVStation !== null ) {
            console.log( 'eight' )
            vm.finalSubmit = false;
          }
        }

        function paragalaLogin() {
          $ParagalaLoginModal.show();
        }

    }
})();
