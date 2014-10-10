// //(function () {
//   'use strict';

//   angular
//     .module("ngAPI")
//     .controller('Dashboard', Dashboard);


//     // .controller("layoutCtrl", function ( $scope , loginService) {
//     //   $scope.$on('$viewContentLoaded', function() {
//     //     jcaLayout.init();
//     //   });

//   function Dashboard() {
//     var vm = this;
//     return vm;
//     function init() {

//     }
//   }
// //})
//   //   $scope.itemData = {}
//   //   $scope.itemData.actor = "$scope.actor"
//   //   $scope.$watch("actor", function () {
//   //   	$scope.itemData.actor = $scope.actor
//   //     console.log($scope.actor)
//   //   })
//   //   $scope.$watch("actress", function () {
//   //   	$scope.itemData.actress = $scope.actress
//   //   })
//   //   $scope.$watch("maleChildPerformer", function () {
//   //   	$scope.itemData.maleChildPerformer = $scope.maleChildPerformer
//   //   })
//   //   $scope.$watch("femaleChildPerformer", function () {
//   //   	$scope.itemData.femaleChildPerformer = $scope.femaleChildPerformer
//   //   })
//   //   $scope.$watch("teleserye", function () {
//   //   	$scope.itemData.teleserye = $scope.teleserye
//   //   })
//   //   $scope.$watch("sitcom", function () {
//   //   	$scope.itemData.sitcom = $scope.sitcom
//   //   })
//   //   $scope.$watch("gagShow", function () {
//   //   	$scope.itemData.gagShow = $scope.gagShow
//   //   })
//   //   $scope.$watch("musicalVarietyShow", function () {
//   //   	$scope.itemData.musicalVarietyShow = $scope.musicalVarietyShow
//   //   })
//   //   $scope.$watch("talkShow", function () {
//   //   	$scope.itemData.talkShow = $scope.talkShow
//   //   })
//   //   $scope.$watch("talkShowHost", function () {
//   //   	$scope.itemData.talkShowHost = $scope.talkShowHost
//   //   })
//   //   $scope.$watch("entertainmentNewsProgram", function () {
//   //   	$scope.itemData.entertainmentNewsProgram = $scope.entertainmentNewsProgram
//   //   })
//   //   $scope.$watch("entertainmentNewsProgramHost", function () {
//   //   	$scope.itemData.entertainmentNewsProgramHost = $scope.entertainmentNewsProgramHost
//   //   })
//   //   $scope.$watch("varietyShow", function () {
//   //   	$scope.itemData.varietyShow = $scope.varietyShow
//   //   })
//   //   $scope.$watch("varietyShowHost", function () {
//   //   	$scope.itemData.varietyShowHost = $scope.varietyShowHost
//   //   })
//   //   $scope.$watch("gameShow", function () {
//   //   	$scope.itemData.gameShow = $scope.gameShow
//   //   })
//   //   $scope.$watch("gameShowHost", function () {
//   //   	$scope.itemData.gameShowHost = $scope.gameShowHost
//   //   })
//   //   $scope.$watch("dramaAnthology", function () {
//   //   	$scope.itemData.dramaAnthology = $scope.dramaAnthology
//   //   })
//   //   $scope.$watch("morningShow", function () {
//   //   	$scope.itemData.morningShow = $scope.morningShow
//   //   })
//   //   $scope.$watch("morningShowHost", function () {
//   //   	$scope.itemData.morningShowHost = $scope.morningShowHost
//   //   })
//   //   $scope.$watch("newsProgram", function () {
//   //   	$scope.itemData.newsProgram = $scope.newsProgram
//   //   })
//   //   $scope.$watch("newsProgramMaleAnchor", function () {
//   //   	$scope.itemData.newsProgramMaleAnchor = $scope.newsProgramMaleAnchor
//   //   })
//   //   $scope.$watch("newsProgramFemaleAnchor", function () {
//   //   	$scope.itemData.newsProgramFemaleAnchor = $scope.newsProgramFemaleAnchor
//   //   })
//   //   $scope.$watch("newsPublicAffairsTalkShow", function () {
//   //   	$scope.itemData.newsPublicAffairsTalkShow = $scope.newsPublicAffairsTalkShow
//   //   })
//   //   $scope.$watch("magazineShow", function () {
//   //   	$scope.itemData.magazineShow = $scope.magazineShow
//   //   })
//   //   $scope.$watch("magazineShowHost", function () {
//   //   	$scope.itemData.magazineShowHost = $scope.magazineShowHost
//   //   })
//   //   $scope.$watch("investigativeShow", function () {
//   //   	$scope.itemData.investigativeShow = $scope.investigativeShow
//   //   })
//   //   $scope.$watch("educationShow", function () {
//   //   	$scope.itemData.educationShow = $scope.educationShow
//   //   })
//   //   $scope.$watch("documentaryShow", function () {
//   //   	$scope.itemData.documentaryShow = $scope.documentaryShow
//   //   })
//   //   $scope.$watch("localTVShow", function () {
//   //   	$scope.itemData.localTVShow = $scope.localTVShow
//   //   })
//   //   $scope.$watch("TVStation", function () {
//   //   	$scope.itemData.TVStation = $scope.TVStation
//   //   })

