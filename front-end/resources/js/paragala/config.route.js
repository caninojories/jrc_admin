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
              state: 'paragala_questions',
              config: {
                url: '/paragala/questions',
                templateUrl: '/paragalaQuestions/index.html',
                controller: 'Paragala as vm',
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
