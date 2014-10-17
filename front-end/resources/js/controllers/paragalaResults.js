"use strict";

angular.module('ngAPI')
	.controller('paragalaResultsCtrl', function($scope, serviceParagalaStudentApi, Restangular, loginService) {
		serviceParagalaStudentApi.all('userResults').getList({}).then(function(response){
			$scope.data = response[0].results
			$scope.actor = response[1].actor
			$scope.actress = response[2].actress
			$scope.maleChildPerformer = response[3].maleChildPerformer
			$scope.femaleChildPerformer = response[4].femaleChildPerformer
			$scope.teleserye = response[5].teleserye
			$scope.sitCom = response[6].sitCom
			$scope.gagShow = response[7].gagShow
			$scope.musicalVarietyShow = response[8].musicalVarietyShow
			$scope.talkShow = response[9].talkShow
			$scope.talkShowHost = response[10].talkShowHost
			$scope.entertainmentNewsProgram = response[11].entertainmentNewsProgram
			$scope.entertainmentNewsProgramHost = response[12].entertainmentNewsProgramHost
			$scope.varietyShow = response[13].varietyShow
			$scope.varietyShowHost = response[14].varietyShowHost
			$scope.gameShow = response[15].gameShow
			$scope.gameShowHost = response[16].gameShowHost
			$scope.dramaAnthology = response[17].dramaAnthology
			$scope.morningShow = response[18].morningShow
			$scope.morningShowHost = response[19].morningShowHost
			$scope.newsProgram = response[20].newsProgram
			$scope.newsProgramMaleAnchor = response[21].newsProgramMaleAnchor
			$scope.newsProgramFemaleAnchor = response[22].newsProgramFemaleAnchor
			$scope.publicAffairsTalkShow = response[23].publicAffairsTalkShow
			$scope.magazineShow = response[24].magazineShow
			$scope.magazineShowHost = response[25].magazineShowHost
			$scope.investigativeShow = response[26].investigativeShow
			$scope.educationalShow = response[27].educationalShow
			$scope.documentaryShow = response[28].documentaryShow
			$scope.localTVStation = response[29].localTVStation
			$scope.TVStation = response[30].TVStation
			console.log("ENTAINMENT: " + response[1].actor.list[0])
		})

		$scope.all = "Know the Results?"
		$scope.trimAll = true
		$scope.trimWinner = false

		$scope.winner = function() {
			console.log($scope.all)

			if($scope.all == "Know the Results?" ) {
				console.log("TRUE")
				$scope.trimWinner = !$scope.trimWinner
				$scope.all = "Return"
			} else {
				$scope.trimWinner = !$scope.trimWinner
				$scope.all = "Know the Results?"
			}


		}
	})
