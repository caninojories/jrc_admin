(function ($) {
	init();
	function init() {
		initialize();
		offCanvasClose();
	}


	$('#fullpage').fullpage({
        verticalCentered: true,
        resize : false,
        sectionsColor : ['#ccc', '#fff'],
        anchors:['firstSlide', 'secondSlide'],
        scrollingSpeed: 700,
        easing: 'easeInQuart',
        menu: false,
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
        paddingTop: '-100px',
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

	function initialize() {
		$('#offCanvasInitiate').on('click', function () {
			$('.offCanvas-container').removeClass('is-hide');
			$('.offCanvas-container').addClass('is-show');
		})
	}

	function offCanvasClose() {
		$('.offCanvas-close').on('click', function() {
			$('.offCanvas-container').removeClass('is-show');
			$('.offCanvas-container').addClass('is-hide');
		})
	}
})( jQuery )
