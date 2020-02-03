jQuery(document).ready(function($) {

	"use strict";

	$(document).on("change","#eut-post-type-video-mode",function() {

		$( '.eut-post-video-embed' ).hide();
		$( '.eut-post-video-html5' ).hide();

		if( 'html5' == $(this).val() ) {
			$( '.eut-post-video-html5' ).stop( true, true ).fadeIn(500);
		} else {
			$( '.eut-post-video-embed' ).stop( true, true ).fadeIn(500);
		}

	});

	$(document).on("change","#eut-post-type-audio-mode",function() {

		$( '.eut-post-audio-embed' ).hide();
		$( '.eut-post-audio-html5' ).hide();

		if( 'html5' == $(this).val() ) {
			$( '.eut-post-audio-html5' ).stop( true, true ).fadeIn(500);
		} else {
			$( '.eut-post-audio-embed' ).stop( true, true ).fadeIn(500);
		}

	});

	$(document).on("change",".editor-post-format select",function() {
		var format = $(this).val();
		$( '#wpbody-content div[id^=eut-meta-box-post-format-]' ).hide();
		$( '#wpbody-content #eut-meta-box-post-format-' + format ).stop( true, true ).fadeIn(500);

	});

	$(document).on("change","#post-formats-select input",function() {
		var format = $('#post-formats-select input:checked').attr('value');
		if(typeof format != 'undefined') {

			if( '0' == format || 'image' == 'format' ) {
				format = 'standard';
			}

			$( '#post-body div[id^=eut-meta-box-post-format-]' ).hide();
			$( '#post-body #eut-meta-box-post-format-' + format ).stop( true, true ).fadeIn(500);

		}
	});

	$(document).on("change","#eut-post-title-bg-mode",function() {

		$( '.eut-post-title-bg' ).hide();

		if ( 'featured' == $(this).val() ) {
			$( '.eut-post-title-bg-position' ).stop( true, true ).fadeIn(500);
			$( '.eut-post-title-bg-height' ).stop( true, true ).fadeIn(500);
		} else if ( 'custom' == $(this).val() ) {
			$( '.eut-post-title-bg-position' ).stop( true, true ).fadeIn(500);
			$( '.eut-post-title-bg-height' ).stop( true, true ).fadeIn(500);
			$( '.eut-post-title-bg-image' ).stop( true, true ).fadeIn(500);
		}

	});

	$(document).on("change","#eut-post-gallery-mode",function() {

		$( '.eut-post-title-bg' ).hide();

		if ( 'slider' == $(this).val() ) {
			$( '.eut-post-media-item' ).stop( true, true ).fadeIn(500);
		} else {
			$( '.eut-post-media-item' ).hide();
		}

	});

	//Init
	$(window).on('load',function () {
		$('#eut-post-type-video-mode').change();
		$('#eut-post-type-audio-mode').change();
		$('.editor-post-format select').change();
		$('#post-formats-select input').change();
		$('#eut-post-title-bg-mode').change();
		$('#eut-post-gallery-mode').change();
	});


	if ( $( '#wpbody-content #eut-meta-box-post-format-standard').length ) {
		var format = $('#eut-post-format-value').val();
		$( '#wpbody-content div[id^=eut-meta-box-post-format-]' ).hide();
		$( '#wpbody-content #eut-meta-box-post-format-' + format ).stop( true, true ).fadeIn(500);
	}

});