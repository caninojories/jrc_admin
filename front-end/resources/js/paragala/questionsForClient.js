(function() {
  'use strict';

  angular
    .module( 'app.paragala' )
    .controller( 'QuestionsClient', QuestionsClient )

    QuestionsClient.$inject = ['$q', '$rootScope', '$timeout', 'Restangular', 'paragalaDataservice']

    function QuestionsClient( $q, $rootScope, $timeout, Restangular, paragalaDataservice ) {
      var vm = this;

      vm.selected        = selected;
      vm.questionBuilder = [];

      vm.next = next;
      vm.url  = null;

        init();

        function init() {
          questionsList();
          questionListAdmin();
        }

        function questionsList() {
          return $q.all( questionsListData() )
            .then(function( response ) {
              $rootScope.list = response.questions;
              vm.previousUrl = response.previousUrl;
              vm.nextUrl = response.nextUrl;
              vm.sliceObject = angular.copy($rootScope.list)
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
            })
        }

        function questionsListAdminData() {
          return paragalaDataservice.questionsList( 'questionsListAdmin', {} )
            .then(function( response ) {
              return response;
            })
        }

        function selected( categoryTitle, subItemTitle, SecondSubItemTitle ) {
          for( var i = 0; i < $rootScope.list.length; i++) {
            if($rootScope.list[i].title == categoryTitle ) {
              for( var j = 0; j <$rootScope.list[i].items.length; j++ ) {
                if($rootScope.list[i].items[j].title == subItemTitle ) {
                  for( var z = 0; z < $rootScope.list[i].items[j].items.length; z++ ) {
                    if( $rootScope.list[i].items[j].items[z].title == SecondSubItemTitle ) {
                      console.log( $rootScope.list[i].items[j].items[z] )
                      vm.questionBuilder[i].items[j].items[0].title = SecondSubItemTitle
                    }
                  }
                }
              }
            }
          }
          console.log( vm.questionBuilder )
          console.log( categoryTitle )
          console.log( subItemTitle )
          console.log( SecondSubItemTitle )
        }

        function next( category ) {
          console.log( category )
        }
    }
})()
