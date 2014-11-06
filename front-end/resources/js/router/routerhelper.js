(function() {
    'use strict';

    angular
        .module('blocks.router')
        .provider('routehelperConfig', routehelperConfig)
        .factory('routehelper', routehelper);

    routehelper.$inject = ['$location', '$rootScope', '$q', '$state', '$timeout', '$window', 'logger', 'routehelperConfig', 'commonsDataservice', 'paragalaDataservice'];

    // Must configure via the routehelperConfigProvider
    function routehelperConfig() {
        /* jshint validthis:true */
        this.config = {
            // These are the properties we need to set
            // $routeProvider: undefined
            // docTitle: ''
            // resolveAlways: {ready: function(){ } }
        };

        this.$get = function() {
            return {
                config: this.config
            };
        };
    }

    function routehelper( $location, $rootScope, $q, $state, $timeout, $window, logger, routehelperConfig, commonsDataservice, paragalaDataservice ) {
        var handlingRouteChangeError = false;
        var routeCounts = {
            errors: 0,
            changes: 0
        };
        var routes = [];
        //var $routeProvider = routehelperConfig.config.$routeProvider;
        var $stateProvider = routehelperConfig.config.$stateProvider;
        var $urlRouterProvider = routehelperConfig.config.$urlRouterProvider

        var service = {
            configureRoutes: configureRoutes,
            getRoutes: getRoutes,
            routeCounts: routeCounts
        };

        init();

        return service;

        function configureRoutes(routes) {
            routes.forEach(function(route) {
                route.config.resolve =
                    angular.extend( route.config.resolve || {}, routehelperConfig.config.resolveAlways );
                //$routeProvider.when( route.url, route.config );
                $stateProvider.state( route.state, route.config )
            });
            $urlRouterProvider.otherwise("/");
            //$routeProvider.otherwise({redirectTo: '/'});
        }

        function handleRoutingErrors() {
            // Route cancellation:
            // On routing error, go to the dashboard.
            // Provide an exit clause if it tries to do it twice.
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection) {
                    if (handlingRouteChangeError) {
                        return;
                    }
                    routeCounts.errors++;
                    handlingRouteChangeError = true;
                    var destination = (current && (current.title || current.name || current.loadedTemplateUrl)) ||
                        'unknown target';
                    var msg = 'Error routing to ' + destination + '. ' + (rejection.msg || '');
                    logger.warning(msg, [current]);
                    $location.path('/dashboard');
                }
            );
        }

        function init() {
            handleRoutingErrors();
            stateStart();
            updateDocTitle();
        }

        function getRoutes() {
            for (var prop in $route.routes) {
                if ($route.routes.hasOwnProperty(prop)) {
                    var route = $route.routes[prop];
                    var isRoute = !!route.title;
                    if (isRoute) {
                        routes.push(route);
                    }
                }
            }
            return routes;
        }

        function stateStart() {
          $rootScope.$on('$stateChangeStart',
            function( event, toState, toParams, fromState, fromParams ) {
              return $q.all(  studentLoginData('') )
                  .then(function ( response ) {
                    if( response.studentIsAuthenticated ) {
                      $q.all( questionsListData() )
                        .then(function( response ) {
                          $window.location.href = 'paragala/questions?category=' +
                          response.questions[0].title.toLowerCase() + '&sub=2'
                        })
                    }
                  })
              // if( toState.name == 'paragala_questions') {
              //   var promise = [getStudentLoginData()]
              //   return $q.all( promise ).then( function( data ) {
              //     if( data[0].isStudentLogin == false ) {
              //       $state.go('paragala')
              //     }
              //   })
              // } else if( toState.name == 'paragala' ) {
              //   var promise = [getStudentLoginData()]
              //   return $q.all( promise ).then(function( data ) {
              //     if( data[0].isStudentLogin == true ) {
              //       $state.go( 'paragala_questions' )
              //     }
              //   })
              // } else if( toState.name == 'main' ) {
              //   console.log('main')
              //
              //   var promise = [getserviceAdminApiLoginData()]
              //   return $q.all( promise ).then(function( data ) {
              //     console.log( data[0].isserviceAdminApiLogin )
              //     if( data[0].isserviceAdminApiLogin == true ) {
              //       $state.go( 'dashboard' )
              //     }
              //   })
              // }
             })
        }

        function updateDocTitle() {
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams) {
                  routeCounts.changes++;
                  handlingRouteChangeError = false;
                  var title = routehelperConfig.config.docTitle + ' ' + (toState.title || '');
                  $rootScope.title = title; // data bind to <title>
                }
            );
        }

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

        function getStudentLoginData() {
          return commonsDataservice.getStudentLoginStatus( 'student', {} ).then( function ( data ) {
            return data;
          })
        }

        function getserviceAdminApiLoginData() {
          return commonsDataservice.getserviceAdminApiLoginStatus( 'admin', {} ).then( function ( data ) {
            return data;
          })
        }
    }
})();
