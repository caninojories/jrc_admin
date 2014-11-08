(function() {
  'use strict';

  angular
    .module( 'app.paragala' )
    .controller( 'QuestionsAdmin', QuestionsAdmin )

    QuestionsAdmin.$inject = ['$q', '$rootScope', '$timeout', 'Restangular', 'paragalaDataservice']

    function QuestionsAdmin( $q, $rootScope, $timeout, Restangular, paragalaDataservice ) {
      var vm = this;

      vm.newSubItem = newSubItem;
      vm.remove     = remove;
      vm.toggle     = toggle;


      vm.categoryOriginalValue = null;
      vm.editCategory          = editCategory;
      vm.saveCategory          = saveCategory;
      vm.cancelEditingCategory = cancelEditingCategory;

      vm.subItemOriginalValue  = null;
      vm.editSubItem           = editSubItem;
      vm.saveSubItem           = saveSubItem;
      vm.cancelEditingSubItem  = cancelEditingSubItem;

      vm.secondSubItemOriginalValue = null
      vm.editSecondSubItem          = editSecondSubItem;
      vm.saveSecondSubItem          = saveSecondSubItem;
      vm.cancelEditingSecondSubItem = cancelEditingSecondSubItem;

        init();

        function init() {
          questionsList();
        }

        function questionsList() {
          return $q.all( questionsListData() )
            .then(function( response ) {
              console.log( response )
              $rootScope.list = response.questions;
            })
        }

        function questionsListData() {
          return paragalaDataservice.questionsList( 'questionsListAdmin', {} )
            .then(function( response ) {
              return response;
            })
        }

        $rootScope.treeOptions = {
          dropped: function( event ) {
            return $q.all( questionsData() )
              .then(function( response ) {
                return response;
              })
          }
        }

        function questionsData() {
          return paragalaDataservice.questionsUpdate( 'questionsUpdate',  {updateQuestions:angular.toJson($rootScope.list)} )
            .then(function( response ) {
              return response;
            })
        }

        function newSubItem( scope ) {
          var nodeData = scope.$modelValue;
          nodeData.items.push({
            title: nodeData.title + '.' + (nodeData.items.length + 1),
            editing: false,
            selected: false,
            items: []
          });
          return $q.all( questionsData() )
            .then(function( response ) {
              return response;
            })
        }

        function remove( scope ) {
          scope.remove();
          return $q.all( questionsData() )
            .then(function( response ) {
              return response;
            })
        }

        function toggle( scope ) {
          scope.toggle();
        }


        function editCategory( item ) {
          vm.categoryOriginalValue = item.title;
          item.editing = true;
        }

        function saveCategory( item ) {
          item.editing = false;
          return $q.all( questionsData() )
            .then(function( response ) {
              return response;
            })
        }

        function cancelEditingCategory( item ) {
          item.editing = false;
          item.title = vm.categoryOriginalValue;
        }

        function editSubItem( subItem ) {
          vm.subItemOriginalValue = subItem.title;
          subItem.editing = true;
        }

        function saveSubItem( subItem ) {
          subItem.editing = false;
          return $q.all( questionsData() )
            .then(function( response ) {
              return response;
            })
        }

        function cancelEditingSubItem( subItem ) {
          subItem.editing = false;
          subItem.title = vm.subItemOriginalValue;
        }

        function editSecondSubItem( secondSubItem ) {
          vm.secondSubItemOriginalValue = secondSubItem.title;
          secondSubItem.editing = true;
        }

        function saveSecondSubItem( secondSubItem ) {
          secondSubItem.editing = false;
          return $q.all( questionsData() )
            .then(function( response ) {
              return response;
            })
        }

        function cancelEditingSecondSubItem( secondSubItem ) {
          secondSubItem.editing = false;
          secondSubItem.title = vm.secondSubItemOriginalValue;
        }
    }
})()
