(function() {
	'use strict';

	angular
		.module('app.paragala')
		.directive('questionSubmit', questionSubmit)

		questionSubmit.$inject = ['$q', '$location', 'ParagalaDataService', 'logger']

		function questionSubmit( $q, $location, ParagalaDataService, logger ) {
      var directive = {
        restrict: 'E',
        replace: true,
        controller: controller,
        template: template
      }

      return directive;

      function controller( $scope ) {
	      $scope.submit = function() {
					var promise = [postAnswer( $scope )]
					return $q.all( promise ).then(function ( data ) {
						if( data[0] == 'success') {
							var promise = [getStudentLogout()]
							return $q.all( promise ).then(function( data ) {
            		$location.path('/paragala')
          		})
						}
					})
				}
      }


      function getStudentLogout() {
        return ParagalaDataService.studentLogout( 'logout' ).then(function( data ) {
          return data;
        })
      }


      function postAnswer( $scope ) {
      	var data = getData( $scope )
      	return ParagalaDataService.postAnswerStudent( 'castUserVotes', {data: data } ).then( function ( data ) {
      		return data;
      	})
      }

      function template() {
        return '<button ng-click="submit()" ng-disabled="vm.finalSubmit" class="btn btn-success" > Submit</button>'
      }
			
      function getData( $scope ) {
      	$scope.data = {
		    	MainCategory : [{
		    		title: "Entertainment Programs",
		    		subCategory: [{
		    			title: "Best Television Actor",
		    			data: $scope.vm.actor
		    		}, {
		    			title: "Best Television Actress",
		    			data: $scope.vm.actress
		    		}, {
		    			title: "Best Male Child Performer",
		    			data: $scope.vm.maleChildPerformer
		    		}, {
		    			title: "Best Female Child Performer",
		    			data: $scope.vm.femaleChildPerformer
		    		}, {
		    			title: "Best Teleserye",
		    			data: $scope.vm.teleserye
		    		}, {
		    			title: "Best Sitcom",
		    			data: $scope.vm.sitcom
		    		}, {
		    			title: "Best Gag Show",
		    			data: $scope.vm.gagShow
		    		}, {
		    			title: "Best Musical Variety Show",
		    			data: $scope.vm.musicalVarietyShow
		    		}, {
		    			title: "Best Talk Show",
		    			data: $scope.vm.talkShow
		    		}, {
		    			title: "Best Talk Show Host",
		    			data: $scope.vm.talkShowHost
		    		}, {
		    			title: "Best Entertainment News Program",
		    			data: $scope.vm.entertainmentNewsProgram
		    		}, {
		    			title: "Best Entertainment News Program Host",
		    			data: $scope.vm.entertainmentNewsProgramHost
		    		}, {
		    			title: "Best Variety Show",
		    			data: $scope.vm.varietyShow
		    		}, {
		    			title: "Best Variety Show Host",
		    			data: $scope.vm.varietyShowHost
		    		}, {
		    			title: "Best Game Show",
		    			data: $scope.vm.gameShow
		    		}, {
		    			title: "Best Game Show Host",
		    			data: $scope.vm.gameShowHost
		    		}, {
		    			title: "Best Drama Anthology",
		    			data: $scope.vm.dramaAnthology
		    		}]
		    	}, {
		    		title: "News Program",
		    		subCategory:[{
		    			title: "Best Morning Show",
		    			data: $scope.vm.morningShow
		    		}, {
		    			title: "Best Morning Show Host",
		    			data: $scope.vm.morningShowHost
		    		}, {
		    			title: "Best News Program",
		    			data: $scope.vm.newsProgram
		    		}, {
		    			title: "Best News Program Male Anchor",
		    			data: $scope.vm.newsProgramMaleAnchor
		    		}, {
		    			title: "Best News Program Female Anchor",
		    			data: $scope.vm.newsProgramFemaleAnchor
		    		}, {
		    			title: "Best News Public Affairs Talk Show",
		    			data: $scope.vm.newsPublicAffairsTalkShow
		    		}, {
		    			title: "Best Magazine Show",
		    			data: $scope.vm.magazineShow
		    		}, {
		    			title: "Best Magazine Show Host",
		    			data: $scope.vm.magazineShowHost
		    		}, {
		    			title: "Best Investigative Show",
		    			data: $scope.vm.investigativeShow
		    		}, {
		    			title: "Best Education Show",
		    			data: $scope.vm.educationShow
		    		}, {
		    			title: "Best Documentary Show",
		    			data: $scope.vm.documentaryShow
		    		}]
		    	}, {
		    		title: "Best Television Stations",
		    		subCategory:[{
		    			title: "Best Local TV Station",
		    			data: $scope.vm.localTVStation
		    		}, {
		    			title: "Best TV Station",
		    			data: $scope.vm.TVStation
		    		}]
		    	}]
    		}

    		return $scope.data;

      }
		}
})()
