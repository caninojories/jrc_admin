(function ($) {
	init();
	function init() {
		initialize();
		offCanvasClose();
	}

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
