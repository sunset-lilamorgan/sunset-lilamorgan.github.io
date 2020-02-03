jQuery(document).ready(function($) {

	"use strict";

	var eutMediaSliderFrame;
	var eutMediaSliderContainer = $( "#eut-slider-container" );
	if ( eutMediaSliderContainer.length ) {
		eutMediaSliderContainer.sortable();
	}

	$(document).on("click",".eut-slider-item-delete-button",function() {
		$(this).parent().remove();
	});

	$(document).on("click",".eut-upload-slider-button",function() {

		if ( eutMediaSliderFrame ) {
			eutMediaSliderFrame.open();
			return;
		}

		eutMediaSliderFrame = wp.media.frames.eutMediaSliderFrame = wp.media({
			className: 'media-frame eut-media-slider-frame',
			frame: 'select',
			multiple: 'toggle',
			title: fildisi_eutf_upload_slider_texts.modal_title,
			library: {
				type: 'image'
			},
			button: {
				text:  fildisi_eutf_upload_slider_texts.modal_button_title
			}

		});
		eutMediaSliderFrame.on('select', function(){
			var selection = eutMediaSliderFrame.state().get('selection');
			var ids = selection.pluck('id');
			
			$('#eut-upload-slider-button-spinner').show();
			var dataParams = {
				action:'fildisi_eutf_get_slider_media',
				attachment_ids: ids.toString(),
				_eutf_nonce: fildisi_eutf_upload_slider_texts.nonce_slider_media
			};
			$.post( fildisi_eutf_upload_slider_texts.ajaxurl, dataParams, function( mediaHtml ) {
				eutMediaSliderContainer.append(mediaHtml);
				$('#eut-upload-slider-button-spinner').hide();
			}).fail(function(xhr, status, error) {
				$('#eut-upload-slider-button-spinner').hide();
			});
		});
		eutMediaSliderFrame.on('ready', function(){
			$( '.media-modal' ).addClass( 'eut-media-no-sidebar' );
		});


		eutMediaSliderFrame.open();
	});


});