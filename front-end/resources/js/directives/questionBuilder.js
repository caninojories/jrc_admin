"use strict";

angular.module('ngAPI')
  .directive('questionBuilder', function (ParagaQuestions) {
    return {
      restrict : "E",
      replace: true,
      controller : function ($scope) {

        $scope.$watch('actor', function () {
          console.log("JORIES")
        })

        ParagaQuestions.one('questionBuilder').get().then(function (response) {
          console.log(response.document.category)
          $scope.doc = response.document;
        })
      },
      template :  '<div>' +
                    '{{doc.category}}' +
                  '</div>'
    }
  })

// <div class="col-sm-6">
//             <div class="panel panel-primary col-sm-10 col-sm-offset-1">
//               <div class="panel-heading row">
//                 <h2 class="panel-title text-center">Best Television Actor</h2>
//               </div>
//               <div class="panel-body">
//                 <ul class="list-group">
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Jericho Rosales in The Leagal Wife (ABS-CBN)" class="ng-valid ng-dirty">Jericho Rosales in The Leagal Wife (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Alden Richard in Carmela (GMA)" class="ng-valid ng-dirty">Alden Richard in Carmela (GMA)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Coco Martin in Ikaw Lamang (ABS-CBN)" class="ng-valid ng-dirty">Coco Martin in Ikaw Lamang (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Aljur Abrenica in Kambal Sirena (GMA)" class="ng-pristine ng-valid">Aljur Abrenica in Kambal Sirena (GMA)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Enrique Gil in Mirabella (ABS-CBN)" class="ng-pristine ng-valid">Enrique Gil in Mirabella (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Paulo Avelino in Sana Bukas pa ang Kahapon (ABS-CBN)" class="ng-pristine ng-valid">Paulo Avelino in Sana Bukas pa ang Kahapon (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Richard Yap in Be Carefull with my Heart (ABS-CBN)" class="ng-pristine ng-valid">Richard Yap in Be Carefull with my Heart (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor" ng-model="actor" value="Alwyn Uytingco in Beki Boxer (TV5)" class="ng-pristine ng-valid">Alwyn Uytingco in Beki Boxer (TV5)
//                       </label>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>


// <h1 class="heading text-center">Entertainment Programs</h1>
//       <div id="main" class="container">
//         <div class="main-panel no-one">
//           <div class="row">
//             <div class="panel panel-primary col-sm-6">
//               <div class="panel-heading row">
//                   <h2 class="panel-title text-center">
//                     Best Television Actor
//                   </h2>
//               </div>
//               <div class="panel-body">
//                 <ul class="list-group">
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Jericho Rosales in The Leagal Wife (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Alden Richard in Carmela (GMA)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Coco Martin in Ikaw Lamang (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Aljur Abrenica in Kambal Sirena (GMA)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Enrique Gil in Mirabella (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Paulo Avelinp in Sana Bukas pa ang Kahapon (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Richard Yap in Be Carefull with my Heart (ABS-CBN)
//                       </label>
//                     </div>
//                   </li>
//                   <li class="list-group-item">
//                     <div class="radio">
//                       <label>
//                         <input type="radio" name="BestTelevisionActor">
//                         Alwyn Uytingco in Beki Boxer (TV5)
//                       </label>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//             </div><!-- panel-primary -->
