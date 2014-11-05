(function() {
    'use strict';

    angular
        .module('app.paragala')
        .run(appRun);

    //appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
              state: 'paragala',
              config: {
                url: '/paragala',
                templateUrl: '/paragala/index.html',
                controller: 'Paragala as vm',
                title: 'paragala',
                settings: {
                    nav: 3,
                    content: '<i class="fa fa-lock"></i> Paragala'
                },
                resolve: {
                  urlRedirect: function( $q, $window, paragalaDataservice ) {
                      return $q.all(  studentLoginData('') )
                        .then(function ( response ) {
                          if( response.studentIsAuthenticated ) {
                            $q.all( questionsListData() )
                              .then(function( response ) {
                                console.log( response.questions )
                                $window.location.href = 'paragala/questions?category=' +
                                response.questions[0].title.toLowerCase() + '&sub=2'
                              })
                          }
                        })

                    function studentLoginData(SN) {
                      return paragalaDataservice.studentLogin( 'studentLogin', {studentNumber: SN} )
                        .then(function( response ) {
                          return response;
                        })
                    }

                    function questionsListData() {
                      return paragalaDataservice.questionsList( 'questionsListAdmin', {} )
                        .then(function( response ) {
                          return response;
                        })
                    }
                  }
                }
                // resolve: {
                //   commonsDataservice: 'commonsDataservice',
                //   urlRedirect: function ( commonsDataservice, $state ) {
                //     commonsDataservice.getStudentLoginStatus( 'student', {} ).then( function ( data ) {
                //       if( data.isStudentLogin == true ) {
                //         $state.go( 'paragala_questions' )
                //       }
                //     })
                //   }
                // }
              }
            }, {
              state: 'admin_paragala_questions',
              config: {
                url: '/adminPanel/paragala/questions',
                templateUrl: 'adminPanel/paragala/questions/index.html',
                controller: 'QuestionsAdmin as vm',
                title: 'paragala'
              }
            }, {
              state: 'paragala_questions',
              config: {
                url: '/paragala/questions',
                templateUrl: 'paragala/questions/index.html',
                controller: 'QuestionsClient as vm',
                title: 'paragala'
              }
            }, {
              state: 'paragala_add-student',
              config: {
                url: '/paragala/add-student',
                templateUrl: '/paragala/addStudent/index.html',
                controller: 'ParagalaAddStudent as vm',
                title: 'paragala'
              }
            }, {
              state: 'paragala_paragala-results',
              config: {
                url: '/paragala/paragala-results',
                templateUrl: '/paragalaResults/index.html',
                controller: 'ParagalaResults as vm',
                title: 'paragala'
              }
            }
        ];
    }
})();
