+ function( $ ) { "use strict";

  var layout = function (SidebarWidth) {
    this.jcaSideBarWidth = SidebarWidth
    return this;
  }

  layout.prototype.init = function () {
    console.log( 'Layout.js is running ')
    this.fullPage();

    return this;
  }

  layout.prototype.fullPage = function() {
    $('#fullpage').fullpage({
          verticalCentered: true,
          resize : false,
          sectionsColor : ['#ccc', '#fff'],
          anchors:['firstSlide', 'secondSlide'],
          scrollingSpeed: 700,
          easing: 'easeInQuart',
          menu: true,
          navigation: false,
          navigationPosition: 'right',
          navigationTooltips: ['firstSlide', 'secondSlide'],
          slidesNavigation: true,
          slidesNavPosition: 'bottom',
          loopBottom: false,
          loopTop: false,
          loopHorizontal: true,
          autoScrolling: true,
          scrollOverflow: false,
          css3: false,
          paddingTop: '40px',
          paddingBottom: '0px',
          normalScrollElements: '#element1, .element2',
          normalScrollElementTouchThreshold: 5,
          keyboardScrolling: true,
          touchSensitivity: 15,
          continuousVertical: false,
          animateAnchor: true,
          sectionSelector: '.section',
          slideSelector: '.slide',

          //events
          onLeave: function(index, nextIndex, direction){},
          afterLoad: function(anchorLink, index){},
          afterRender: function(){},
          afterResize: function(){},
          afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
          onSlideLeave: function(anchorLink, index, slideIndex, direction){}
      });

      $('#secondSection').on('click', function() {
        $.fn.fullpage.moveSectionDown();
      })
  }
  window.jcaLayout = new layout();
}( jQuery )
