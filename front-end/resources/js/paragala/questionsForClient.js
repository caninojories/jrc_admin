(function() {
  'use strict';

  angular
    .module( 'app.paragala' )
    .controller( 'QuestionsClient', QuestionsClient )

    QuestionsClient.$inject = ['$q', '$state', '$rootScope', '$timeout',
      '$window', 'Restangular', 'paragalaDataservice']

    function QuestionsClient( $q, $state, $rootScope, $timeout,
      $window, Restangular, paragalaDataservice ) {
      var vm = this;

      vm.questionBuilder  = [];
      vm.questionList     = null;

      vm.selectedQuestion = selectedQuestion;
      vm.studentLogout    = studentLogout;
      vm.dataQuestionSelected = dataQuestionSelected;

        init();

        function init() {
          questionsList();
          questionListAdmin();
        }

        function questionsList() {
          return $q.all( questionsListData() )
            .then(function( response ) {
              vm.previousUrl = response.previousUrl;
              vm.nextUrl = response.nextUrl;
              vm.sliceObject = response.questions;
            })
        }

        function questionsListData() {
          return paragalaDataservice.questionsList( 'questionsListClient', {param:location.search.slice(1)} )
            .then(function( response ) {
              return response;
            })
        }

        function questionListAdmin() {
          return $q.all( questionsListAdminData() )
            .then(function( response ) {
              vm.questionBuilder = $rootScope.studentQuestionList;
              $rootScope.list    = response.questions;
              if( !$rootScope.studentQuestionList ) {
                vm.questionBuilder = response.questions;
                for( var i = 0; i < vm.questionBuilder.length; i++) {
                  for( var j = 0; j < vm.questionBuilder[i].items.length; j++ ) {
                    for( var z = 0; z < 1; z++ ) {
                      vm.questionBuilder[i].items[j].items.splice(1, vm.questionBuilder[i].items[j].items.length -1)
                      try {
                        vm.questionBuilder[i].items[j].items[0].title = ''
                      }catch(e) {

                      }
                    }
                  }
                }
              }
            })
        }

        function questionsListAdminData() {
          return paragalaDataservice.questionsList( 'questionsListAdmin', {} )
            .then(function( response ) {
              return response;
            })
        }

        // function studentQuestionList() {
        //   return $q.all( studentQuestionListData() )
        //     .then(function( response ) {
        //       vm.questionList = response;
        //       return response;
        //     })
        // }
        //
        // function studentQuestionListData() {
        //   return paragalaDataservice.studentQuestionList( 'studentQuestionList' )
        //     .then(function( response ) {
        //       return response;
        //     })
        // }

        function selectedQuestion( categoryTitle, subItemTitle, SecondSubItemTitle ) {
          console.log( $rootScope.list )

          for( var i = 0; i < $rootScope.list.length; i++) {
            if($rootScope.list[i].title == categoryTitle ) {
              console.log( $rootScope.list[i].title )
              for( var j = 0; j <$rootScope.list[i].items.length; j++ ) {
                if($rootScope.list[i].items[j].title == subItemTitle ) {
                  console.log( $rootScope.list[i].items[j].title )
                  for( var z = 0; z < $rootScope.list[i].items[j].items.length; z++ ) {
                      console.log( $rootScope.list[i].items[j].items[0] )
                      console.log( i )
                      console.log( j )
                      console.log( subItemTitle )
                      vm.questionBuilder[i].items[j].items[0].title = SecondSubItemTitle
                      vm.questionBuilder[i].items[j].items[0].selected = true;
                      console.log( vm.questionBuilder )
                      $q.all( selectedQuestionData() )
                        .then(function( response ) {
                          console.log( response )
                        })

                  }
                }
              }
            }
          }
        }

        function selectedQuestionData() {
          return paragalaDataservice.selectedQuestion( 'questionsListClient', {questions: angular.toJson(vm.questionBuilder)} )
            .then(function( response ) {
              console.log( response )
              return response;
            })
        }

        function studentLogout() {
          return $q.all( studentLogoutData() )
            .then(function( response ) {
              if( response ) {
                $window.location.href = '/paragala'
              }
            })
        }

        function studentLogoutData() {
          return paragalaDataservice.studentLogout( 'studentlogout', {} )
            .then(function( response ) {
              return response.studentIsLogOut;
            })
        }

        function dataQuestionSelected( categoryTitle, subItemTitle, SecondSubItemTitle ) {
          if( $rootScope.studentQuestionList == undefined ) return 0;
          for( var i = 0; i < $rootScope.studentQuestionList.length; i++) {
            if($rootScope.studentQuestionList[i].title == categoryTitle ) {
              for( var j = 0; j < $rootScope.studentQuestionList[i].items.length; j++ ) {
                if($rootScope.studentQuestionList[i].items[j].title == subItemTitle ) {
                  for( var z = 0; z < $rootScope.studentQuestionList[i].items[j].items.length; z++ ) {
                    if($rootScope.studentQuestionList[i].items[j].items[z].title == SecondSubItemTitle ) {
                      return true;
                    }
                  }
                }
              }
            }
          }
        }
    }
})()
