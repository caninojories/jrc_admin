(function() {
  'use strict';

  angular
    .module( 'app.paragala' )
    .controller( 'Questions', Questions )

    Questions.$inject = ['$q', '$rootScope', '$timeout', 'Restangular', 'paragalaDataservice']

    function Questions( $q, $rootScope, $timeout, Restangular, paragalaDataservice ) {
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

      vm.selected        = selected;
      vm.questionBuilder = [];

        init();

        function init() {
          questionsList();
        }

        function questionsList() {
          return $q.all( questionsListData() )
            .then(function( response ) {
              $rootScope.list = response;
              vm.questionBuilder = angular.copy($rootScope.list);
              for( var i = 0; i < vm.questionBuilder.length; i++) {
                for( var j = 0; j < vm.questionBuilder[i].items.length; j++ ) {
                  for( var z = 0; z < 1; z++ ) {
                    vm.questionBuilder[i].items[j].items.splice(1, vm.questionBuilder[i].items.length -1)
                    vm.questionBuilder[i].items[j].items[0].title = ''
                  }
                }
              }
            })
        }

        function questionsListData() {
          return paragalaDataservice.questionsList( 'questionsList' )
            .then(function( response ) {
              return response.response;
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

        function selected( categoryTitle, subItemTitle, SecondSubItemTitle ) {
          for( var i = 0; i < $rootScope.list.length; i++) {
            if(vm.questionBuilder[i].title == categoryTitle ) {
              for( var j = 0; j <$rootScope.list[i].items.length; j++ ) {
                if($rootScope.list[i].items[j].title == subItemTitle ) {
                  for( var z = 0; z < $rootScope.list[i].items[j].items.length; z++ ) {
                    if( $rootScope.list[i].items[j].items[z].title == SecondSubItemTitle ) {
                      console.log( $rootScope.list[i].items[j].items[z] )
                      vm.questionBuilder[i].items[j].items[0].title = SecondSubItemTitle
                    }
                  }
                }
              }
            }
          }
          console.log( vm.questionBuilder )
          console.log( categoryTitle )
          console.log( subItemTitle )
          console.log( SecondSubItemTitle )
        }
    }
})()
