jQuery(document).ready(function($) {

	"use strict";

	var eutMediaImageReplaceFrame;
	var eutMediaImageReplaceContainer;
	var eutMediaImageReplaceMode;
	var eutMediaImageReplaceImage;
	var eutMediaImageFieldName;


	$(document).on("click",".eut-upload-remove-image",function(e) {
		e.preventDefault();
		$(this).parent().find('.eut-upload-media-id').val('');
		$(this).parent().removeClass('eut-visible');
	});

	$(document).on("click",".eut-upload-replace-image",function() {
		eutMediaImageReplaceContainer = $(this).parent().find('.eut-thumb-container');
		eutMediaImageReplaceMode = eutMediaImageReplaceContainer.data('mode');
		eutMediaImageFieldName = eutMediaImageReplaceContainer.data('field-name');
		eutMediaImageReplaceImage = $(this).parent().find('.eut-thumb');

		if ( eutMediaImageReplaceFrame ) {
			eutMediaImageReplaceFrame.open();
			return;
		}


		eutMediaImageReplaceFrame = wp.media.frames.eutMediaImageReplaceFrame = wp.media({
			className: 'media-frame eut-media-replace-image-frame',
			frame: 'select',
			multiple: false,
			title: fildisi_eutf_upload_image_replace_texts.modal_title,
			library: {
				type: 'image'
			},
			button: {
				text:  fildisi_eutf_upload_image_replace_texts.modal_button_title
			}

		});

		eutMediaImageReplaceFrame.on('select', function(){
			var selection = eutMediaImageReplaceFrame.state().get('selection');
			var ids = selection.pluck('id');
			eutMediaImageReplaceImage.remove();
			eutMediaImageReplaceContainer.addClass('eut-visible eut-loading');
			var dataParams = {
				action:'fildisi_eutf_get_replaced_image',
				attachment_id: ids.toString(),
				attachment_mode: eutMediaImageReplaceMode,
				field_name: eutMediaImageFieldName,
				_eutf_nonce: fildisi_eutf_upload_image_replace_texts.nonce_replace
			};
			$.post( fildisi_eutf_upload_image_replace_texts.ajaxurl, dataParams, function( mediaHtml ) {
				eutMediaImageReplaceContainer.html(mediaHtml).removeClass('eut-loading');
			}).fail(function(xhr, status, error) {
				eutMediaImageReplaceContainer.removeClass('eut-visible eut-loading');
			});
		});

		eutMediaImageReplaceFrame.open();
	});

});