//   //   $scope.one          = true;
//   //   $scope.two          = true;
//   //   $scope.three        = true;
//   //   $scope.four         = true;
//   //   $scope.five         = true;
//   //   $scope.six          = true;
//   //   $scope.seven        = true;
//   //   $scope.finalSubmit  = true;

//   //   $scope.header = "ENTERTAINMENT PROGRAMS"
//   //   var counter = 0
//   //   $scope.counter = function() {
//   //     counter += 1;
//   //     console.log(counter)
//   //     if(counter == 4) {
//   //       $scope.header = "NEWS PROGRAMS"
//   //     } else if(counter == 7) {
//   //       $scope.header = "TELEVISION STATIONS"
//   //     }
//   //   }

//   //   $scope.$watchCollection('[actor, actress, maleChildPerformer, femaleChildPerformer]', function() {
//   //     if($scope.actor != undefined && $scope.actress != undefined && $scope.maleChildPerformer != undefined && $scope.femaleChildPerformer != undefined) {
//   //       $scope.one = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[teleserye, sitcom, gagShow, musicalVarietyShow]', function() {
//   //     if($scope.teleserye != undefined && $scope.sitcom != undefined && $scope.gagShow != undefined && $scope.musicalVarietyShow != undefined) {
//   //       $scope.two = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[talkShow, talkShowHost, entertainmentNewsProgram, entertainmentNewsProgramHost]', function() {
//   //     if($scope.talkShow != undefined && $scope.talkShowHost != undefined && $scope.entertainmentNewsProgram != undefined && $scope.entertainmentNewsProgramHost != undefined) {
//   //       $scope.three = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[varietyShow, varietyShowHost, gameShow, gameShowHost, dramaAnthology]', function() {
//   //     if($scope.varietyShow != undefined && $scope.varietyShowHost != undefined && $scope.gameShow != undefined && $scope.gameShowHost != undefined && $scope.dramaAnthology != undefined) {
//   //       $scope.four = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[morningShow, morningShowHost, newsProgram, newsProgramMaleAnchor]', function() {
//   //     if($scope.morningShow != undefined && $scope.morningShowHost != undefined && $scope.newsProgram != undefined && $scope.newsProgramMaleAnchor != undefined) {
//   //       $scope.five = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[newsProgramFemaleAnchor, newsPublicAffairsTalkShow, magazineShow, magazineShowHost]', function() {
//   //     if($scope.newsProgramFemaleAnchor != undefined && $scope.newsPublicAffairsTalkShow != undefined && $scope.magazineShow != undefined && $scope.magazineShowHost != undefined) {
//   //       $scope.six = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[investigativeShow, educationShow, documentaryShow]', function() {
//   //     if($scope.investigativeShow != undefined && $scope.educationShow != undefined && $scope.documentaryShow != undefined) {
//   //       $scope.seven = false
//   //     }
//   //   })

//   //   $scope.$watchCollection('[actor, actress, maleChildPerformer, femaleChildPerformer, teleserye, sitcom, gagShow, musicalVarietyShow, talkShow, talkShowHost, entertainmentNewsProgram, entertainmentNewsProgramHost, varietyShow, varietyShowHost, gameShow, gameShowHost, dramaAnthology, morningShow, morningShowHost, newsProgram, newsProgramMaleAnchor, newsProgramFemaleAnchor, newsPublicAffairsTalkShow, magazineShow, magazineShowHost, investigativeShow, educationShow, documentaryShow, localTVShow, TVStation]', function () {

//   //     if( $scope.actor != undefined && $scope.actress != undefined &&
//   //         $scope.maleChildPerformer != undefined && $scope.femaleChildPerformer != undefined &&
//   //         $scope.teleserye != undefined && $scope.sitcom != undefined &&
//   //         $scope.gagShow != undefined && $scope.musicalVarietyShow != undefined &&
//   //         $scope.talkShow != undefined && $scope.talkShowHost != undefined &&
//   //         $scope.entertainmentNewsProgram != undefined && $scope.entertainmentNewsProgramHost != undefined &&
//   //         $scope.varietyShow != undefined && $scope.varietyShowHost != undefined && $scope.gameShow != undefined &&
//   //         $scope.gameShowHost != undefined && $scope.dramaAnthology != undefined &&
//   //         $scope.morningShow != undefined && $scope.morningShowHost != undefined &&
//   //         $scope.newsProgram != undefined && $scope.newsProgramMaleAnchor != undefined &&
//   //         $scope.morningShow != undefined && $scope.morningShowHost != undefined &&
//   //         $scope.newsProgram != undefined && $scope.newsProgramMaleAnchor != undefined &&
//   //         $scope.newsProgramFemaleAnchor != undefined && $scope.newsPublicAffairsTalkShow != undefined &&
//   //         $scope.magazineShow != undefined && $scope.magazineShowHost != undefined &&
//   //         $scope.investigativeShow != undefined && $scope.educationShow != undefined &&
//   //         $scope.documentaryShow != undefined && $scope.localTVShow != undefined &&
//   //         $scope.TVStation != undefined) {
//   //           $scope.finalSubmit  = false;
//   //     }

//   //   })

//   // })
