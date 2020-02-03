jQuery(document).ready(function($) {

	"use strict";

	//Feature Element Selector
	$(document).on("change","#eut-page-feature-element",function() {

		$('.eut-feature-section-item').hide();
		$('.eut-feature-required').hide();
		$('.eut-feature-options-wrapper').show();

		switch($(this).val())
		{
			case "title":
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-tab-content-link').click();
				$('.eut-item-feature-content-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-extra-settings').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-container').stop( true, true ).fadeIn(500);
			break;
			case "image":
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-tab-bg-link').click();
				$('.eut-item-feature-bg-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-content-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-image-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-overlay-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-button-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-extra-settings').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-container').stop( true, true ).fadeIn(500);

			break;
			case "video":
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-tab-video-link').click();
				$('.eut-item-feature-video-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-bg-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-content-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-overlay-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-button-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-extra-settings').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-container').stop( true, true ).fadeIn(500);
			break;
			case "youtube":
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-tab-youtube-link').click();
				$('.eut-item-feature-youtube-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-bg-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-content-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-overlay-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-button-settings').stop( true, true ).fadeIn(500);
				$('.eut-item-feature-extra-settings').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-container').stop( true, true ).fadeIn(500);
			break;
			case "slider":
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-section-slider').stop( true, true ).fadeIn(500);
				$('#eut-feature-slider-container').stop( true, true ).fadeIn(500);
			break;
			case "map":
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-section-map').stop( true, true ).fadeIn(500);
				$('#eut-feature-map-container').stop( true, true ).fadeIn(500);
			break;
			case "revslider":
				$('.eut-feature-options-wrapper').hide();
				$('#eut-feature-section-options').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-tab-revslider-link').click();
				$('.eut-item-feature-revslider-settings').stop( true, true ).fadeIn(500);
				$('#eut-feature-single-container').stop( true, true ).fadeIn(500);
			break;
			default:
			break;
		}
	});

	$(document).on("change","#eut-page-feature-size",function() {

		if( 'custom' == $(this).val() ) {
			$('#eut-feature-section-height').stop( true, true ).fadeIn(500);
		} else {
			$('#eut-feature-section-height').hide();
		}

	});

	$(document).on("change",".eut-select-color-extra",function() {
		if( 'custom' == $(this).val() ) {
			$(this).parents('.eut-field-items-wrapper').find('.eut-wp-colorpicker').show();
		} else {
			$(this).parents('.eut-field-items-wrapper').find('.eut-wp-colorpicker').hide();
		}
	});

	//Init
	$(window).on('load',function () {
		$('#eut-page-feature-element').change();
		$('#eut-page-feature-size').change();
		$('.eut-select-color-extra').change();
	});



	$('.wp-color-picker-field').wpColorPicker();
	

	//Feature Element Map
	$(document).on("click","#eut-upload-multi-map-point",function() {
		$('#eut-upload-multi-map-point').attr('disabled','disabled').addClass('disabled');
		$('#eut-upload-multi-map-button-spinner').show();
		var dataParams = {
			action:'fildisi_eutf_get_map_point',
			map_mode:'new',
			_eutf_nonce: fildisi_eutf_feature_section_texts.nonce_map_point
		};		
		$.post( fildisi_eutf_feature_section_texts.ajaxurl, dataParams, function( mediaHtml ) {
			$('#eut-feature-map-container').append(mediaHtml);
			$('#eut-upload-multi-map-point').removeAttr('disabled').removeClass('disabled');
			$('#eut-upload-multi-map-button-spinner').hide();
		}).fail(function(xhr, status, error) {
			$('#eut-upload-multi-map-point').removeAttr('disabled').removeClass('disabled');
			$('#eut-upload-multi-map-button-spinner').hide();
		});
	});	
	$(document).on("click",".eut-map-item-delete-button",function() {
		$(this).parent().remove();
	});
	$(document).on("click",".postbox.eut-toggle-new .handlediv",function() {
		var p = $(this).parent('.postbox');
		p.toggleClass('closed');
	});

	// TABS METABOXES
	$(document).on("click",".eut-tabs .eut-tab-links a",function(e) {
		var currentAttrValue = $(this).attr('href');

		$('.eut-tabs ' + currentAttrValue).show().siblings().hide();
		$(this).parent('li').addClass('active').siblings().removeClass('active');

		e.preventDefault();
	});

	// LABEL TITLES
	$(document).on("change",".eut-admin-label-update",function() {
		var itemID = $(this).attr('id') + '_admin_label';
		$('#' + itemID ).html($(this).val());
	});

	// FIELDS DEPENDENCY
	$(document).on("change",".eut-dependency-field",function() {
		$(this).eutFieldsDependency();
	});

	$.fn.eutFieldsDependency = function(){

		var groupID = $(this).data( "group");

		$('#' + groupID + " [data-dependency] ").each(function() {
			var dataDependency = $(this).data( "dependency"),
				show = true;

			for (var i = 0; i < dataDependency.length; i++) {

				var depId = dataDependency[i].id,
					depValues = dataDependency[i].values,
					depNotEqualValue = dataDependency[i].value_not_equal_to,
					depVal = $('#' + depId ).val();

				if( depNotEqualValue ) {
					if($.inArray( depVal, depNotEqualValue ) == -1){
						show = true;
					} else {
						show = false;
					}
				} else {
					if($.inArray( depVal, depValues ) == -1){
						show = false;
					}
				}

			}

			if( show ) {
				$(this).fadeIn(500);
			} else {
				$(this).hide();
			}
		});
    }

	$.fn.eutInitFieldsDependency = function(){

		$(this).each(function() {
			var dataDependency = $(this).data( "dependency"),
				show = true;

			for (var i = 0; i < dataDependency.length; i++) {

				var depId = dataDependency[i].id,
					depValues = dataDependency[i].values,
					depNotEqualValue = dataDependency[i].value_not_equal_to,
					depVal = $('#' + depId ).val();

				if( depNotEqualValue ) {
					if($.inArray( depVal, depNotEqualValue ) == -1){
						show = true;
					} else {
						show = false;
					}
				} else {
					if($.inArray( depVal, depValues ) == -1){
						show = false;
					}
				}

			}

			if( show ) {
				$(this).fadeIn(500);
			} else {
				$(this).hide();
			}

		});

	}
	$( "[data-dependency]" ).eutInitFieldsDependency();

});