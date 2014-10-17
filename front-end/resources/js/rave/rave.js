(function() {
  'use strict';

  angular
    .module( 'app.rave' )
    .controller( 'Rave', Rave )

    Rave.$inject = [ '$q', '$state', 'RaveDataservice', 'angularLoad' ]

    function Rave( $q, $state, RaveDataservice, angularLoad ) {
      var vm = this;

      vm.jenica  = 'JENICA';
      vm.mae_cee = 'MAE CEE';
      vm.anna    = 'ANNA';
      vm.len     = 'LEN';
      vm.shan    = 'SHAN';
      vm.belle   = 'BELLE';
      vm.gelene  = 'GELENE';

      vm.successShow = false;

      vm.loginJudges = loginJudges;
      vm.voteJudges  = voteJudges;

      vm.jenicaEvent = jenicaEvent;
      vm.maeCeeEvent = maeCeeEvent;
      vm.annaEvent   = annaEvent;
      vm.lenEvent    = lenEvent;
      vm.shanEvent   = shanEvent;
      vm.belleEvent  = belleEvent;
      vm.geleneEvent = geleneEvent;

      vm.francoEvent  = francoEvent;
      vm.carlxEvent   = carlxEvent;
      vm.charlieEvent = charlieEvent;
      vm.lawrenzEvent = lawrenzEvent;
      vm.chrisEvent   = chrisEvent;
      vm.nielEvent    = nielEvent;
      vm.carlosEvent  = carlosEvent;
      vm.bartsEvent   = bartsEvent;

      /*
       * Result Functions
       **/
      vm.jenicaEventResult = jenicaEventResult;
      vm.maeCeeEventResult = maeCeeEventResult;
      vm.annaEventResult   = annaEventResult;
      vm.lenEventResult    = lenEventResult;
      vm.shanEventResult   = shanEventResult;
      vm.belleEventResult  = belleEventResult;
      vm.geleneEventResult = geleneEventResult;

      vm.francoEventResult  = francoEventResult;
      vm.carlxEventResult   = carlxEventResult;
      vm.charlieEventResult = charlieEventResult;
      vm.lawrenzEventResult = lawrenzEventResult;
      vm.chrisEventResult   = chrisEventResult;
      vm.nielEventResult    = nielEventResult;
      vm.carlosEventResult  = carlosEventResult;
      vm.bartsEventResult   = bartsEventResult;


      vm.raveWinner = raveWinner;

      init();

      function largest(array){
        return Math.max.apply(Math, array);
      }

      function raveWinner() {
        vm.winnerFemale     = null;
        vm.winnerFemaleTie  = [];
        vm.winnerMale       = null;
        vm.winnerMaleTie    = []
        var promise     = [readJudgesVoteResultFinal()];
        return $q.all( promise ).then(function (data) {

          try{
            var data = data[0]
            var winnerFemale = [data.response.jenica.average, data.response.mae_cee.average,
                          data.response.anna.average, data.response.len.average,
                          data.response.shan.average, data.response.belle.average,
                          data.response.gelene.average ]

            var winnerMale = [data.response.franco.average, data.response.carlx.average,
                              data.response.charlie.average, data.response.lawrenz.average,
                              data.response.chris.average, data.response.niel.average,
                              data.response.carlos.average, data.response.barts.average,]

            if( data.response.jenica.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'JENICA';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }
            if ( data.response.mae_cee.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'MAE CEE';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }
            if ( data.response.anna.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'ANNA';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }
            if ( data.response.len.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'LEN';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }
            if ( data.response.shan.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'SHAN';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }
            if ( data.response.belle.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'BELLE';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }
            if ( data.response.gelene.average ==  largest(winnerFemale) ) {
              vm.winnerFemale = 'GELENE';
              vm.winnerFemaleTie.push(vm.winnerFemale)
            }


            if ( data.response.franco.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'FRANCO';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.carlx.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'CARLX';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.charlie.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'CHARLIE';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.lawrenz.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'LAWRENZ';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.chris.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'CHRIS';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.niel.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'NIEL';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.carlos.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'CARLOS';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
            if ( data.response.barts.average ==  largest(winnerMale) ) {
              vm.winnerMale = 'BARTS';
              vm.winnerMaleTie.push(vm.winnerMale)
            }
          } catch( err ) {
            console.log( err )
          }

          // if( data == undefined ) {
          //   vm.themeWear          = 0;
          //   vm.casualWear         = 0;
          //   vm.longGown           = 0;
          //   vm.beautyPoise        = 0;
          //   vm.closeDoorInterview = 0;
          //   vm.texterVotes        = 0;
          // } else {
          //   vm.themeWear          = data.themeWear
          //   vm.casualWear         = data.casualWear
          //   vm.longGown           = data.longGown
          //   vm.beautyPoise        = data.beautyPoise
          //   vm.closeDoorInterview = data.closeDoorInterview
          //   vm.texterVotes        = data.texterVotes
          // }
        })
      }

      function voteJudges( isValid, name, themeWear, casualWear, longGown, beautyPoise, closeDoorInterview, texterVotes ) {
        if( isValid !== false) {
          var promise = [responseJudgesVote( name, themeWear, casualWear, longGown, beautyPoise, closeDoorInterview, texterVotes)]
          return $q.all( promise ).then(function( data ) {
            if( data[0].response == 'success' ) {
              vm.successShow = true;
            }
          })
        }
      }

      function responseJudgesVote( name, themeWear, casualWear, longGown, beautyPoise, closeDoorInterview, texterVotes ) {
        var dataJenica    = [];
        var dataMaeCee    = [];
        var dataAnn       = [];

        var total = themeWear + casualWear +  longGown + beautyPoise
                    + closeDoorInterview + texterVotes;
        if( name == 'JENICA' ) {
          var jenica = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          dataJenica.push(jenica)
          return RaveDataservice.judgesVote( 'admin-vote', { jenica:jenica } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'MAE CEE' ) {
          var mae_cee = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { mae_cee:mae_cee } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'ANNA' ) {
          var anna = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { anna:anna } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'LEN' ) {
          var len = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { len:len } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'SHAN' ) {
          var shan = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { shan:shan } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'BELLE' ) {
          var belle = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { belle:belle } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'GELENE' ) {
          var gelene = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { gelene:gelene } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'FRANCO' ) {
          var franco = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { franco:franco } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'CARLX' ) {
          var carlx = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { carlx:carlx } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'CHARLIE' ) {
          var charlie = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { charlie:charlie } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'LAWRENZ' ) {
          var lawrenz = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { lawrenz:lawrenz } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'CHRIS' ) {
          var chris = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { chris:chris } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'NIEL' ) {
          var niel = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { niel:niel } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'CARLOS' ) {
          var carlos = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { carlos:carlos } )
            .then(function( data ) {
              return data;
            })
        } else if( name == 'BARTS' ) {
          var barts = {
            'name'               : name,
            'themeWear'          : themeWear,
            'casualWear'         : casualWear,
            'longGown'           : longGown,
            'beautyPoise'        : beautyPoise,
            'closeDoorInterview' : closeDoorInterview,
            'texterVotes'        : texterVotes,
            'average'            : total
          }

          return RaveDataservice.judgesVote( 'admin-vote', { barts:barts } )
            .then(function( data ) {
              return data;
            })
        }

      }

      function jenicaEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise    = [readJudgesVote()];
        return $q.all( promise ).then(function ( data ) {
          var data = data[0].response.jenica;
          console.log(data)
          if( data == undefined ) {
            vm.themeWear    = 0;
            vm.casualWear   = 0;
            vm.longGown     = 0;
            vm.beautyPoise  = 0;
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function jenicaEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.jenica;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function maeCeeEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.mae_cee;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function maeCeeEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.mae_cee;
          console.log(data)
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function annaEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          console.log(data)
          var data = data[0].response.anna;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function annaEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.anna;
          console.log(data)
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }


      function lenEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.len;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function lenEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.len;
          console.log(data)
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }


      function shanEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.shan;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function shanEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.shan;
          console.log(data)
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }


      function belleEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.belle;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function belleEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.belle;
          console.log(data)
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }


      function geleneEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.gelene;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function geleneEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.gelene;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function francoEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.franco;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function francoEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.franco;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function carlxEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.carlx;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function carlxEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.carlx;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function charlieEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.charlie;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function charlieEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.charlie;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function lawrenzEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.lawrenz;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function lawrenzEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.lawrenz;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function chrisEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.chris;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function chrisEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.chris;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function nielEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.niel;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function nielEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.niel;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function carlosEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.carlos;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function carlosEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.carlos;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }

      function bartsEvent( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = true;

        vm.closeDoorInterview = '';
        vm.texterVotes        = '';
        var promise = [readJudgesVote()]
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.barts;
          if( data == undefined ) {
            vm.themeWear    = 0
            vm.casualWear   = 0
            vm.longGown     = 0
            vm.beautyPoise  = 0
          } else {
            vm.themeWear          = data.themeWear * ( 15/100 )
            vm.casualWear         = data.casualWear * ( 15/100 )
            vm.longGown           = data.longGown * ( 15/100 )
            vm.beautyPoise        = data.beautyPoise * ( 25/100 )
          }
        })
      }

      function bartsEventResult( name ) {
        vm.name        = name;
        vm.successShow = false;
        vm.footer      = false;
        var promise    = [readJudgesVoteResult()];
        return $q.all( promise ).then(function (data) {
          var data = data[0].response.barts;
          if( data == undefined ) {
            vm.themeWear          = 0;
            vm.casualWear         = 0;
            vm.longGown           = 0;
            vm.beautyPoise        = 0;
            vm.closeDoorInterview = 0;
            vm.texterVotes        = 0;
          } else {
            vm.themeWear          = data.themeWear
            vm.casualWear         = data.casualWear
            vm.longGown           = data.longGown
            vm.beautyPoise        = data.beautyPoise
            vm.closeDoorInterview = data.closeDoorInterview
            vm.texterVotes        = data.texterVotes
          }
        })
      }


      function readJudgesVote() {
        return RaveDataservice.getJudgesVote( 'judges-vote' ).then(function (data) {
          return data;
        })
      }

      function readJudgesVoteResult() {
        return RaveDataservice.getJudgesVote( 'admin-vote' ).then(function (data) {
          return data;
        })
      }

      function readJudgesVoteResultFinal() {
        return RaveDataservice.getJudgesVote( 'final-result' ).then(function (data) {
          return data;
        })
      }

      function loginJudges( screenName, userName, password, confirmPassword, code ) {
        var promise = [reponseJudges( screenName, userName, password, confirmPassword, code )]
        return $q.all( promise ).then(function( data ) {
          if( data[0].response == 'added' ) {
            vm.judges = 'jories'
            $state.go(  'rave' )
          }
        })
      }

      function reponseJudges( screenName, userName, password, confirmPassword, code ) {
        return RaveDataservice.judges( 'login-judges', { screenName: screenName,
          userName: userName, password: password, confirmPassword: confirmPassword,
          code: code} )
          .then( function( data ) {
            return data
          })
      }

    }
})()
