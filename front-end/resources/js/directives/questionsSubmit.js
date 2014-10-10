"use strict";

angular
	.module("app.paragala")
	.directive( "questionsSubmit", questionsSubmit )

	function questionsSubmit() {
		return {
			restrict: 'E',
			replace: true,
			controller: controller,
			template: '<button ng-click="submit()" class="btn btn-success" ng-disabled="finalSubmit" ng-show="!finalSubmit"> Submits</button>'
		}

		function controller( $scope, $location ) {
			$scope.submit = function() {
				console.log( $scope.vm.actor )
			}
		}
	}


					// $scope.data = {
			  //   	MainCategory : [{
			  //   		title: "Entertainment Programs",
			  //   		subCategory: [{
			  //   			title: "Best Television Actor",
			  //   			data: $scope.itemData.actor
			  //   		}, {
			  //   			title: "Best Television Actress",
			  //   			data: $scope.itemData.actress
			  //   		}, {
			  //   			title: "Best Male Child Performer",
			  //   			data: $scope.itemData.maleChildPerformer
			  //   		}, {
			  //   			title: "Best Female Child Performer",
			  //   			data: $scope.itemData.femaleChildPerformer
			  //   		}, {
			  //   			title: "Best Teleserye",
			  //   			data: $scope.itemData.teleserye
			  //   		}, {
			  //   			title: "Best Sitcom",
			  //   			data: $scope.itemData.sitcom
			  //   		}, {
			  //   			title: "Best Gag Show",
			  //   			data: $scope.itemData.gagShow
			  //   		}, {
			  //   			title: "Best Musical Variety Show",
			  //   			data: $scope.itemData.musicalVarietyShow
			  //   		}, {
			  //   			title: "Best Talk Show",
			  //   			data: $scope.itemData.talkShow
			  //   		}, {
			  //   			title: "Best Talk Show Host",
			  //   			data: $scope.itemData.talkShowHost
			  //   		}, {
			  //   			title: "Best Entertainment News Program",
			  //   			data: $scope.itemData.entertainmentNewsProgram
			  //   		}, {
			  //   			title: "Best Entertainment News Program Host",
			  //   			data: $scope.itemData.entertainmentNewsProgramHost
			  //   		}, {
			  //   			title: "Best Variety Show",
			  //   			data: $scope.itemData.varietyShow
			  //   		}, {
			  //   			title: "Best Variety Show Host",
			  //   			data: $scope.itemData.varietyShowHost
			  //   		}, {
			  //   			title: "Best Game Show",
			  //   			data: $scope.itemData.gameShow
			  //   		}, {
			  //   			title: "Best Game Show Host",
			  //   			data: $scope.itemData.gameShowHost
			  //   		}, {
			  //   			title: "Best Drama Anthology",
			  //   			data: $scope.itemData.dramaAnthology
			  //   		}]
			  //   	}, {
			  //   		title: "News Program",
			  //   		subCategory:[{
			  //   			title: "Best Morning Show",
			  //   			data: $scope.itemData.morningShow
			  //   		}, {
			  //   			title: "Best Morning Show Host",
			  //   			data: $scope.itemData.morningShowHost
			  //   		}, {
			  //   			title: "Best News Program",
			  //   			data: $scope.itemData.newsProgram
			  //   		}, {
			  //   			title: "Best News Program Male Anchor",
			  //   			data: $scope.itemData.newsProgramMaleAnchor
			  //   		}, {
			  //   			title: "Best News Program Female Anchor",
			  //   			data: $scope.itemData.newsProgramFemaleAnchor
			  //   		}, {
			  //   			title: "Best News Public Affairs Talk Show",
			  //   			data: $scope.itemData.newsPublicAffairsTalkShow
			  //   		}, {
			  //   			title: "Best Magazine Show",
			  //   			data: $scope.itemData.magazineShow
			  //   		}, {
			  //   			title: "Best Magazine Show Host",
			  //   			data: $scope.itemData.magazineShowHost
			  //   		}, {
			  //   			title: "Best Investigative Show",
			  //   			data: $scope.itemData.investigativeShow
			  //   		}, {
			  //   			title: "Best Education Show",
			  //   			data: $scope.itemData.educationShow
			  //   		}, {
			  //   			title: "Best Documentary Show",
			  //   			data: $scope.itemData.documentaryShow
			  //   		}]
			  //   	}, {
			  //   		title: "Best Television Stations",
			  //   		subCategory:[{
			  //   			title: "Best Local TV Station",
			  //   			data: $scope.itemData.localTVShow
			  //   		}, {
			  //   			title: "Best TV Station",
			  //   			data: $scope.itemData.TVStation
			  //   		}]
			  //   	}]
    	// 		}

    			// ParagalaStudent.all('castUserVotes').post({data: $scope.data}).then(function (response) {
    			// 	console.log(response)
    			// 	if(response.response == 'success') {
    			// 		ParagalaStudent.all('logout').post().then(function (response) {
		     //        if(response.response == "success"){
		     //          $location.path('/paragala')
		     //          setTimeout(function () {
		     //            location.reload();
		     //          }, 100)
		     //        }
	      //     	});
    			// 	}
    			// })


