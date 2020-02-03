jQuery(document).ready(function($) {

	"use strict";

	var eutFeatureSliderFrame;
	var eutFeatureSliderContainer = $( "#eut-feature-slider-container" );
	if ( eutFeatureSliderContainer.length ) {
		eutFeatureSliderContainer.sortable();
	}

	$(document).on("click",".eut-feature-slider-item-delete-button",function() {
		$(this).parent().remove();
	});

	$(document).on("click",".eut-upload-feature-slider-post-button",function() {

		var post_ids = $('#eut-upload-feature-slider-post-selection').val();
		if( '' != post_ids ) {
			var dataParams = {
				action:'fildisi_eutf_get_admin_feature_slider_media',
				post_ids: post_ids.toString(),
				_eutf_nonce: fildisi_eutf_upload_feature_slider_texts.nonce_feature_slider_media
			};
			$.post( fildisi_eutf_upload_feature_slider_texts.ajaxurl, dataParams, function( mediaHtml ) {
				eutFeatureSliderContainer.append(mediaHtml);
				$(this).eutFeatureSliderUpdatefunctions();
			}).fail(function(xhr, status, error) {
				$('#eut-upload-feature-slider-button-spinner').hide();
			});
		}

	});

	$(document).on("click",".eut-upload-feature-slider-button",function() {

		if ( eutFeatureSliderFrame ) {
			eutFeatureSliderFrame.open();
			return;
		}

		eutFeatureSliderFrame = wp.media.frames.eutFeatureSliderFrame = wp.media({
			className: 'media-frame eut-media-feature-slider-frame',
			frame: 'select',
			multiple: 'toggle',
			title: fildisi_eutf_upload_feature_slider_texts.modal_title,
			library: {
				type: 'image'
			},
			button: {
				text:  fildisi_eutf_upload_feature_slider_texts.modal_button_title
			}

		});
		eutFeatureSliderFrame.on('select', function(){
			var selection = eutFeatureSliderFrame.state().get('selection');
			var ids = selection.pluck('id');

			$('#eut-upload-feature-slider-button-spinner').show();
			var dataParams = {
				action:'fildisi_eutf_get_admin_feature_slider_media',
				attachment_ids: ids.toString(),
				_eutf_nonce: fildisi_eutf_upload_feature_slider_texts.nonce_feature_slider_media
			};
			$.post( fildisi_eutf_upload_feature_slider_texts.ajaxurl, dataParams, function( mediaHtml ) {
				eutFeatureSliderContainer.append(mediaHtml);
				$(this).eutFeatureSliderUpdatefunctions();
			}).fail(function(xhr, status, error) {
				$('#eut-upload-feature-slider-button-spinner').hide();
			});
		});
		eutFeatureSliderFrame.on('ready', function(){
			$( '.media-modal' ).addClass( 'eut-media-no-sidebar' );
		});


		eutFeatureSliderFrame.open();
	});

	$.fn.eutFeatureSliderUpdatefunctions = function(){
		$('.eut-slider-item.eut-item-new .wp-color-picker-field').wpColorPicker();
		$('.eut-slider-item.eut-item-new').removeClass('eut-item-new');
		$('#eut-upload-feature-slider-button-spinner').hide();
		$( "[data-dependency]" ).eutInitFieldsDependency();
	}


	if( $('.eut-post-selector-select2').length ) {
		$('.eut-post-selector-select2').select2( {
			placeholder: 'Select a post',
			multiple: true,
			minimumInputLength: 3,
			ajax: {
				url: ajaxurl,
				dataType: 'json',
				data: function (term, page) {
					return {
						q: term,
						action: 'fildisi_eutf_post_select_lookup',
						_eutf_nonce: fildisi_eutf_upload_feature_slider_texts.nonce_post_titles_select_lookup
					};
				},
				results: eutProcessPostSelectDataForSelect2
			},
			initSelection: function(element, callback) {
				var ids=$(element).val();
				if (ids!=="") {
					$.ajax(ajaxurl, {
						data: {
							action: 'fildisi_eutf_get_post_titles',
							post_ids: ids,
							_eutf_nonce: fildisi_eutf_upload_feature_slider_texts.nonce_post_titles
						},
						dataType: "json"
					}).done(function(data) {
						var processedData = eutProcessPostSelectDataForSelect2(data);
						callback(processedData.results); });
				}
			},
		});
	}


});

function eutProcessPostSelectDataForSelect2( ajaxData, page, query ) {

	var items=[];
	var newItem=null;

	for (var thisId in ajaxData) {
		newItem = {
			'id': ajaxData[thisId]['id'],
			'text': ajaxData[thisId]['title']
		};
		items.push(newItem);
	}
	return { results: items };
}