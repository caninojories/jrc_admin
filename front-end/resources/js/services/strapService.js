
  'use strict';

  angular.module( 'strapService', [] )
    .service('$loginModal',function( $modal ){
      var myModal = $modal({template:'/commonsHtml/login.html', show:false});

      this.show = function() {
        myModal.$promise.then(myModal.show);
      }

      this.hide = function() {
        myModal.$promise.then(myModal.hide);
      }
    });
