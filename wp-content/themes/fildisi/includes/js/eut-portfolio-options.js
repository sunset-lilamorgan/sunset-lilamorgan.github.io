jQuery(document).ready(function($) {

	"use strict";

	$(document).on("change","#eut-portfolio-media-selection",function() {

		$('.eut-portfolio-media-item').hide();

		switch($(this).val()) {
			case "gallery":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-image-link-mode').stop( true, true ).fadeIn(500);
				$('#eut-portfolio-media-slider').stop( true, true ).fadeIn(500);
				$('#eut-slider-container').stop( true, true ).fadeIn(500);
			break;
			case "gallery-vertical":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
				if ( 'no' == $('#eut-portfolio-media-fullwidth').val() ) {
					$('.eut-portfolio-media-image-mode').stop( true, true ).fadeIn(500);
				}
				$('.eut-portfolio-media-image-link-mode').stop( true, true ).fadeIn(500);
				$('#eut-portfolio-media-slider').stop( true, true ).fadeIn(500);
				$('#eut-slider-container').stop( true, true ).fadeIn(500);
			break;
			case "slider":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
				if ( 'no' == $('#eut-portfolio-media-fullwidth').val() ) {
					$('.eut-portfolio-media-image-mode').stop( true, true ).fadeIn(500);
				}
				$('#eut-portfolio-media-slider').stop( true, true ).fadeIn(500);
				$('#eut-portfolio-media-slider-speed').stop( true, true ).fadeIn(500);
				$('#eut-portfolio-media-slider-direction-nav').stop( true, true ).fadeIn(500);
				$('#eut-portfolio-media-slider-direction-nav-color').stop( true, true ).fadeIn(500);
				$('#eut-slider-container').stop( true, true ).fadeIn(500);
			break;
			case "video":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-video-embed').stop( true, true ).fadeIn(500);
			break;
			case "video-html5":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-video-html5').stop( true, true ).fadeIn(500);
			break;
			case "video-code":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-video-code').stop( true, true ).fadeIn(500);
			break;
			case "":
			case "second-image":
				$('.eut-portfolio-media-fullwidth').stop( true, true ).fadeIn(500);
				$('.eut-portfolio-media-margin-bottom').stop( true, true ).fadeIn(500);
			break;
			default:
			break;
		}
	});


	$(document).on("change","#eut-portfolio-media-fullwidth",function() {
		switch($(this).val()) {
			case "yes":
				$('.eut-portfolio-media-image-mode').hide();
			break;
			default:
				if ( 'slider' == $('#eut-portfolio-media-selection').val() || 'gallery-vertical' == $('#eut-portfolio-media-selection').val() ) {
					$('.eut-portfolio-media-image-mode').stop( true, true ).fadeIn(500);
				}
			break;
		}
	});

	$(document).on("change","#eut-portfolio-link-mode",function() {
		switch($(this).val()) {
			case "link":
				$('.eut-portfolio-custom-link-mode').stop( true, true ).fadeIn(500);
			break;
			default:
				$('.eut-portfolio-custom-link-mode').hide();
			break;
		}
	});

	//Init
	$(window).on('load',function () {
		$('#eut-portfolio-media-selection').change();
		$('#eut-portfolio-media-fullwidth').change();
		$('#eut-portfolio-link-mode').change();
	});

});