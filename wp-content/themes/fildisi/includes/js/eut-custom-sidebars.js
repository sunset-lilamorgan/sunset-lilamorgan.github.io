jQuery(document).ready(function($) {

	"use strict";

	if( 0 === $('.eut-custom-sidebar-normal').length ) {
		$('.eut-custom-sidebar-empty').show();
	}

	$(document).on("click",".eut-custom-sidebar-item-delete-button",function() {
		$(this).parents('.eut-custom-sidebar-item').remove();
		$('.eut-sidebar-changed').show();
		if( 0 === $('.eut-custom-sidebar-normal').length ) {
			$('.eut-custom-sidebar-empty').show();
		}
	});

	$(document).on("click","#eut-add-custom-sidebar-item",function() {

		$('#eut-sidebar-wrap .button').attr('disabled','disabled').addClass('disabled');
		$('.eut-sidebar-notice').hide();
		$('.eut-sidebar-notice-exists').hide();
		$('.eut-sidebar-spinner').show();

		var sidebarName = $('#eut-custom-sidebar-item-name-new').val();

		if ( '' == $.trim(sidebarName) ) {
			$('.eut-sidebar-notice').show();
			$('.eut-sidebar-spinner').hide();
			$('#eut-sidebar-wrap .button').removeAttr('disabled').removeClass('disabled');
		} else {

			var alreadyExists = false;
			$('#eut-sidebar-wrap .eut-custom-sidebar-item-name').each(function () {
				if( $(this).val() == sidebarName ) {
					alreadyExists = true;
					return false;
				}
			});
			if ( alreadyExists ) {
				$('.eut-sidebar-notice-exists').show();
				$('.eut-sidebar-spinner').hide();
				$('#eut-sidebar-wrap .button').removeAttr('disabled').removeClass('disabled');
			} else {
				var dataParams = {
					action:'fildisi_eutf_get_custom_sidebar',
					sidebar_name: sidebarName,
					_eutf_nonce: fildisi_eutf_custom_sidebar_texts.nonce_custom_sidebar
				};				
				$.post( fildisi_eutf_custom_sidebar_texts.ajaxurl, dataParams, function( sidebarHtml ) {
					$('#eut-custom-sidebar-container').append(sidebarHtml);
					$('#eut-custom-sidebar-item-name-new').val('');
					$('.eut-sidebar-spinner').hide();
					$('.eut-sidebar-changed').show();
					$('#eut-sidebar-wrap .button').removeAttr('disabled').removeClass('disabled');
					if( 0 !== $('.eut-custom-sidebar-normal').length ) {
						$('.eut-custom-sidebar-empty').hide();
					}
				}).fail(function(xhr, status, error) {
					$('.eut-sidebar-spinner').hide();
					$('#eut-sidebar-wrap .button').removeAttr('disabled').removeClass('disabled');
				});
			}
		}
	});

	$( "#eut-custom-sidebar-container" ).sortable();
	$('.eut-sidebar-saved').delay(4000).slideUp();

});