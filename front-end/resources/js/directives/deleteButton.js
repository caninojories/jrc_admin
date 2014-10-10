"use strict";

angular.module("ngAPI")
  .directive("deleteButton", function () {
    return {
      restrict : "E",
      replace : true,
      //transclude : true,
      scope : {
        text : "@",
        action : "&",
        comment : "="
      },
      template :  "<button class = 'btn btn-danger btn-xs' ng-click = 'action()'><span class = ''></span>{{text}}</button>"
    }
  })
