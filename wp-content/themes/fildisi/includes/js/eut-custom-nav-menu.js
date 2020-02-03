jQuery(document).ready(function($) {

	"use strict";

	var menuNavForm = $('#update-nav-menu');
	var menuMegaLabel = '<span class="eut-item-type-megamenu">(Mega Menu)</span>';

	menuNavForm.on('change', '[data-eut-menu-item]', function() {

		var dataArrayString = '';
		var menuNavForm = $('#update-nav-menu');
		var menuItemsData = menuNavForm.find("[data-eut-menu-name]");
		menuItemsData.each(function() {
			var attributeName = $(this).data('eut-menu-name');
			var attributeVal  = $(this).val();

			if(attributeVal !== '') {
				dataArrayString += attributeName+"="+attributeVal+'&';
			}
		});

		dataArrayString = dataArrayString.substr(0, dataArrayString.length - 1);

		if( $('input[name=eut_menu_options]').length ) {
			$('input[name=eut_menu_options]').val( encodeURIComponent( dataArrayString ) );
		} else {
			var hiddenMenuItem = '<input type="hidden" name="_fildisi_eutf_menu_options" value="'+encodeURIComponent(dataArrayString)+'">';
			menuNavForm.append(hiddenMenuItem);
		}

	});

	$(document).on( 'change', '.eut-menu-item-megamenu', function() {
		var megamenuField = $(this),
			container = megamenuField.parents('.menu-item');

		if ( '' != megamenuField.val() ) {
			container.addClass('eut-megamenu-active');
		} else {
			container.removeClass('eut-megamenu-active');
		}
	});

	$(document).on( 'change', '.eut-menu-item-style', function() {
		var menuItemField = $(this),
			container = menuItemField.parents('.menu-item');
		if ( '' != menuItemField.val() ) {
			container.find('.eut-menu-item-color-container').show();
			container.find('.eut-menu-item-hover-color-container').show();
		} else {
			container.find('.eut-menu-item-color-container').hide();
			container.find('.eut-menu-item-hover-color-container').hide();
		}
	});

	function eutCalculateMenu() {

		var menuItems = $('.eut-menu-item-megamenu');
		menuItems.each(function(i) {
			var megamenuField = $(this),
				container = megamenuField.parents('.menu-item');
			if ( '' != megamenuField.val() ) {
				container.addClass('eut-megamenu-active');
			} else {
				container.removeClass('eut-megamenu-active');
			}
		});

		var menuStyleItems = $('.eut-menu-item-style');
		menuStyleItems.each(function(i) {
			var menuItemField = $(this),
				container = menuItemField.parents('.menu-item');
				container.find('.item-type').first().after( menuMegaLabel );
			if ( '' != menuItemField.val() ) {
				container.find('.eut-menu-item-color-container').show();
				container.find('.eut-menu-item-hover-color-container').show();
			} else {
				container.find('.eut-menu-item-color-container').hide();
				container.find('.eut-menu-item-hover-color-container').hide();
			}
		});

	}

	eutCalculateMenu();



});