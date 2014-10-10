"use strict";

angular.module("ngAPI")
	.directive("saveButton", function () {
		return {
			restrict : "E",
			replace : true,
			scope : {
				text : "@",
				action : "&"
			},
			template :  "<button class = 'btn btn-success' ng-click = 'action()'><span class = ''></span>{{text}}</button>"
		}
	})
