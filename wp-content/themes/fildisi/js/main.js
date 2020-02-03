
// ================================================================================== //

	// # Document on Ready
	// # Document on Resize
	// # Document on Scroll
	// # Document on Load

	// # Sticky Header
	// # Leader Post Size
	// # Header
	// # Post Sticky Items
	// # Sticky Sidebar Widget
	// # Sticky Sidebar
	// # Feature Section
	// # Feature Parallax
	// # Page Title
	// # Page Settings
	// # Basic Elements
	// # Isotope
	// # Parallax Section
	// # Section Settings
	// # Social Bar For Post
	// # Scroll Direction
	// # Global Variables
	// # Scrollbar Width
	// # Full Page

	// # Sticky Section

// ================================================================================== //


var EUTHEM = EUTHEM || {};
var debugJs = false;
var spinner = '<div class="eut-spinner"></div>';
var addFeatureSpinner =  false;
var hiddenMenuItemsAnimation = true;
var hiddenaAreaMinWidth = 550;
var gridEqual = true;
var wooThumbCarouselItems = 4;
var featureSliderHandler = true;

// Animate Mask Options
var maskLayers = 3;
var maskColorClasses =  ['eut-bg-primary-1','eut-bg-light','eut-bg-dark'];

var deviceAnimAppear =  false;
if( 1 == fildisi_eutf_main_data.device_animations ) {
	deviceAnimAppear =  true;
}

(function($){

	"use strict";


	// # Document on Ready
	// ============================================================================= //
	EUTHEM.documentReady = {
		init: function(){
			EUTHEM.pageSettings.bodyLoader();
			EUTHEM.svgAnimation.init();
			EUTHEM.advancedHiddenMenu.init();
			EUTHEM.pageSettings.removeVideoBg();
			EUTHEM.pageSettings.addVideoBg();
			EUTHEM.sectionSettings.init();
			EUTHEM.slideToggleMenu.init( '#eut-hidden-menu', '#eut-hidden-menu .eut-menu' );
			EUTHEM.slideToggleMenu.init( '#eut-main-header.eut-header-side', '#eut-main-menu.eut-vertical-menu .eut-menu' );
			EUTHEM.slideToggleMenu.init( '#eut-sidearea', '.widget_nav_menu' );
			if( $('#eut-feature-section').length > 0 ){
				EUTHEM.featureSection.init( '#eut-feature-section' );
				EUTHEM.featureSize.init( '#eut-feature-section' );
				EUTHEM.featureParallax.init();
			}
			if( $('.eut-page-title').length > 0 ){
				EUTHEM.featureSection.init( '.eut-page-title' );
				EUTHEM.featureSize.init( '.eut-page-title' );
			}
			EUTHEM.pageSettings.init();
			EUTHEM.leaderPostSize.init();
			EUTHEM.isotope.init();
			EUTHEM.isotope.noIsoFilters();
			EUTHEM.basicElements.init();
			EUTHEM.fullPage.init();
			EUTHEM.pillingPage.init();
			EUTHEM.parallaxSection.init('.eut-section.eut-bg-parallax');
			EUTHEM.sectionNav.init();
		}
	};

	EUTHEM.reCall = {
		init: function(){
			EUTHEM.sectionSettings.init();
			EUTHEM.isotope.init();
		}
	}


	// # Document on Resize
	// ============================================================================= //
		EUTHEM.documentResize = {
		init: function(){
			if( $('#eut-feature-section').length > 0 ){
				EUTHEM.featureSize.init( '#eut-feature-section' );
			}
			if( $('.eut-page-title').length > 0 ){
				EUTHEM.featureSize.init( '.eut-page-title' );
			}
			EUTHEM.sectionSettings.init();
			EUTHEM.basicElements.imageText();
			EUTHEM.pageSettings.resizeVideoBg();
		}
	};

	// # Document on Scroll
	// ============================================================================= //
	EUTHEM.documentScroll = {
		init: function(){
			EUTHEM.socialBar.init();
			EUTHEM.pageSettings.onePageMenu();
		}
	};

	// # Document on Load
	// ============================================================================= //
	EUTHEM.documentLoad = {
		init: function(){
			EUTHEM.stickyHeaderTypes.init();
			EUTHEM.anchorSticky.init();
			EUTHEM.socialBar.init();
			EUTHEM.stickySidebarWidget.init();
			EUTHEM.stickySidebar.init();
			EUTHEM.basicElements.iconBox();
			EUTHEM.pageSettings.fullHeightSeparator();
			EUTHEM.pageSettings.columnEffect();
			EUTHEM.wooThumbCarousel.init();

			// Location Hash
			if (window.location.hash) {
				setTimeout(function() {
					var target = window.location.hash;
					if( $(target).length ){
						if ( $(target).hasClass('eut-tab-content') || $(target).hasClass('eut-accordion-content')  ) {
							var tabLink =  $('.eut-tab-link[data-rel="' + target + '"]:visible');
							if ( tabLink.length ) {
								tabLink.click();
								setTimeout(function() {
									EUTHEM.pageSettings.linkGoToTop( tabLink );
								}, 500);
							}
						} else {
							$('html, body').scrollTop( $(target).offset().top );
						}
					}
				}, 0);
			}
		}
	};
	// # Fixed Custom Position Column
	// ============================================================================= //
	EUTHEM.customPositionColumn = {
		init: function(){
			$('.eut-column.eut-custom-position').each(function(){
				var $column = $(this),
					columnW, columnX, windowW;

				setup();

				if( !isMobile.any() ) {
					$(window).on('resize', resizer);
				} else {
					$(window).on('orientationchange', resizer);
				}
				function setup(){
					resetPosition();
					updateParams();
					if( columnW + columnX >= windowW ){
						resetPosition();
						fixedPositionRight();
					}

					if( columnX < 0 ){
						resetPosition();
						fixedPositionLeft();
					}
				}
				function updateParams(){
					columnW = $column.outerWidth();
					columnX = $column.offset().left;
					windowW = $(window).width();
				}
				function resizer(){
					var delay;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						setup();
					}, 200);
				}
				function fixedPositionRight(){
					var newPosX = ( windowW - columnW ) - $column.offset().left;
					$column.css({'left' : newPosX, 'right' : '' });
				}
				function fixedPositionLeft(){
					var newPosX = - $column.offset().left;
					$column.css({'left' : newPosX, 'right' : '' });
				}
				function resetPosition(){
					$column.css({'left' : '', 'right' : ''});
				}
			});
		}
	};

	// SVG Animation
	EUTHEM.svgAnimation = {
		init : function(){
			if(bodyLoader){
				return false;
			}
			var $svg = $('.eut-svg-icon');
			$svg.each(function(){
				var $icon = $(this),
					duration = $icon.data('duration'),
					id = $icon.attr('id'),
					file = $icon.data('file'),
					myVivus,
					parentDelay = 0;

					if( $icon.parents('.eut-element').hasClass('eut-animated-item') ){
						parentDelay = $icon.parents('.eut-element').data('delay');
					}

					$icon.appear(function() {
						setTimeout(function () {
							myVivus = new Vivus( id, {
								duration : duration,
								file : file,
								type: 'async',
								start : 'inViewport'
							});
						}, parentDelay);
					},{accX: 0, accY: 0});
			});
		}
	}


	// # Sticky Header
	// ============================================================================= //
	EUTHEM.stickyHeaderTypes = {
		init : function(){
			var $header = $('#eut-header'),
				$stickyHeader = $header.find('#eut-main-header'),
				stickyHeader = $stickyHeader.hasClass('eut-header-logo-top') ? '#eut-bottom-header' : '#eut-main-header',
				stickyType = $header.data('sticky'),
				stickyDevice = $header.data('devices-sticky'),
				responsiveThreshold = parseInt(fildisi_eutf_main_data.responsive_thershold) - 1;

			if( stickyType === 'simple' ) {
				EUTHEM.stickyHeader.init({
					header: '#eut-header',
					stickyHeader : '#eut-main-header',
					headerOfsset : false,
					scrollDirection : false,
					responsive : [responsiveThreshold,6000]
				});
			}

			if( stickyType === 'shrink') {
				EUTHEM.stickyHeader.init({
					header: '#eut-header',
					stickyHeader : '#eut-main-header',
					headerOfsset : false,
					scrollDirection : false,
					responsive : [responsiveThreshold,6000]
				});
			}

			if( stickyType === 'advanced') {
				EUTHEM.stickyHeader.init({
					header: '#eut-header',
					stickyHeader : '#eut-main-header',
					headerOfsset : true,
					stickyTopHeader : true,
					scrollDirection : true,
					responsive : [responsiveThreshold,6000]
				});
			}

			if( stickyType === 'fildisi') {
				EUTHEM.stickyHeader.init({
					header : '#eut-header',
					stickyHeader : '#eut-fildisi-sticky-header',
					headerOfsset : true,
					stickyTopHeader : false,
					scrollDirection : true,
					responsive : [responsiveThreshold,6000]
				});
			}

			if( stickyDevice === 'yes' ) {
				EUTHEM.stickyHeader.init({
					header : '#eut-responsive-header',
					stickyHeader : '#eut-main-responsive-header',
					headerOfsset : false,
					stickyTopHeader : false,
					scrollDirection : false,
					responsive: [0,responsiveThreshold + 1]
				});
			}
		}
	};

	// # Simple Sticky Header
	// ============================================================================= //
	var goToTop = false;
	EUTHEM.stickyHeader = {
		config : {
			header: '#eut-header',
			stickyHeader : '#eut-main-header',
			stickyTopBar : '#eut-top-bar.eut-sticky-topbar .eut-wrapper',
			headerOfsset : false,
			stickyTopHeader : false,
			scrollDirection : false,
			responsive : [1023,6000]
		},
		init : function(settings){

			$.extend(this.config, settings);

			var $header = $(this.config.header),
				$headerSticky = $(this.config.stickyHeader),
				$topBarSticky = $(this.config.stickyTopBar),
				headerOfsset = this.config.headerOfsset,
				stickyTopHeader = this.config.stickyTopHeader,
				scrollDir = this.config.scrollDirection,
				minWidth = this.config.responsive[0],
				maxWidth = this.config.responsive[1],
				lastScroll = 0,
				tolerance = { up : 0, down : 0 },
				frameSize = 0,
				delay, headerH, topbarH, windowW, headerT, offset, topPosition, wpBarHeight;

			if( !$header ) return;
			setup();

			if( !isMobile.any() ) {
				$(window).on('resize', resizer);
			} else {
				tolerance = { up : 6, down : 5 };
				$(window).on('orientationchange', resizer);
			}

			function setup(){
				resetParams();
				updateParams();
				if (windowW + scrollBarWidth > minWidth &&  windowW + scrollBarWidth < maxWidth) {
					update();
					$(window).on('scroll.stickyHeader', update);
				} else {
					$(window).off('scroll.stickyHeader', update);
				}
			}
			function resetParams(){
				if( 'eut-responsive-header' != $header.attr('id') ) {
					removeFixedHeader();
				}
			}
			function updateParams(){
				wpBarHeight = $('body').hasClass('admin-bar') && $(window).width() > 783 ? 32 : 0;
				wpBarHeight = $('body').hasClass('admin-bar') && $(window).width() > 600  && $(window).width() < 783 ? 46 : wpBarHeight;
				headerH = $header.outerHeight();
				windowW = $(window).width();
				frameSize = $('body').hasClass('eut-framed') && windowW + scrollBarWidth > tabletPortrait ? $('#eut-frames').data('frame-size') : 0;
				headerT = getOffset( $header );
				topbarH = $('#eut-top-bar').length && ( $('#eut-top-bar').hasClass('eut-sticky-topbar') || $('#eut-top-bar').hasClass('eut-device-sticky-topbar') ) ? $('#eut-top-bar').outerHeight() : 0;
				offset  = !headerOfsset ? headerT - topbarH : headerT + headerH;
				offset  = Math.round(offset);
				topPosition = !stickyTopHeader ? topbarH : -(headerH - topbarH);
			}
			function resizer(){
				window.clearTimeout(delay);
				delay = window.setTimeout(function() {
					setup();
				}, 200);
			}
			function getOffset(el){
				return el.offset().top - frameSize - wpBarHeight;
			}
			function removeFixedTopBar(){
				$('#eut-top-bar').removeClass('eut-fixed');
				$header.css({ 'top' : '' });
				$topBarSticky.css({ 'top' : '' });
			}
			function addFixedTopBar(){
				$('#eut-top-bar').css({'height' : topbarH }).addClass('eut-fixed');
				$topBarSticky.css({ 'top' : frameSize + wpBarHeight });
			}
			function removeFixedHeader(){
				$header.removeClass('eut-fixed').css({ 'top' : '' });
				$headerSticky.css({ 'top' : '' });
				$('#eut-top-bar').removeClass('eut-fixed').css({ 'height' : '' });
			}
			function addFixedHeader(){
				$header.addClass('eut-fixed').css({ 'top' : topbarH });
				$headerSticky.css({ 'top' : topPosition + frameSize + wpBarHeight });
			}
			function addSticky(){
				$header.addClass('eut-sticky-header eut-sticky-animate');
			}
			function removeSticky(){
				$header.removeClass('eut-sticky-header eut-scroll-up');
			}
			function addScrollUp(){
				$header.addClass('eut-scroll-up').removeClass('eut-scroll-down');
			}
			function addScrollDown(){
				$header.addClass('eut-scroll-down').removeClass('eut-scroll-up');
			}
			function toleranceExceeded(scroll, direction) {
			  return Math.abs(scroll - lastScroll) >= tolerance[direction];
			}
			function shouldUnpin(scroll, toleranceExceed, sticky){
				var scrollingDown = scroll > lastScroll;
				return scrollingDown && toleranceExceed && sticky;
			}
			function shouldPin(scroll, toleranceExceed, sticky){
				  var scrollingUp  = scroll < lastScroll;
				return scrollingUp && toleranceExceed && sticky;
			}

			function update(){
				var scroll = $(window).scrollTop(),
					scrollDirection = scroll > lastScroll ? 'down' : 'up',
					toleranceExceed = toleranceExceeded(scroll, scrollDirection),
					sticky = false;

				if (scroll >= offset) {
					addFixedHeader();
				} else {
					removeFixedHeader();
				}

				if (scroll >= 0 ) {
					addFixedTopBar();
				} else {
					removeFixedTopBar();
				}

				if (scroll > offset) {
					addSticky();
					sticky = true;
				} else {
					removeSticky();
					sticky = false;
				}

				if(shouldUnpin(scroll, toleranceExceed, sticky) && scrollDir) {
					addScrollDown();
				}
				else if(shouldPin(scroll, toleranceExceed, sticky) && scrollDir) {
					addScrollUp();
				}

				lastScroll = scroll;
			}

		}
	};

	// # Advanced Hidden Menu
	// ============================================================================= //
	EUTHEM.advancedHiddenMenu = {
		init : function(){
			var $header = $('#eut-header'),
				$mainHeader = $('#eut-main-header'),
				$menu = $('#eut-main-menu'),
				$menuEl = $menu.find('.eut-first-level'),
				$headerEl = $mainHeader.find('.eut-header-elements-wrapper'),
				$btn = $mainHeader.find('.eut-hidden-menu-btn a'),
				openHeader = false,
				hoverDelay;

			if( !$menu.length || !$header.hasClass('eut-advanced-hidden-menu') ) return;

			$mainHeader.on('mouseenter.advancedHidden', function(){
				var $that = $(this);
				if( !openHeader ){
					openHeader = true;
					toggleHeader();
				}

			});

			$mainHeader.on('mouseleave.advancedHidden', function(){
				var $that = $(this);
				if( openHeader ){
					openHeader = false;
					toggleHeader();
				}
			});

			$btn.on('click.advancedHidden', function(e){
				e.preventDefault();
				if( !openHeader ){
					openHeader = true;
					toggleHeader();
				} else {
					openHeader = false;
					toggleHeader();
				}
			});

			if( isMobile.any() ) {
				$mainHeader.off('mouseenter.advancedHidden');
				$mainHeader.off('mouseleave.advancedHidden');
			}

			var itemLength = $menuEl.length -1,
				startTimer = false,
				count = -1,
				counter;

			function toggleHeader(){
				if( openHeader ){
					clearInterval(hoverDelay);
					$header.addClass('eut-header-hover');
					$menuEl.removeClass('hide');

					// Show Menu
					startTimer = true;
					counter = setInterval(timer, 100);

				} else {
					hoverDelay = setTimeout(function(){
						$header.removeClass('eut-header-hover');
						$menuEl.removeClass('show');
						$headerEl.removeClass('show');
					},400);

					// Hide Menu
					startTimer = false;
					count = -1;
					clearInterval(counter);
					$header.removeClass('eut-open-menu');
					$menuEl.addClass('hide');
				}
			}

			function timer() {
				count += 1;
				if (count >= itemLength) {
					clearInterval(counter);
					$header.addClass('eut-open-menu');
					$headerEl.addClass('show');
				}
				$menuEl.eq(count).addClass('show');
			}
		}
	};

	// # Leader Post Size
	// ============================================================================= //
	EUTHEM.leaderPostSize = {
		init : function(){
			var $leaderElement = $('.eut-blog-leader.eut-layout-1.eut-fildisi-style');

			if( !$leaderElement.length ) return;

			var windowWidth,
				maxHeight,
				leaderHeight;

			$leaderElement.each(function(){
				var $this = $(this),
					$leaderPost = $this.find('.eut-post-leader'),
					resizing  = false;


				resetHeight();
				$(window).smartresize(resetHeight);

				function resetHeight(){
					if(!resizing){
						resizing  = true;

						$leaderPost.css({
							'height' : ''
						});

						updateParams();
					}
				}

				function updateParams() {
					windowWidth = $(window).width();

					$this.imagesLoaded('always',function(){
						maxHeight = $this.outerHeight();
						leaderHeight = $leaderPost.outerHeight();

						setLeaderHeight();
					});
				}

				function setLeaderHeight(){
					if( maxHeight > leaderHeight && windowWidth + scrollBarWidth > tabletPortrait ){
						$leaderPost.css({
							'height' : maxHeight,
							'visibility' : 'visible'
						});
					} else {
						$leaderPost.css({
							'visibility' : 'visible'
						});
					}

					resizing = false;
				}
			});
		}
	};

	// # Anchor Sticky
	// ============================================================================= //
	EUTHEM.anchorSticky = {
		init : function(){
			var base = EUTHEM.anchorSticky;
			base.$anchor = $('.eut-anchor-menu');
			if( base.$anchor.length ){
				base.$anchorWrapper = base.$anchor.find('.eut-anchor-wrapper');
				base.$header = $('#eut-header');
				base.$mLogo = $('#eut-fildisi-sticky-header .eut-logo');
				base.$mElements = $('#eut-fildisi-sticky-header .eut-header-elements-wrapper');
				base.$mainHeader = $('#eut-main-header');
				base.$topBar = $('#eut-top-bar');
				base.styckyType = base.$header.data('sticky')
				base.$stickyHeader = base.setStickyHeader();
				base.openMenu = false;

				base.setVars();
				base.update();
				base.responsive();

				$(window).on('scroll', base.update);
				if( !isMobile.any() ) {
					$(window).on("resize",base.update);
				} else {
					$(window).on("orientationchange",base.update);
				}
			}
		},
		setStickyHeader : function(){
			var base = EUTHEM.anchorSticky,
				stickyHeader;
			if( base.styckyType !== 'none' ){
				if( base.$mainHeader.hasClass('eut-header-default') ) {
					if( base.styckyType === 'fildisi' ){
						stickyHeader = $('#eut-fildisi-sticky-header');
					} else {
						stickyHeader = $('#eut-main-header');
					}
				} else if( base.$mainHeader.hasClass('eut-header-logo-top') ) {
					stickyHeader = $('#eut-bottom-header');
				}
			}
			return stickyHeader;
		},
		setVars : function(){
			var base = EUTHEM.anchorSticky;
			base.anchorH = base.$anchor.outerHeight();
			base.anchorT = base.$anchor.offset().top;
			base.topBarH = base.$topBar.length && base.styckyType != 'none' ? base.$topBar.outerHeight() : 0;
			base.headerH = base.$stickyHeader != undefined ? base.$stickyHeader.outerHeight() : 0;
			base.frameSize = $('#eut-frames').length ? $('#eut-frames').data('frame-size') : 0;
			base.mLogoW = base.$mLogo.length ? base.$mLogo.outerWidth() : 0;
			base.mElementsW = base.$mElements.length ? base.$mElements.outerWidth() : 0;
			base.newHeaderH = base.headerH;
		},
		setNewHeight : function(){
			var base = EUTHEM.anchorSticky;
			base.headerH = base.$stickyHeader.outerHeight();
			if( base.styckyType === 'advanced' || base.styckyType === 'fildisi' ){
				base.newHeaderH = 0;
			} else {
				base.newHeaderH = base.$stickyHeader.outerHeight();
			}
		},
		update : function(){
			var base = EUTHEM.anchorSticky;

			if( $(window).width() + scrollBarWidth < tabletPortrait ) {
				base.$anchor.addClass('eut-anchor-responsive');
				return false;
			} else {
				base.$anchor.removeClass('eut-anchor-responsive');
			}

			if( base.headerH != 0 && base.styckyType != 'none' && base.styckyType != 'simple' ){
				base.setNewHeight();
			}

			var scroll = $(window).scrollTop(),
				topOffset = base.anchorT - base.topBarH - base.newHeaderH - base.frameSize - wpBarHeight,
				topPos = base.topBarH + base.newHeaderH + base.frameSize + wpBarHeight,
				positionY = base.headerH,
				sticky = false;

			if( scroll >= topOffset ){
				sticky = true;
				base.$anchorWrapper
					.addClass('eut-sticky')
					.css({'top' : topPos});
			} else {
				sticky = false;
				base.$anchorWrapper
					.removeClass('eut-sticky')
					.css({'top' : ''});
			}
			if( base.styckyType === 'fildisi' ){
				base.fildisiAnchor(sticky);
			}
			if(sticky && base.$header.hasClass('eut-scroll-up') ){
				base.$anchorWrapper
					.addClass('eut-go-down')
					.removeClass('eut-go-up')
					.css(base.doTranslate(positionY));
			} else if(sticky && base.$header.hasClass('eut-scroll-down') ){
				base.$anchorWrapper
					.addClass('eut-go-up')
					.removeClass('eut-go-down')
					.css(base.doTranslate(0));
			} else {
				base.$anchorWrapper
					.removeClass('eut-go-up')
					.removeClass('eut-go-down')
					.css(base.doTranslate(0));
			}
		},
		doTranslate : function(value){
			return {
				'-webkit-transform' : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'-moz-transform'    : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'-ms-transform'     : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'-o-transform'      : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
				'transform'         : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)'
			}
		},
		fildisiAnchor : function(sticky){
			var base = EUTHEM.anchorSticky;
			var leftPos = $('body').hasClass('eut-boxed') ? 'auto' : base.mLogoW + 2;
			var rightPos = $('body').hasClass('eut-boxed') ? 'auto' : base.mElementsW + 2;
			var size = $('body').hasClass('eut-boxed') ? '' : 'auto';

			if( sticky ) {
				base.$anchorWrapper.css({
					'line-height' : base.headerH - 2 +'px',
					'left' : leftPos,
					'right' : rightPos,
					'width' : size,
					'z-index' : 9999
				}).addClass('eut-fildisi-anchor');
			}
			if( sticky && base.$header.hasClass('eut-scroll-up') ) {
				base.$anchorWrapper.css({
					'line-height' : '',
					'left' : '',
					'right' : '',
					'width' : '',
					'z-index' : ''
				});
			}
		},
		responsive : function(){
			var base = EUTHEM.anchorSticky,
				$btn = base.$anchor.find('.eut-anchor-btn'),
				$menu = base.$anchor.find('.menu'),
				$menuLink = $menu.find('a');

			$btn.on('click',function(e){
				e.preventDefault();
				if(base.openMenu){
					base.toggleMenu(true);
				} else {
					base.toggleMenu(false);
				}
			});
			$menuLink.on('click',function(){
				if( base.openMenu ){
					base.toggleMenu(true);
				}
			});
		},
		toggleMenu : function(bool){
			var base = EUTHEM.anchorSticky,
				$menu = base.$anchor.find('.menu');
			if(bool){
				base.$anchor.css({'height' : ''});
				$menu.slideUp(function(){
					base.openMenu = false;
				});
			} else {
				base.$anchor.css({'height' : 'auto'});
				$menu.slideDown(function(){
					base.openMenu = true;
				});
			}
		}
	};

	// # Menu Slide or Toggle
	// ============================================================================= //
	EUTHEM.slideToggleMenu = {

		init: function( parrent, element ){

			if( !$(element).length ) return;

			var $menu       = $(element),
				$menuParent = $(parrent),
				$menuItem   = $menu.find('li.menu-item-has-children > a'),
				menuType    = $menuParent.hasClass('eut-slide-menu') ? 'slide' : 'toggle',
				$arrow      = $('<i class="eut-arrow"></i>'),
				$goBack     = $('<li class="eut-goback"><a href="#"><i class="eut-arrow"></i></a></li>');

			if( menuType === 'slide' ) {
				// Add Arrows
				$arrow.appendTo( $menuItem.parent() );
				// Add Go Back Button for Slide Menu
				$goBack.prependTo( $menuItem.parent().find('>ul') );
			} else {
				// Add Arrows
				$arrow.appendTo( $menuItem );
			}

			$menuItem.on('tap click',function(e){
				var $this = $(this),
					link  = $this.attr('href'),
					open  = false;

				if((link != '#' || link === '#') && menuType == 'toggle' ) {
					if( !$this.parent().hasClass('open') && !open ) {
						e.preventDefault();
						$this.parent().addClass('open');
						toggle( $this, open );
					} else {
						open = true;
						toggle( $this, open );
						$this.parent().removeClass('open');
					}
				} else if( link === '#' && menuType == 'slide' ) {
					e.preventDefault();
					var listLevel  = $this.parents('ul').length,
						$firstItem = $this.parent().find('ul').first(),
						menuOffset = $menu.offset().top,
						offset     = $this.offset().top,
						title      = $this.html();

						appendTitle( title, $firstItem );

					$firstItem.addClass('show').css({ 'top' : - ( offset - menuOffset ) });
					var firstItemH = $firstItem.outerHeight();

					if( $('body').hasClass('rtl') ) {
						animRightMenu( firstItemH, listLevel );
					} else {
						animLeftMenu( firstItemH, listLevel );
					}
				}
			});

			if( menuType === 'slide' ) {
				var $arrowBtn = $menuItem.parent().find('.eut-arrow');
				$arrowBtn.on('click',function(){
					var $this = $(this),
						listLevel  = $this.parents('ul').length,
						$firstItem = $this.parent().find('ul').first(),
						menuOffset = $menu.offset().top,
						offset     = $this.offset().top,
						title      = $this.parent().find('a').first().html();

					appendTitle( title, $firstItem );

					$firstItem.addClass('show').css({ 'top' : - ( offset - menuOffset ) });
					var firstItemH = $firstItem.outerHeight();

					if( $('body').hasClass('rtl') ) {
						animRightMenu( firstItemH, listLevel );
					} else {
						animLeftMenu( firstItemH, listLevel );
					}

				});
			}

			$('li.eut-goback a').on('click', function(e) {
				e.preventDefault();
				var listLevel  = $(this).parents('ul ul').length - 1,
					$firstItem = $(this).closest('.sub-menu'),
					firstItemH = $firstItem.closest('.menu-item-has-children').closest('ul').height();

				setTimeout(function(){
					$firstItem.removeClass('show');
				},300);
				if( $('body').hasClass('rtl') ) {
					animRightMenu( firstItemH, listLevel );
				} else {
					animLeftMenu( firstItemH, listLevel );
				}
			});

			function toggle( $this, open ){
				var $subMenu = $this.parent().find('>ul');
				if( open ) {
					$subMenu.slideUp(200);
				} else {
					$subMenu.slideDown(200);
				}
			}

			function animLeftMenu( height, listLevel ) {
				$menu.parent().height(height);
				$menu.css('transform', 'translate3d(' + - listLevel * 100 + '%,0,0)');
			}

			function animRightMenu( height, listLevel ) {
				$menu.parent().height(height);
				$menu.css('transform', 'translate3d(' + listLevel * 100 + '%,0,0)');
			}

			function appendTitle( title, list ){
				if( list.find('.eut-goback .eut-item').length ) return;
				$(title).appendTo( list.find('> .eut-goback a') );
			}
		}

	};

	// # Sticky Sidebar Widget
	// ============================================================================= //
	EUTHEM.stickySidebarWidget = {
		init: function(){

			var $stickyWidget = $('#eut-content .eut-sticky-widget'),
				sidebarWidget = false;

			$stickyWidget.each(function(){
				var $this = $(this);

				if( $this.length > 0 ) {

					if( $('.eut-sticky-widget').parent().parent().is('#eut-sidebar') ) {
						sidebarWidget = true;
					}

					if( sidebarWidget && $('#eut-sidebar').hasClass('eut-fixed-sidebar') ) return;

					var $content         = sidebarWidget ? $('#eut-main-content .eut-main-content-wrapper') : $this.parents('.eut-row'),
						$sidebar         = $this.parent(),
						headerHeight     = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0,
						anchorHeight     = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
						topOffset        = headerHeight + anchorHeight + 40;

					var windowWidth,sidebarWidth,sidebarHeight,contentTop,contentPadding,sidebarTop;

					var scrolling        = false,
						sidebarAnimation = false,
						resizing         = false;

					updateParams();

					if( windowWidth + scrollBarWidth > tabletPortrait ) {
						$(window).on('scroll', checkSidebar);
					}
					$(window).smartresize(resetScroll);

				}

				function checkSidebar() {
					if( !sidebarAnimation ) {
						sidebarAnimation = true;
						updateSidebarPosition();
					}
				}

				function resetScroll() {
					if( !resizing ) {
						resizing = true;
						$sidebar.removeClass('fixed').attr('style', '');
						updateParams();
					}
				}

				function updateParams() {
					windowWidth    = $(window).width();
					sidebarWidth   = $sidebar.width();
					sidebarHeight  = $sidebar.height();
					contentTop     = $content.offset().top;
					contentPadding = parseInt( $content.css('padding-top') );
					sidebarTop     = $this.offset().top;

					$(window).off('scroll', checkSidebar);

					if( windowWidth + scrollBarWidth > tabletPortrait ) {
						$(window).on('scroll', checkSidebar);
					}
					resizing = false;
				}

				function updateSidebarPosition() {
					var contentHeight = $content.height(),
						scrollTop     = $(window).scrollTop(),
						topPosition   = sidebarTop - contentTop - topOffset - contentPadding;

					if( scrollTop < sidebarTop - topOffset ) {
						$sidebar.removeClass('fixed').attr('style', '');
					} else if( scrollTop >= sidebarTop - topOffset && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset ) {
						$sidebar.addClass('fixed').css({ 'top' : - topPosition, 'position' : 'fixed', 'width' : sidebarWidth });
					} else {
						if( $sidebar.hasClass('fixed') ) {
							$sidebar.removeClass('fixed').css({ 'top' : contentHeight - sidebarHeight + 'px', 'position' : 'relative' });
						}
					}
					sidebarAnimation =  false;
				}
			});
		}
	}

	// # Sticky Sidebar
	// ============================================================================= //
	EUTHEM.stickySidebar = {
		init: function(){

			var $sidebar = $('#eut-sidebar');
			if( $sidebar.length > 0 && $sidebar.hasClass('eut-fixed-sidebar') ) {

				var $content         = $('#eut-main-content .eut-main-content-wrapper'),
					$sidebarWrapper  = $sidebar.find('.eut-wrapper'),
					headerHeight     = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0,
					anchorHeight     = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
					topOffset        = headerHeight + anchorHeight + 100,
					bottomOffset     = 0;

				var windowWidth,sidebarWidth,sidebarHeight,contentPadding,sidebarTop;

				var scrolling        = false,
					sidebarAnimation = false,
					resizing         = false;

				updateParams();

				if( windowWidth + scrollBarWidth > tabletPortrait ) {
					$(window).on('scroll', checkSidebar);
				}

				$(window).smartresize(resetScroll);
			}

			function checkSidebar() {
				if( !sidebarAnimation ) {
					sidebarAnimation = true;
					updateSidebarPosition();
				}
			}

			function resetScroll() {
				if( !resizing ) {
					resizing = true;
					$sidebarWrapper.removeClass('fixed').attr('style', '');
					updateParams();
				}
			}

			function updateParams() {
				windowWidth    = $(window).width();
				sidebarWidth   = $sidebar.width();
				sidebarHeight  = $sidebar.height();
				contentPadding = parseInt( $content.css('padding-top') );
				sidebarTop     = $sidebar.offset().top;

				if( $('.eut-navigation-bar').length ) {
					bottomOffset = $('.eut-navigation-bar').outerHeight() + 60;
				}

				$(window).off('scroll', checkSidebar);

				if( windowWidth + scrollBarWidth > tabletPortrait ) {
					checkSidebar();
					$(window).on('scroll', checkSidebar);
				}

				$sidebar.css({
					'visibility' : 'visible'
				});

				resizing = false;
			}

			function updateSidebarPosition() {
				var contentHeight = $content.height(),
					scrollTop     = $(window).scrollTop();

				if( scrollTop < sidebarTop - topOffset + contentPadding ) {
					$sidebarWrapper.removeClass('fixed').attr('style', '');
				} else if( scrollTop >= sidebarTop - topOffset + contentPadding && scrollTop < sidebarTop + contentHeight - sidebarHeight - topOffset + contentPadding - bottomOffset ) {
					$sidebarWrapper.addClass('fixed').css({ 'top' : topOffset, 'position' : 'fixed', 'width' : sidebarWidth });
				} else {
					if( $sidebarWrapper.hasClass('fixed') ) {
						$sidebarWrapper.removeClass('fixed').css({ 'top' : contentHeight - sidebarHeight - bottomOffset + 'px', 'position' : 'relative' });
					}
				}
				sidebarAnimation =  false;
			}

		}
	}

	// # Set Feature Section Size
	// ============================================================================= //
	EUTHEM.featureSize = {
		init: function( section ){
			this.$section = $(section);
			this.topBar = $('#eut-top-bar');
			this.header = $('#eut-header');
			this.responsiveHeader = $('#eut-responsive-header');
			this.frameSize = $('body').hasClass('eut-framed') ? $('#eut-frames').data('frame-size') : 0;
			this.updateParams();
			var featureHeight;

			if( this.$section.hasClass('eut-fullscreen') ) {
				featureHeight = this.fullscreenSize();
			} else if( this.$section.hasClass('eut-custom-size') ) {
				featureHeight = this.customSize();
			}
		},
		updateParams : function(){
			this.windowH = $(window).height();
			this.topBarH = this.getTopBarHeight();
			this.headerH = this.getHeaderHeight();
		},
		getTopBarHeight : function(){
			var height = 0;
				if( this.topBar.length && !this.topBar.hasClass('eut-sticky-topbar') ) {
					height = this.topBar.outerHeight();
				}
			return height;
		},
		getHeaderHeight : function(){
			var height = 0;

			if( this.header.length && this.header.is(':visible') && !this.header.hasClass('eut-overlapping') && !this.header.hasClass('eut-header-below') ) {
				height = this.header.outerHeight();
			}

			if( this.responsiveHeader.length && this.responsiveHeader.is(':visible') && !this.header.hasClass('eut-responsive-overlapping') && !this.header.hasClass('eut-header-below') ) {
				height = this.responsiveHeader.outerHeight();
			}

			return height;
		},
		fullscreenSize : function(){
			var sectionH = this.windowH - this.headerH - this.topBarH - (this.frameSize * 2);
			this.$section.css( 'height', sectionH).find('.eut-wrapper').css( 'height', sectionH);
			return sectionH;
		},
		customSize : function(){
			var initHeight = this.$section.data('height');
			var newHeight  = ((this.windowH * initHeight) / 100);
			if( newHeight > this.windowH ) {
				newHeight = this.windowH;
			}
			this.$section.css( 'height', newHeight).find('.eut-wrapper').css( 'height', newHeight);
			return newHeight;
		}
	};

	// # Feature Section
	// ============================================================================= //
	EUTHEM.featureSection = {
		init : function(section){
			var $section = $(section),
				$bgImage = $section.find('.eut-bg-image'),
				$bgVideo = $section.find('.eut-bg-video'),
				$spinner = $(spinner),
				animateContent = false;

			if( $bgImage.length ) {
				// Load Background Images
				loadFeatureImage();
				// Add Spinner
				if( addFeatureSpinner ) {
					addSpinner();
				}
			} else if( !$bgImage.length && $bgVideo.length ) {
				// Add Spinner
				if( addFeatureSpinner ) {
					addSpinner();
				} else {
					showFeature();
				}
			} else {
				// Play Animation Content
				featureAnimation( $section );
			}

			// Load Background Images
			function loadFeatureImage(){
				var totalBgImage = $bgImage.length,
					waitImgDone = function() {
						totalBgImage--;
						if (!totalBgImage) {
							// Remove Spinner
							if( addFeatureSpinner ) {
								setTimeout(function () {
									removeSpinner();
								}, 600);
							} else {
								showFeature();
							}
						}
					}
				$bgImage.each(function () {
					function imageUrl(input) {
						return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
					}
					var image = new Image(),
						$that = $(this);
					image.src = imageUrl($that.css('background-image'));
					$(image).on('load',waitImgDone).on( "error", waitImgDone );
				});
			}

			// Add Spinner
			function addSpinner(){
				$spinner.appendTo( $section );
				$section.addClass('eut-with-spinner');
			}

			// Remove Spinner
			function removeSpinner(){
				$spinner.fadeOut(900,function(){
					$spinner.remove();
					// Show Feature Section
					showFeature();
				});
			}

			// Show Feature Section
			function showFeature(){
				var $overlay   = $section.find('.eut-bg-overlay'),
					$content   = $section.find('.eut-content'),
					$bgImage   = $section.find('.eut-bg-image'),
					$bgVideo   = $section.find('.eut-bg-video');

				$bgImage.addClass('show');
				$bgVideo.addClass('show');
				$overlay.addClass('show');

				animateContent = true;
				if( $section.hasClass('eut-with-slider') ) {
					// Init Feature Slider
					featureSlider();
				} else {
					// Play Feature Animation
					featureAnimation( $section );
				}
			}

			// Feature Slider
			function featureSlider(){
				var $slider         = $('#eut-feature-slider'),
					pauseHover      = $slider.attr('data-slider-pause') == 'yes' ? true : '',
					sliderSpeed     = parseInt( $slider.attr('data-slider-speed') ) ? parseInt( $slider.attr('data-slider-speed') ) : 6000,
					transition      = $slider.attr('data-slider-transition'),
					slidersLength   = $slider.find('.eut-slider-item').length,
					pagination      = $slider.attr('data-pagination') != 'no' ? true : false,
					$nextNav        = $slider.parent().find('.eut-carousel-next'),
					$prevNav        = $slider.parent().find('.eut-carousel-prev'),
					loop = true,
					animateOut      = false,
					animateIn       = false,
					stopSlider      = false;

				// Slider Trantition
				if( transition != 'slide' ){
					animateOut = 'carousel-' + transition + '-out';
					animateIn = 'carousel-' + transition + '-in';
				}
				$slider.on('initialized.owl.carousel changed.owl.carousel',function(event){
					var current = event.item.index,
						$currentSlide = $(event.target).find('.eut-slider-item-wrapper').eq(current),
						sliderColor = $currentSlide.find('.eut-slider-item').attr('data-header-color'),
						color = 'eut-' + sliderColor;

					if( !$currentSlide.length) return;

					// Slider Animation
					featureAnimation( $currentSlide );

					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}

					// Set Navigation Color
					$('#eut-feature-section .eut-carousel-navigation').removeClass('eut-light eut-dark eut-default').addClass(color);
					$('#eut-feature-section .owl-controls').removeClass('eut-light eut-dark eut-default').addClass(color);
				});
				if ( $slider.find('.eut-slider-item').length == 1 ) {
					loop = false;
				}

				$slider.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : true,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : pauseHover,
					smartSpeed : 500,
					dots : pagination,
					animateOut : animateOut,
					animateIn : animateIn,
					itemClass : 'eut-slider-item-wrapper'
				});

				$(window).on('scroll',autoplayHandler);

				function autoplayHandler(){
					var scroll = $(window).scrollTop();
					if( scroll > 300 && !stopSlider && featureSliderHandler ){
						stopSlider = true;
						$slider.trigger('stop.owl.autoplay');
					} else if( scroll < 300 && stopSlider && featureSliderHandler ) {
						stopSlider = false;
						$slider.trigger('play.owl.autoplay');
					}
				}

				// Go to the next item
				$nextNav.on('click',function(){
					$slider.trigger('next.owl.carousel');
				})
				// Go to the previous item
				$prevNav.on('click',function(){
					$slider.trigger('prev.owl.carousel');
				})
			}

			// Feature Animation
			function featureAnimation(section){
				var $section = section,
					$wrapper = $section.find('.eut-title-content-wrapper'),
					effect = $section.find('.eut-content').data('animation'),
					effectClass = 'eut-animate-' + effect,
					delay = 200,
					cnt = 0,
					contentItems = {
						graphic     : $section.find(' .eut-graphic '),
						subheading  : $section.find(' .eut-subheading '),
						title       : $section.find(' .eut-title '),
						description : $section.find(' .eut-description '),
						titleMeta   : $section.find(' .eut-title-meta-content '),
						button1     : $section.find(' .eut-btn-1 '),
						button2     : $section.find(' .eut-btn-2 '),
						gotoArrow   : $section.find(' #eut-goto-section-wrapper ')
					};

				// Show Content
				$section.find('.eut-content').addClass('show');

				if( !$wrapper.hasClass('eut-bg-none') ){
					contentItems = {
						wrapper : $wrapper,
						gotoArrow   : $section.find(' #eut-goto-section-wrapper ')
					}
				}

				// Add Animation Class
				$.each( contentItems, function( key, item ) {
					$(item).removeClass('eut-animate-fade-in eut-animate-fade-in-up eut-animate-fade-in-down eut-animate-fade-in-left eut-animate-fade-in-right eut-animate-zoom-in eut-animate-zoom-out');

					if( $(item).length ){
						cnt++;
						if( effect != 'none' ){
							setTimeout(function(){
								$(item).addClass( effectClass );
							},cnt * delay);
						}
					}
				});
			}
		}
	};

	// # Feature Parallax
	// ============================================================================= //
	var featureParallaxScroll = false;
	EUTHEM.featureParallax = {
		init: function(){
			var section = $('#eut-feature-section'),
				scroll = false,
				smallDelay;

			if( !section.hasClass('eut-bg-parallax') && !section.hasClass('eut-bg-advanced-parallax') && !section.hasClass('eut-bg-fixed-section') ) {
				return;
			}

			// Create Parallax Wrapper
			section.children().not('.eut-separator-bottom').wrapAll('<div class="eut-parallax-wrapper"></div>');

			updateParallax();

			// Add window events
			$(window).on('resize', function(){
				window.clearTimeout(smallDelay);
				smallDelay = window.setTimeout(function () {
					updateParallax();
				}, 100);
			});
			$(window).on('scroll', onWindowScroll);

			function onWindowScroll(){
				if( window.requestAnimationFrame ) {
					if(!scroll){
						window.requestAnimationFrame( updateParallax );
						scroll = true;
					}
				} else {
					updateParallax();
				}
			}

			function updateParallax(){
				var wrapper = section.find('.eut-parallax-wrapper');
				var parallaxType;
				if( section.hasClass('eut-bg-advanced-parallax') ){
					parallaxType = 'advanced';
				} else if( section.hasClass('eut-bg-fixed-section') ){
					parallaxType = 'fixed';
				} else {
					parallaxType = 'classic';
				}

				if( inViewport( section ) ){
					// References
					var scrollTop = $( window ).scrollTop();
					var sectionTop = section.offset().top;
					var sectionW = section.outerWidth();
					var sectionH = section.outerHeight();
					var position = scrollTop * 0.2;
					var elementH = sectionH + sectionTop;
					var opacity = ( ( ( sectionH + sectionTop ) - scrollTop ) / sectionH ).toFixed(2);
					var scale = ( ( ( sectionH + sectionTop ) + scrollTop ) / sectionH );
					var content = section.find('.eut-wrapper, .eut-background-wrapper');
					if( tSupport ){

						if( parallaxType == 'advanced' ) {
							wrapper.css({
								'position' : 'fixed',
								'top' : sectionTop,
								'height' : elementH,
								'width' : sectionW,
								transform: 'translate3d( 0px' + ', ' + -position + 'px' + ', 0px)',
								visibility: 'visible'
							});
							content.css({
								// 'opacity' : opacity
							});
						} else if( parallaxType == 'fixed' ) {
							wrapper.css({
								'position' : 'fixed',
								'top' : sectionTop,
								'height' : elementH,
								'width' : sectionW,
								visibility: 'visible'
							});
						} else {
							wrapper.css({
								'position' : 'relative',
								'height' : elementH,
								'width' : sectionW,
								transform: 'translate3d( 0px' + ', ' + position + 'px' + ', 0px)',
								visibility: 'visible'
							});
						}
					}
				} else {
					wrapper.css({
						'position' : 'relative'
					});
				}
				scroll = false;
			}

			function inViewport( element ){
				var winTop = $( window ).scrollTop();
				var winBottom = winTop + $( window ).height();
				var elTop = element.offset().top;
				var elBottom = elTop + element.outerHeight();
				return ( winBottom >= elTop && winTop <= elBottom );
			}

		}
	};

	// # Woocommerce Carousel Thumb Gallery
	// ============================================================================= //
	EUTHEM.wooThumbCarousel = {
		init : function(){
			var $thumbs = $('#eut-product-feature-image').find('.thumbnails'),
				$thumbsWrapper = $thumbs.find('.eut-thumbnails-wrapper'),
				$thumbsInner = $thumbs.find('.eut-thumbnails-inner'),
				$items = $thumbs.find('.eut-thumb-item'),
				$arrowPrev = $('<i class="eut-icon-nav-up-small eut-arrow-prev"></i>'),
				$arrowNext = $('<i class="eut-icon-nav-down-small eut-arrow-next"></i>'),
				wrapper = false,
				smallDelay,
				wrapperH,
				slidesLength,
				cnt;


			if( !$thumbs.length || $items.length <= wooThumbCarouselItems ) {
				$thumbsWrapper.css({
					'visibility' : 'visible'
				});
				return false;
			}

			setSlider();
			$(window).on('resize', function(){
				window.clearTimeout(smallDelay);
				smallDelay = window.setTimeout(function () {
					setSlider();
				}, 300);
			});

			function addWrapper(){
				if( !wrapper ) {
					for (var i = 0, len = $items.length; i < len; i += wooThumbCarouselItems) {
						$items.slice(i, i + wooThumbCarouselItems).wrapAll('<div class="eut-thumb-wrapper"/>');
					}

					wrapperH = $('.eut-thumb-wrapper').first().outerHeight();
					slidesLength = $('.eut-thumb-wrapper').length - 1;

					$thumbsWrapper.css({
						'height' : wrapperH,
						'overflow' : 'hidden',
						'visibility' : 'visible'
					});

					addArrows();
					$thumbsInner.addClass('eut-with-transition');

					wrapper = true;
				}
			}

			function addArrows(){
				$arrowPrev.appendTo( $thumbs );
				$arrowNext.appendTo( $thumbs );
				// Add Classes
				$arrowPrev.addClass('eut-disable-arrow');
				$arrowNext.removeClass('eut-disable-arrow');

				cnt = 0;
				bindEvents();
			}

			function moveSlide(n){
				$thumbsInner.css( doTranslate( n * wrapperH ) );
			}

			function setSlider(){
				if( $(window).width() + scrollBarWidth < tabletPortrait && wrapper) {
					resetSlider();
				} else if( $(window).width() + scrollBarWidth > tabletPortrait && !wrapper) {
					addWrapper();
				}
			}

			function resetSlider(){
				$thumbsInner.removeClass('eut-with-transition');
				$thumbsInner.css( doTranslate( 0 ) );
				$items.unwrap();
				$thumbsWrapper.css({
					'height' : '',
					'overflow' : 'visible',
					'visibility' : 'visible'
				});

				$arrowPrev.remove();
				$arrowNext.remove();

				wrapper = false;
			}

			function bindEvents(){
				$arrowNext.on('click.thumb-arrows',function(){
					var $that = $(this);
					if( cnt > - slidesLength ){
						cnt--;
						moveSlide( cnt );
						$arrowPrev.removeClass('eut-disable-arrow');
					}
					if(cnt == -slidesLength ){
						$that.addClass('eut-disable-arrow');
					}
				});

				$arrowPrev.on('click.thumb-arrows',function(){
					var $that = $(this);
					if( cnt < 0 ){
						cnt++;
						moveSlide( cnt );
						$arrowNext.removeClass('eut-disable-arrow');
					}
					if(cnt == 0 ){
						$that.addClass('eut-disable-arrow');
					}
				});
			}

			function doTranslate( value ){
				return {
					'-webkit-transform' : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-moz-transform'    : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-ms-transform'     : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'-o-transform'      : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)',
					'transform'         : 'translate3d(0px, ' + value + 'px, 0px) translateZ(0)'
				}
			}
		}
	};

	// # Page Settings
	// ============================================================================= //
	EUTHEM.pageSettings = {

		init: function(){
			this.mainMenu();
			this.columnFullHeight();
			this.columnCustomSize();
			this.eutModal();
			this.gotoFirstSection();
			this.bgLoader();
			this.imageLoader();
			this.fitVid();
			this.hiddenArea();
			this.backtoTop();
			this.animatedBg();
			this.onePageSettings();
			this.shoppingCart();
			this.socialShareLinks();
			this.productImageParallax();
			this.lightBox();
			this.postSocials();
			this.fixedFooter();
		},
		bodyLoader: function(){
			var $overflow = $('#eut-loader-overflow'),
				$loader   = $('.eut-spinner'),
				$link = $('a');

			if( $overflow.length > 0 ){
				bodyLoader = true;
			} else {
				return;
			}

			if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 || navigator.userAgent.match(/(iPod|iPhone|iPad)/)){
				window.onpageshow = function(event) {
					if (event.persisted) {
						$overflow.removeClass('eut-visible eut-hide');
						window.location.reload();
					}
				};
			} else if(navigator.userAgent.indexOf('Firefox') != -1) {
				window.onunload = function(){};
			}

			if( $overflow.hasClass('eut-page-transition') ) {
				var exclude = ['.eut-no-transition', '.eut-toggle-modal'],
					comp = new RegExp(location.host);

				$('a:not(' + exclude + ')').on('click',function(e){
					var link = this;
					if( comp.test(link.href) && link.href.split(/\?|#/)[0] != location.href.split(/\?|#/)[0] && link.target != '_blank' && link.href[0] != '#') {
						if( link.href.indexOf( '#' ) == -1 &&
							link.href.indexOf( 'skype:' ) == -1 &&
							link.href.indexOf( 'mailto:' ) == -1 &&
							link.href.indexOf( 'tel:' ) == -1 &&
							link.href.indexOf( 'jpg' ) == -1 &&
							link.href.indexOf( 'jpeg' ) == -1 &&
							link.href.indexOf( 'png' ) == -1 &&
							link.href.indexOf( 'gif' ) == -1 &&
							link.href.indexOf( 'bmp' ) == -1 &&
							link.href.indexOf( 'pdf' ) == -1 &&
							link.href.indexOf( 'zip' ) == -1 &&
							link.href.indexOf('add-to-cart=') == -1 ) {
							e.preventDefault();
							var newLocation = this.href;
							$overflow.addClass('eut-visible').removeClass('eut-hide');
							setTimeout(function(){
								window.location = newLocation;
							}, 600);
						}
					}
				});
			}

			var images = $('img, .eut-bg-image');
			$.each(images, function(){
				var el = $(this),
				image = el.css('background-image').replace(/"/g, '').replace(/url\(|\)$/ig, '');
				if(image && image !== '' && image !== 'none')
					images = images.add($('<img>').attr('src', image));
				if(el.is('img'))
					images = images.add(el);
			});

			images.imagesLoaded(function(){
				setTimeout(function () {
					if( $overflow.hasClass('eut-page-transition') ) {
						$overflow.removeClass('eut-visible').addClass('eut-hide');
						setTimeout(function(){
							bodyLoader = false;
							EUTHEM.basicElements.animAppear();
							EUTHEM.svgAnimation.init();
							EUTHEM.basicElements.counter();
						}, 1200);
					} else {
						$loader.fadeOut(500);
						$overflow.delay(500).fadeOut(700,function(){
							bodyLoader = false;
							EUTHEM.basicElements.animAppear();
							EUTHEM.svgAnimation.init();
							EUTHEM.basicElements.counter();
						});
					}
				}, 600);
			});

		},
		addVideoBg: function(){
			$('.eut-yt-bg-video').each(function() {
				var $element = $(this);
				var url = $element.data("video-bg-url");
				var videoID = url.match( /[\\?&]v=([^&#]*)/ )[ 1 ];
				if( '' != videoID ) {
					insertYouTubeVideo($element, videoID );
				}
			});
			$('.eut-html5-bg-video').each(function() {
				var $element = $(this);
				EUTHEM.pageSettings.resizeVideoBgElement( $element );
			});
			function insertYouTubeVideo($element, youtubeId, counter) {
				if ("undefined" == typeof YT || "undefined" === typeof YT.Player) {
					counter = "undefined" === typeof counter ? 0 : counter;
					if (100 < counter) {
						console.warn("Too many attempts to load YouTube api");
						return;
					}
					setTimeout(function() {
						insertYouTubeVideo($element, youtubeId, counter++);
					}, 100);
					return;
				}
				var startSeconds = $element.data('video-start') != undefined ? parseInt( $element.data('video-start') ) : 0;
				var endSeconds = $element.data('video-end') != undefined ? parseInt( $element.data('video-end') ) : 0;
				var $container = $element.prepend('<div class="eut-bg-youtube-video"><div class="inner"></div></div>').find(".inner");
				var ytPlayer = new YT.Player($container[0], {
					width: "100%",
					height: "100%",
					videoId: youtubeId,
					playerVars: {
						playlist: youtubeId,
						iv_load_policy: 3,
						enablejsapi: 1,
						disablekb: 1,
						autoplay: 1,
						controls: 0,
						showinfo: 0,
						rel: 0,
						loop: 1,
						start: startSeconds,
						end: endSeconds,
						wmode: "transparent"
					},
					events: {
						'onReady': onPlayerReady,
						'onStateChange': onPlayerStateChange
					}
				});
				function onPlayerReady(event) {
					event.target.mute().setLoop(true);
				}
				function onPlayerStateChange(event) {
					if ( 0 != startSeconds || 0 != endSeconds ) {
						if (event.data === YT.PlayerState.ENDED) {
							ytPlayer.loadVideoById({
								videoId: youtubeId,
								startSeconds: startSeconds,
								endSeconds: endSeconds
							});
						}
					}
				}
				// Resize Video
				EUTHEM.pageSettings.resizeVideoBgElement( $element );
			}
		},
		resizeVideoBg: function(){
			$videoBg.each(function(){
				EUTHEM.pageSettings.resizeVideoBgElement( $(this) );
			});
		},
		resizeVideoBgElement: function( $element ){
			var videoEl,
				videoW,
				videoH,
				marginLeft,
				marginTop,
				containerW = $element.innerWidth(),
				containerH = $element.innerHeight(),
				ratio1 = 16,
				ratio2 = 9;

			if (containerW / containerH < ratio1 / ratio2) {
				videoW = containerH * (ratio1 / ratio2);
				videoH = containerH;
				videoW += 'px';
				videoH += 'px';
			} else {
				videoW = containerW;
				videoH = containerW * (ratio2 / ratio1);
				videoW += 'px';
				videoH += 'px';
			}
			if( $element.hasClass('eut-yt-bg-video') || $element.hasClass('eut-iframe-bg-video') ) {
				videoEl = 'iframe';
			} else {
				videoEl = 'video';
			}

			$element.find( videoEl ).css({
				maxWidth: '1000%',
				width: videoEl == 'iframe' ? videoW : '',
				height: videoH
			});
		},
		removeVideoBg: function(){
			$('.eut-background-wrapper').each(function () {
				var $wrapper = $(this),
					$bgImage = $wrapper.find('.eut-bg-image'),
					$bgVideo = $wrapper.find('.eut-bg-video'),
					$bgHtml5Video = $wrapper.find('.eut-html5-bg-video'),
					$bgYtVideo = $wrapper.find('.eut-yt-bg-video'),
					$bgIFrameVideo = $wrapper.find('.eut-iframe-bg-video'),
					$bgVideoButton = $wrapper.find('.eut-bg-video-button-device');

				var bgVideoDevice = $bgVideo.data('videoDevice') != undefined ? $bgVideo.data('videoDevice') : 'no';
				if( isMobile.any() && 'no' === bgVideoDevice) {
					$bgVideo.remove();
				} else {

					if ( $bgHtml5Video.length ) {
						var $videoElement = $wrapper.find('.eut-bg-video video');
						var canPlayVideo = false;
						$wrapper.find('.eut-bg-video source').each(function(){
							if ( $videoElement.get(0).canPlayType( $(this).attr('type') ) ) {
								canPlayVideo = true;
							}
						});
						if(canPlayVideo) {
							$bgImage.remove();
						} else {
							$bgVideo.remove();
						}
					}
					if ( $bgYtVideo.length || $bgIFrameVideo.length ) {
						$bgImage.remove();
					}
					if ( $bgVideoButton.length ) {
						$bgVideoButton.remove();
					}
				}
			});

		},
		linkGoToTop: function( element, delay, space ){

			var $this = element,
				elementTop       = $this.offset().top,
				header           = $('#eut-header').length && $('#eut-main-header').is(":visible") ? true : false,
				responsiveHeader = $('#eut-responsive-header').length && $('#eut-responsive-header').is(":visible") ? true : false,
				headerHeight     = header && $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
				respHeaderH      = responsiveHeader && $('#eut-header').data('devices-sticky') == 'yes' ? $('#eut-responsive-header').outerHeight() : 0,
				topBarHeight     = $('#eut-top-bar').length ? $('#eut-top-bar').height() : 0,
				anchorBarHeight  = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
				delayAnim        = delay != undefined ? delay : 300,
				topSpace         = space != undefined ? space : 0,
				offset           = topBarHeight + wpBarHeight + headerHeight + respHeaderH + anchorBarHeight + topSpace;
			if( elementTop > 0 ){
				$('html, body').delay(delayAnim).animate({
					scrollTop: elementTop - offset
				}, 900, 'easeInOutCubic');
				$("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
					$('html, body').stop();
				});
				return false;
			}
		},
		mainMenu: function(){
			var $mainMenu = $('#eut-header .eut-horizontal-menu ul.eut-menu');

			$('.eut-main-menu').find( 'a[href="#"]').on('click',function(e){
				e.preventDefault();
			});

			$mainMenu.superfish({
				popUpSelector: '.sub-menu',
				delay: 300,
				speed: 'fast',
				cssArrows: false,
				onBeforeShow: function(){

					var $subMenu = $(this);
					if( !$subMenu.length ) return;
					var $li = $subMenu.parent(),
						windowW = $(window).width(),
						subMenuW = $subMenu.width(),
						liOffsetL = $li.offset().left;
					if( $li.hasClass('megamenu') && $li.css('position') == 'relative' ){
						if(subMenuW + liOffsetL > windowW) {
							var left = windowW - (subMenuW + liOffsetL);
							$subMenu.css({'left' : left});
						}
					}
					if( !$li.hasClass('eut-first-level') && !$li.hasClass('megamenu') ){
						var subMenuLength = $li.find('.sub-menu').length + 1,
							subMenuOffsetL = $li.parents('.eut-first-level').offset().left;
						if( (subMenuW * subMenuLength) + subMenuOffsetL > windowW) {
							$li.addClass('eut-invert');
						}
					}
					if( $('body').hasClass('eut-boxed') && ( $li.hasClass('megamenu column-3') || $li.hasClass('megamenu column-2') ) ){
						var containerW = $('#eut-theme-wrapper').width(),
							containerL = $('#eut-theme-wrapper').offset().left,
							positionL = 0;

						if( subMenuW + liOffsetL > containerW + containerL ){
							positionL = (containerW + containerL) - (subMenuW + liOffsetL);
						}

						$subMenu.css({
							'left' : positionL
						});
					}
				},
				onHide: function(){
					var $subMenu = $(this),
						$li = $subMenu.parent();
					$li.removeClass('eut-invert');
				}
			});
		},
		columnFullHeight: function(){
			var $column = $('.eut-column-fullheight');

			$column.each(function(){
				var $that = $(this),
					fullTabletL = $that.data('tablet-landscape-fullheight') != undefined ? false : true,
					fullTabletP = $that.data('tablet-portrait-fullheight') != undefined ? false : true,
					fullMobileL = $that.data('mobile-fullheight') != undefined ? false : true;

				$that.columnSize({
					equal: false,
					middleContent: false,
					fullHeight: true,
					fullTabletL : fullTabletL,
					fullTabletP : fullTabletP,
					fullMobileL : fullMobileL
				});
			});
		},
		columnCustomSize: function(){
			var $section = $('.eut-section.eut-custom-height');
			$section.each(function(){
				var $that = $(this),
					equal = false,
					middle = false,
					fullHeight = false,
					equalTabletL = true,
					equalTabletP = true,
					equalMobileL = true,
					fullTabletL = true,
					fullTabletP = true,
					fullMobileL = true;

				if( $that.hasClass('eut-equal-column') || $that.hasClass('eut-middle-content') ){
					equal = true;
					equalTabletL = $that.data('tablet-landscape-equal-columns') != undefined ? false : true;
					equalTabletP = $that.data('tablet-portrait-equal-columns') != undefined ? false : true;
					equalMobileL = $that.data('mobile-equal-columns') != undefined ? false : true;
				}
				if( $that.hasClass('eut-middle-content') ){
					middle = true;
				}
				if( $that.hasClass('eut-fullheight') ){
					fullHeight = true;
					fullTabletL = $that.data('tablet-landscape-fullheight') != undefined ? false : true;
					fullTabletP = $that.data('tablet-portrait-fullheight') != undefined ? false : true;
					fullMobileL = $that.data('mobile-fullheight') != undefined ? false : true;
				}
				$that.columnSize({
					equal : equal,
					middleContent : middle,
					fullHeight : fullHeight,
					equalTabletL : equalTabletL,
					equalTabletP : equalTabletP,
					equalMobileL : equalMobileL,
					fullTabletL : fullTabletL,
					fullTabletP : fullTabletP,
					fullMobileL : fullMobileL
				});
			});
		},
		columnEffect: function(){
			var $parallaxColumn = $('.eut-parallax-effect'),
				$section = $parallaxColumn.parents('.eut-section');

			$parallaxColumn.each(function(){
				var $that = $(this),
					parallaxEffect = $that.data('parallax-effect'),
					tabletL = $that.data('tablet-landscape-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false,
					tabletP = $that.data('tablet-portrait-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false,
					mobileL = $that.data('mobile-parallax-effect') != 'none' && parallaxEffect == 'vertical-parallax' ? true : false,
					$section = $that.parents('.eut-section');

				imagesLoaded( $section, function() {
					$that.paraller({
						tabletL : [tabletLandscape, tabletL],
						tabletP : [tabletPortrait, tabletP],
						mobileL : [mobileScreen, mobileL]
					});
				});
			});
		},
		eutModal: function(){

			var $button       = $('.eut-toggle-modal'),
				$overlay      = $('<div id="eut-modal-overlay" class="eut-body-overlay"></div>'),
				$closeBtn     = $('<div class="eut-close-modal"><i class="eut-icon-close"></i></div>'),
				$themeWrapper = $('#eut-theme-wrapper'),
				content;

			$button.on('click',function(e){
				content = $(this).attr('href');
				if( content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();

					// Append Overlay on body
					$overlay.appendTo( $themeWrapper );
					$closeBtn.appendTo( $(content) );

					$(content).addClass('prepare-anim');

					openModal();

					$closeBtn.on('click',function(e){
						e.preventDefault();
						closeModal();
					});

					$(content).on('click',function(e){
						if ( !$('.eut-modal-item').is(e.target) && $('.eut-modal-item').has(e.target).length === 0 ) {
							e.preventDefault();
							closeModal();
						}
					});
				}
			});

			// Open Modal
			function openModal() {
				$overlay.fadeIn(function(){
					$(content).addClass('animate');

					// Search Modal
					if( $(content).is('#eut-search-modal') ){
						var $searchContent = $('#eut-search-modal'),
							$searchInput = $searchContent.find('.eut-search-textfield');

						$searchInput.val('');
						setTimeout(function(){
							$searchInput.focus();
						},600);
					}
				});
			}

			// Close Modal
			function closeModal() {
				$(content).removeClass('animate mobile');
				setTimeout(function(){
					$overlay.fadeOut(function(){
						$(content).removeClass('prepare-anim');
						$overlay.remove();
						$closeBtn.remove();
					})
				},600);
			}

			$(document).on('keyup',function(evt) {
				if (evt.keyCode == 27 && $(content).hasClass('animate') ) {
					closeModal();
				}
			});

		},
		gotoFirstSection: function(){
			var $selector    = $('#eut-feature-section #eut-goto-section'),
				$nextSection = $('#eut-content'),
				$stickyHeader = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;

			$selector.on('click',function(){
				if( $nextSection.length ){
					$('html,body').animate({
						scrollTop: $nextSection.offset().top - $stickyHeader
					}, 1000);
					return false;
				}
			});
		},
		bgLoader: function() {

			var $selector = $('#eut-header .eut-bg-image, #eut-content .eut-bg-image, #eut-footer .eut-bg-image, .eut-navigation-bar .eut-bg-image, #eut-sidearea .eut-bg-image');
			$selector.each(function () {
				var $selector = $(this);
				if( $selector.data('loader') == 'yes' ){
					EUTHEM.pageSettings.addSpinner( $selector );
				}
				function imageUrl(input) {
					return input.replace(/"/g,"").replace(/url\(|\)$/ig, "");
				}
				var image = new Image(),
					$that = $(this);
				image.src = imageUrl($that.css('background-image'));
				image.onload = function () {
					if( $selector.data('loader') == 'yes' ){
						EUTHEM.pageSettings.removeSpinner( $selector );
					} else {
						$that.addClass('show');
					}
				};
			});
		},
		imageLoader: function(){
			var selectors  = {
				singleImage  : '.eut-image',
				media        : '.eut-media'
			};
			$.each(selectors, function(key, value){
				if( $(this).length ){
					var item     = $(this),
						imgLoad  = imagesLoaded( item );
					imgLoad.on( 'always', function() {
						$(value).find('img').animate({ 'opacity': 1 },1000);
					});
				}
			});
		},
		addSpinner: function( $selector ){
			var $section = $selector;
			$(spinner).appendTo( $section.parent() );
		},
		removeSpinner: function( $selector ){

			var $section   = $selector.parent(),
				$spinner   = $section.find('.eut-spinner');

			$spinner.fadeOut(600,function(){
				$selector.addClass('show');
				$spinner.remove();
			});
		},
		fitVid: function(){
			$('.eut-video, .eut-media').fitVids();
			$('iframe[src*="youtube"]').parent(":not(.eut-bg-youtube-video)").fitVids();
			$('iframe[src*="vimeo"]').parent().fitVids();
		},
		hiddenArea: function( section, btn ){
			var $btn          = $('.eut-toggle-hiddenarea'),
				$themeWrapper = $('#eut-theme-wrapper'),
				$closeBtn     = $('.eut-hidden-area').find('.eut-close-btn'),
				startTimer = false,
				count = -1,
				itemLength = 0,
				counter,
				areaWidth     = 0,
				content,
				$overlay;

			$btn.on('click',function(e){
				content = $(this).attr('href');
				if( content.indexOf("#") === 0 && $(content).length > 0 ) {
					e.preventDefault();
					var overlayId = content.replace('#','');

					$(content).addClass('prepare-anim');
					$overlay = $('<div id="' + overlayId + '-overlay" class="eut-body-overlay"></div>');

					// Append Overlay on body
					$overlay.appendTo( $themeWrapper );

					// Calculate Width
					areaWidth = hiddenAreaWidth( content );
					$(window).smartresize(function(){
						areaWidth = hiddenAreaWidth( content );
					});

					// Menu First Level Animation
					if(hiddenMenuItemsAnimation){
						$(content).addClass('eut-animated-menu-items');
					}
					setTimeout(function(){
						if(hiddenMenuItemsAnimation){
							animMenuItems(content);
						}
					},1000);

					if( $(content).hasClass('open') ) {
						closeHiddenArea();
					} else {
						openHiddenArea();
					}

					// For One Page
					var $link = $(content).find('a[href*="#"]:not( [href="#"] )');
					$link.on('click',function(){
						var target = $(this.hash),
							targetHash = this.hash,
							dataValue = this.hash.replace('#','');
						if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-bookmark') || target.hasClass('eut-tab-content') || target.hasClass('eut-accordion-content') ) ) {
							closeHiddenArea();
						}
						// For Fullpage Scrolling
						if( $('[data-anchor="' + dataValue + '"]').length ){
							closeHiddenArea();
						}
						//For go to header
						if( 'eut-goto-header' == dataValue ){
							closeHiddenArea();
						}
					});

				}
			});

			$closeBtn.on('click',function(){
				closeHiddenArea();
			});

			// Open Hidden Area
			function openHiddenArea() {
				$overlay.fadeIn(function(){
					$('body').scrollTop( 0 );
					$(content).addClass('open');
					$(this).on('click',function(){
						closeHiddenArea();
					});
				});
			}
			// Close Hidden Area
			function closeHiddenArea() {
				$themeWrapper.css({ 'height' : 'auto' });
				$(content).removeClass('open');
				$overlay.fadeOut(function(){
					$overlay.remove();
					$(content).removeClass('prepare-anim');
				});
			}

				// Calculate Area Width
			function hiddenAreaWidth( area ){
				var $area = $(area),
					windowWidth  = $(window).width();

				if( $(window).width() + scrollBarWidth <= mobileScreen ) {
					$(area).css({ 'width' : windowWidth + 30 });
				} else {
					if( $area.hasClass('eut-large-width') ) {
						$(area).css({ 'width' : Math.max(hiddenaAreaMinWidth, (windowWidth / 2)) });
					} else if( $area.hasClass('eut-medium-width') ) {
						$(area).css({ 'width' : Math.max(hiddenaAreaMinWidth, (windowWidth / 3)) });
					} else {
						$(area).css({ 'width' : Math.max(hiddenaAreaMinWidth, (windowWidth / 4)) });
					}
				}

				return areaWidth;
			}

			// Menu First Level Animation
			function animMenuItems(area) {
				var $area = $(area),
					$menu = $area.find('ul.eut-menu'),
					$firstLevel = $menu.find('li.eut-first-level'),
					itemLength = $firstLevel.length;
				if( itemLength > 0 && !startTimer ){
					startTimer = true;
					counter = setInterval(function(){
						timer($firstLevel);
					}, 200);
				}

				function timer($menuItem){
					count += 1;
					if (count >= itemLength) {
						clearInterval(counter);
					}
					$menuItem.eq(count).addClass('show');
				}
			}

		},
		hiddenAreaHeight: function( area ){
			if( !$(area).length > 0 ) return;

			var windowWidth      = $(window).width(),
				windowHeight     = $(window).height(),
				hiddenAreaHeight = $(area).find('.eut-hiddenarea-content').outerHeight() + 200,
				$themeWrapper    = $('#eut-theme-wrapper'),
				$scroller        = $(area).find('.eut-scroller'),
				$buttonWrapper   = $(area).find('.eut-buttons-wrapper'),
				btnWrapperHeight = $buttonWrapper.length ? $buttonWrapper.height() : 0,
				sideHeight       = 0;

			if( hiddenAreaHeight > windowHeight ){
				sideHeight = hiddenAreaHeight;
			} else {
				sideHeight = windowHeight;
			}

			if( $(window).width() + scrollBarWidth <= mobileScreen ) {
				$scroller.css({ 'height' : 'auto' });
				$(area).css({ 'position' : 'absolute','height' : sideHeight });
				$themeWrapper.css({ 'height' : sideHeight, 'overflow' : 'hidden' });
			} else {
				$scroller.css({ 'height' : windowHeight - btnWrapperHeight - 150 });
				$themeWrapper.css({ 'height' : '', 'overflow' : '' });
			}
		},
		backtoTop: function() {
			var selectors  = {
				topBtn     : '.eut-back-top',
				dividerBtn : '.eut-divider-backtotop',
				topLink    : 'a[href="#eut-goto-header"]'
				},
				footerBarHeight = $('.eut-footer-bar.eut-fullwidth').length ? $('.eut-footer-bar.eut-fullwidth').outerHeight() : 0;

				if( $( selectors.topBtn ).length ) {

					$(window).on('scroll', function() {
						var scroll = $(this).scrollTop(),
							$topBtn = $( selectors.topBtn );

						if (scroll > 600) {
							$topBtn.addClass('show');
						} else {
							$topBtn.removeClass('show');
						}
						if( scroll + $(window).height() > $(document).height() - footerBarHeight ) {
							$topBtn.css({ 'transform': 'translate(0, ' + -( footerBarHeight + 80 ) + 'px)' });
						} else {
							$topBtn.css({ 'transform': '' });
						}

					});
				}

			$.each(selectors, function(key, value){
				$(value).on('click', function(e){
					e.preventDefault();
					goToTop = true;
					var scrollTop = Math.abs($(window).scrollTop()) / 2,
						speed = scrollTop < 1000 ? 1000 : scrollTop;
					$('html, body').animate({scrollTop: 0}, speed, 'easeInOutCubic',function(){
						goToTop = false;
					});
				});
			});

		},
		animatedBg: function(){
			var $section = $('.eut-section');

			$section.each(function(){
				var $this = $(this);

				if( $this.hasClass('eut-bg-animated') ) {
					zoomBg( $this );
				} else if( $this.hasClass('eut-bg-horizontal') ) {
					horizontalBg( $this );
				}
			});

			function zoomBg( $this ){
				$this.mouseenter(function() {
					$this.addClass('zoom');
				});
				$this.mouseleave(function() {
					$this.removeClass('zoom');
				});
			}

			function horizontalBg( $this ){
				var bgPosition = 0;
				setInterval(function(){
					bgPosition++;
					$this.find('.eut-bg-image').css({ 'background-position' : bgPosition+'px center', 'background-repeat' : 'repeat' });
				},75);
			}
		},
		onePageSettings: function(){
			$('a[href*="#"]:not( [href="#"] )').on('click',function(e){
				var	anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
					target          = $(this.hash),
					targetHash      = this.hash;

				if( $("#eut-responsive-header").is(":visible") ) {
					var headerHeight = $('#eut-header').data('devices-sticky') != 'no' ? $('#eut-header').data('devices-sticky-height') : 0;
				} else {
					var headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;
					if( target.length ){
						headerHeight = ( 'advanced' == $('#eut-header').data('sticky') && target.offset().top > $(this).offset().top ) ? 0 : headerHeight;
					}
				}

				if ( target.length && ( target.hasClass('eut-section') || target.hasClass('eut-bookmark') ) ) {
					$('html,body').animate({
						scrollTop: target.offset().top - headerHeight - wpBarHeight - anchorBarHeight + 1
					}, 1000);
					return false;
				}
				if ( target.length && ( target.hasClass('eut-tab-content') || target.hasClass('eut-accordion-content') ) ) {
					var tabLink =  $('.eut-tab-link[data-rel="' + targetHash + '"]:visible');
					if ( tabLink.length ) {
						tabLink.click();
						setTimeout(function() {
							EUTHEM.pageSettings.linkGoToTop( tabLink );
						}, 500);
					}
					return false;
				}
			});
		},
		onePageMenu: function(){
			var $section       = $('#eut-main-content .eut-section[id]');
			if (!$section.length > 0 ) return;

			var sideHeader     = $('#eut-main-header').hasClass('eut-header-side') ? true : false,
				headerHeight   = $('#eut-header').attr('data-sticky-header') != 'none' && !sideHeader ? $('#eut-main-header').outerHeight() : 0,
				anchorBarHeight = $('.eut-anchor-menu').length ? $('.eut-anchor-menu').outerHeight() : 0,
				offsetTop      = headerHeight + anchorBarHeight + wpBarHeight,
				scroll         = $(window).scrollTop();

			$section.each(function(){
				var $that         = $(this),
					currentId     = $that.attr('id'),
					sectionOffset = $that.offset().top - offsetTop;

				if (sectionOffset <= scroll && sectionOffset + $that.outerHeight() > scroll ) {
					$('a[href*="#' + currentId + '"]').parent().addClass('active');
				}
				else{
					$('a[href*="#' + currentId + '"]').parent().removeClass("active");
				}

			});
		},
		fixedFooter: function(){
			var $footer      = $('#eut-footer'),
				sticky       = $footer.data('sticky-footer'),
				prevSection  = $footer.prev(),
				prevMargin = parseInt( prevSection.css('margin-bottom') ),
				delay;

			if( !$footer.length || sticky != 'yes' || isMobile.any() ) return;

			// On window events
			$( window ).on( 'scroll', function(){
				update();
			});
			$(window).on('resize',resizer);

			function resizer(){
				window.clearTimeout(delay);
				delay = window.setTimeout(function() {
					$footer.prev().css( 'margin-bottom','' );
					prevMargin = parseInt( prevSection.css('margin-bottom') );
					update();
				}, 900);
			}

			update();

			function update(){
				var windowWidth = $(window).width(),
					windowHeight = $(window).height(),
					footerHeight = $footer.outerHeight(),
					margin       = footerHeight + prevMargin;

				if( ( windowWidth + scrollBarWidth <= tabletLandscape ) || ( footerHeight > windowHeight ) ) {
					$footer.removeClass('eut-fixed-footer').prev().css( 'margin-bottom','' );
				} else {
					$footer.addClass('eut-fixed-footer').prev().css( 'margin-bottom',margin );
				}
			}

		},
		shoppingCart: function(){
			var $button = $('.eut-toggle-cart'),
				$cart = $('.eut-shoppin-cart-content'),
				$cartList = $cart.find('.cart_list'),
				timer;

			$button.on('mouseover',function(){
				clearTimeout(timer);
				openCart();
			});

			$button.on('mouseout',function(){
				closeCart();
			});

			$cart.on('mouseover',function(){
				clearTimeout(timer);
			});

			$cart.on('mouseout',function(){
				closeCart();
			});

			function openCart(){
				$cart.addClass('open');
			}

			function closeCart(){
				timer = setTimeout(function(){
					$cart.removeClass('open');
				}, 300);
			}
		},
		productImageParallax: function(){
			$('#eut-product-feature-image .eut-product-parallax-image img').paraller({
				wrapper : '.eut-product-area-wrapper',
				effect : 'mouse-move-x',
				sensitive : 'normal',
				invert : true
			});
		},
		lightBox: function(){
			//IMAGE
			$('.eut-image-popup').each(function() {
				$(this).magnificPopup({
					type: 'image',
					preloader: false,
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						imageLoadComplete: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );

						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					},
					image: {
						verticalFit: true,
						titleSrc: function(item) {
							var title   = item.el.data( 'title' ) ? item.el.data( 'title' ) : '',
								caption = item.el.data('desc') ? '<br><small>' + item.el.data('desc') + '</small>' : '';
							if ( '' === title ) {
								title   = item.el.find('.eut-title').html() ? item.el.find('.eut-title').html() : '';
							}
							if ( '' === caption ) {
								caption = item.el.find('.eut-caption').html() ? '<br><small>' + item.el.find('.eut-caption').html() + '</small>' : '';
							}
							return title + caption;
						}
					}
				});
			});
			$('.eut-gallery-popup, .eut-post-gallery-popup').each(function() {
				$(this).magnificPopup({
					delegate: 'a',
					type: 'image',
					preloader: false,
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						imageLoadComplete: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );

						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					},
					gallery: {
						enabled:true,
						tCounter: '%curr% / %total%'
					},
					image: {
						tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
						titleSrc: function(item) {
							var title   = item.el.data( 'title' ) ? item.el.data( 'title' ) : '',
								caption = item.el.data('desc') ? '<br><small>' + item.el.data('desc') + '</small>' : '';
							if ( '' === title ) {
								title   = item.el.find('.eut-title').html() ? item.el.find('.eut-title').html() : '';
							}
							if ( '' === caption ) {
								caption = item.el.find('.eut-caption').html() ? '<br><small>' + item.el.find('.eut-caption').html() + '</small>' : '';
							}
							return title + caption;
						}
					}
				});
			});

			if( 1 == fildisi_eutf_main_data.wp_gallery_popup ) {
				$('.gallery').each(function() {
					$(this).magnificPopup({
						delegate: 'a',
						type: 'image',
						preloader: false,
						fixedBgPos: true,
						fixedContentPos: true,
						removalDelay: 200,
						closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
						closeOnBgClick: true,
						callbacks: {
							beforeOpen: function() {
								var mfpWrap = this.wrap;
								this.bgOverlay.fadeIn(200);
								addSpinner( mfpWrap );
							},
							imageLoadComplete: function() {
								var $spinner = this.wrap.find('.eut-spinner'),
									$content = this.container;
								removeSpinner( $spinner, $content );

							},
							beforeClose: function() {
								this.wrap.fadeOut(100);
								this.container.css({'opacity' : 0});
								this.bgOverlay.fadeOut(100);
							},
						},
						gallery: {
							enabled:true,
							tCounter: '%curr% / %total%'
						},
						image: {
							tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
							titleSrc: function(item) {
								var title   = item.el.closest('.gallery-item').find('.gallery-caption').html() ? item.el.closest('.gallery-item').find('.gallery-caption').html() : '';
								return title;
							}
						}
					});
				});
			}
			//Inline Modal Popup
			$('.eut-modal-popup').each(function() {
				$(this).magnificPopup({
					disableOn: 0,
					type: 'inline',
					preloader: false,
					prependTo: '#eut-theme-wrapper',
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
							this.container.css({'opacity':0});
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
							if( $content.find('.eut-isotope').length ) {
								setTimeout(function(){
									$('.eut-modal-popup').trigger( "eut_relayout_isotope" );
								},100);
							}

							if( $content.find('.owl-carousel').length ) {
								setTimeout(function(){
									$content.find('.owl-carousel').each(function(){
										var owl = $(this).data('owlCarousel');
										owl.onResize();
									});
								},300);
							}

							if( $content.find('.eut-map').length ) {
								$('.eut-modal-popup').trigger( "eut_resize_map" );
							}
						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					}
				});
			});
			//VIDEOS
			if ( $('.eut-body').hasClass( 'eut-privacy-video-embeds-disabled' ) ) {
				$('.eut-youtube-popup, .eut-vimeo-popup, .eut-video-popup').each(function() {
					$(this).attr({"target" : "_blank"});
				});
			} else {
				$('.eut-youtube-popup, .eut-vimeo-popup, .eut-video-popup').each(function() {
					$(this).magnificPopup({
						disableOn: 0,
						type: 'iframe',
						preloader: false,
						fixedBgPos: true,
						fixedContentPos: true,
						removalDelay: 200,
						closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
						closeOnBgClick: true,
						callbacks: {
							beforeOpen: function() {
								var mfpWrap = this.wrap;
								this.bgOverlay.fadeIn(200);
								addSpinner( mfpWrap );
							},
							open: function() {
								var $spinner = this.wrap.find('.eut-spinner'),
									$content = this.container;
								removeSpinner( $spinner, $content );
							},
							beforeClose: function() {
								this.wrap.fadeOut(100);
								this.container.css({'opacity' : 0});
								this.bgOverlay.fadeOut(100);
							},
						}
					});
				});
			}

			$('.eut-page-popup').each(function() {
				$(this).magnificPopup({
					disableOn: 0,
					type: 'iframe',
					preloader: false,
					fixedBgPos: true,
					fixedContentPos: true,
					removalDelay: 200,
					closeMarkup: '<div class="mfp-close eut-close-modal"></div>',
					closeOnBgClick: true,
					callbacks: {
						beforeOpen: function() {
							var mfpWrap = this.wrap;
							this.bgOverlay.fadeIn(200);
							addSpinner( mfpWrap );
						},
						open: function() {
							var $spinner = this.wrap.find('.eut-spinner'),
								$content = this.container;
							removeSpinner( $spinner, $content );
						},
						beforeClose: function() {
							this.wrap.fadeOut(100);
							this.container.css({'opacity' : 0});
							this.bgOverlay.fadeOut(100);
						},
					}
				});
			});

			function addSpinner( mfpWrap ){
				$(spinner).appendTo( mfpWrap );
			}

			function removeSpinner( spinner, content ){
				setTimeout(function(){
					spinner.fadeOut(1000, function(){
						content.animate({'opacity':1},600);
						$('.eut-modal-popup').trigger( 'eut_open_modal' );
						$(spinner).remove();
					});
				}, 700);
			}
		},
		socialShareLinks: function(){
			$(document).on('click','.eut-social-share-facebook',function(e){
				e.preventDefault();
				window.open( 'https://www.facebook.com/sharer/sharer.php?u=' + $(this).attr('href'), "facebookWindow", "height=380,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-twitter',function(e){
				e.preventDefault();
				window.open( 'http://twitter.com/intent/tweet?text=' + encodeURIComponent( $(this).attr('title') ) + ' ' + $(this).attr('href'), "twitterWindow", "height=450,width=660,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-linkedin',function(e){
				e.preventDefault();
				window.open( 'http://www.linkedin.com/shareArticle?mini=true&url=' + $(this).attr('href') + '&title=' + encodeURIComponent( $(this).attr('title') ), "linkedinWindow", "height=500,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-pinterest',function(e){
				e.preventDefault();
				window.open( 'http://pinterest.com/pin/create/button/?url=' + $(this).attr('href') + '&media=' + $(this).data('pin-img') + '&description=' + encodeURIComponent( $(this).attr('title') ), "pinterestWindow", "height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-social-share-reddit',function(e){
				e.preventDefault();
				window.open( '//www.reddit.com/submit?url=' + $(this).attr('href'), "redditWindow", "height=600,width=820,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=1" );
				return false;
			});
			$(document).on('click','.eut-social-share-tumblr',function(e){
				e.preventDefault();
				window.open( '//www.tumblr.com/share/link?url=' + $(this).attr('href') + '&name=' + encodeURIComponent( $(this).attr('title') ) , "tumblrWindow", "height=600,width=600,resizable=0,toolbar=0,menubar=0,status=0,location=0,scrollbars=0" );
				return false;
			});
			$(document).on('click','.eut-like-counter-link',function(e){
				e.preventDefault();
				var link = $(this);
				var id = link.data('post-id'),
					counter = link.parent().find('.eut-like-counter'),
					icon = link.find('i');

				var dataParams = {
					action:'fildisi_eutf_likes_callback',
					eut_likes_id: id,
					_eutf_nonce: fildisi_eutf_main_data.nonce_likes
				};
				$.post( fildisi_eutf_main_data.ajaxurl, dataParams , function( response ) {
					if ( '-1' != response ) {
						if( 'active' == response.status ){
							link.addClass('active');
							icon.removeClass('eut-icon-heart-o').addClass('eut-icon-heart');
						} else {
							link.removeClass('active');
							icon.removeClass('eut-icon-heart').addClass('eut-icon-heart-o');
						}
						counter.html(response.likes);
					}
				}).fail(function(xhr, status, error) {
				});
			});
		},
		postSocials: function(){
			var $social = $('#eut-single-post-meta-sticky .eut-post-socials li a'),
				initSize = 36;

			if( $(window).width() + scrollBarWidth <= tabletLandscape ) {
				return;
			}

			$social.unbind('mouseenter').bind('mouseenter', function() {
				var $this = $(this),
					newSize = $this.find('span').outerWidth();
				$this.css('width', newSize + initSize)
			});

			$social.unbind('mouseleave').bind('mouseleave', function() {
				var $this = $(this);
				$this.css('width', initSize)
			});
		},
		fullHeightSeparator : function(){
			var $section = $('.eut-separator-fullheight');
			$section.each(function(){
				var $that = $(this),
					$separator = $that.find('.eut-separator'),
					delay;

				setSeparatorH();
				$that.css({
					'visibility' : 'visible'
				});

				if( !isMobile.any() ) {
					$(window).on("resize",resizer);
				} else {
					$(window).on("orientationchange",resizer);
				}

				function resizer(){
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						setSeparatorH();
					}, 300);
				}
				function getHeight(){
					var height = $that.outerHeight();
					return height;
				}

				function setSeparatorH(){
					$separator.css({
						'height' : getHeight()
					});
				}
			});
		}
	};

	// # Basic Elements
	// ============================================================================= //
	EUTHEM.basicElements = {
		init: function(){
			this.autoHeadings();
			this.pieChart();
			this.progressBars();
			this.counter();
			this.slider();
			this.testimonial();
			this.flexibleCarousel();
			this.carousel();
			this.advancedPromo();
			this.imageText();
			this.imageTextParallax();
			this.doubleImageText();
			this.portfolioParallax();
			this.teamParallax();
			this.testimonialParallax();
			this.sliderParallax();
			this.messageBox();
			this.wooProduct();
			this.wooProductZoom();
			this.animAppear();
			this.htmlVideoPlayWhenAppear();
			this.accordionToggle();
			this.tabs();
			this.vcAccordion();
			this.vcTab();
			this.productSocials();
			this.countdown();
			this.hovers();
		},
		autoHeadings: function(){
			var $portfolio = $('.eut-portfolio.eut-auto-headings .eut-isotope-item-inner');
			$portfolio.autoHeading({
				compressor : 20,
				items : [
					{ 'item' : '.eut-title', 'min' : 18, 'max' : 50 }
				]
			});
			$('.eut-blog-item.eut-style-2 .eut-blog-item-inner').autoHeading({
				compressor : 10,
				items : [
					{ 'item' : '.eut-post-title', 'min' : 16, 'max' : 30 }
				]
			});
		},
		pieChart: function(){

			$('.eut-chart-number').each(function() {
				var $element  = $(this),
					delay     = $element.parent().data('delay') !== '' ? parseInt( $element.parent().data('delay') ) : 0,
					size      = $element.data('pie-size'),
					chartSize = '130';
				if( size == 'small' ){
					chartSize = '100';
				}
				if( size == 'large' ){
					chartSize = '160';
				}

				$element.css({ 'width' : chartSize, 'height' : chartSize, 'line-height' : chartSize + 'px' });

				if( $element.parents('.eut-modal-element').length ){
					$('.eut-modal-popup').on( 'eut_open_modal', function(){
						EUTHEM.basicElements.pieChartInit( $element, chartSize );
					});
				} else {
					$element.appear(function() {
						setTimeout(function () {
							EUTHEM.basicElements.pieChartInit( $element, chartSize );
						}, delay);
					});
				}
			});

		},
		pieChartInit: function( $element, size ){

			var activeColor = $element.data('pie-active-color') !== '' ? $element.data('pie-active-color') : 'rgba(0,0,0,1)',
				pieColor    = $element.data('pie-color') !== '' ? $element.data('pie-color') : 'rgba(0,0,0,0.1)',
				pieLineCap  = $element.data('pie-line-cap') !== '' ? $element.data('pie-line-cap') : 'round',
				lineSize    = $element.data('pie-line-size') !== '' ? $element.data('pie-line-size') : '6',
				chartSize   = size;


			$element.easyPieChart({
				barColor: activeColor,
				trackColor: pieColor,
				scaleColor: false,
				lineCap: pieLineCap,
				lineWidth: lineSize,
				animate: 1500,
				size: chartSize
			});
		},
		progressBars: function(){
			$('.eut-progress-bar').each(function() {

				var $element  = $(this);
				if( $element.parents('.eut-modal-element').length ){
					$('.eut-modal-popup').on( 'eut_open_modal', function(){
						EUTHEM.basicElements.progressBarsInit( $element );
					});
				} else {
					$element.appear(function() {
						EUTHEM.basicElements.progressBarsInit( $element );
					});
				}
			});
		},
		progressBarsInit: function( $element ){
			var val = $element.attr('data-value'),
				percentage = $('<span class="eut-percentage">'+ val + '%'+'</span>');

			$element.find('.eut-bar-line').animate({ width: val + '%' }, 1600);
			if( $element.parent().hasClass('eut-style-1') ) {
				percentage.appendTo($element.find('.eut-bar')).animate({ left: val + '%' }, 1600);
			} else {
				percentage.appendTo($element.find('.eut-bar-title'));
			}
		},
		counter: function(){
			if( bodyLoader === true ){
				return;
			}
			var selector = '.eut-counter-item span';
			$(selector).each(function(i){
				var elements = $(selector)[i],
					thousandsSeparator = $(this).attr('data-thousands-separator') !== '' ? $(this).attr('data-thousands-separator') : ',';
				$(elements).attr('id','eut-counter-' + i );
				var delay = $(this).parents('.eut-counter').attr('data-delay') !== '' ? parseInt( $(this).parents('.eut-counter').attr('data-delay') ) : 200,
					options = {
						useEasing    : true,
						useGrouping  : true,
						separator    : $(this).attr('data-thousands-separator-vis') !== 'yes' ? thousandsSeparator : '',
						decimal      : $(this).attr('data-decimal-separator') !== '' ? $(this).attr('data-decimal-separator') : '.',
						prefix       : $(this).attr('data-prefix') !== '' ? $(this).attr('data-prefix') : '',
						suffix       : $(this).attr('data-suffix') !== '' ? $(this).attr('data-suffix') : ''
					},
					counter = new CountUp( $(this).attr('id') , $(this).attr('data-start-val'), $(this).attr('data-end-val'), $(this).attr('data-decimal-points'), 2.5, options);
				$(this).appear(function() {
					setTimeout(function () {
						counter.start();
					}, delay);
				});
			});
		},
		slider: function(){

			var $element = $('#eut-main-content .eut-slider-element, #eut-single-media .eut-slider-element');

			$element.each(function(){
				var $slider = $(this),
					$nextNav = $slider.parents('.eut-slider').find('.eut-carousel-next'),
					$prevNav = $slider.parents('.eut-slider').find('.eut-carousel-prev'),
					sliderSpeed = ( parseInt( $slider.attr('data-slider-speed') ) ) ? parseInt( $slider.attr('data-slider-speed') ) : 3000,
					transition = $slider.attr('data-slider-transition'),
					loop = $slider.attr('data-slider-loop') != 'no' ? true : false,
					autoPlay = $slider.attr('data-slider-autoplay') != 'no' ? true : false,
					autoHeight = $slider.attr('data-slider-autoheight') == 'yes' ? true : false,
					pagination = $slider.attr('data-pagination') != 'no' ? true : false,
					animateOut = false,
					animateIn = false;

				// Slider Trantition
				if( $slider.parents('.eut-slider').hasClass('eut-layout-2') || 'fade' == transition ){
					animateOut = 'carousel-fade-out';
					animateIn = 'carousel-fade-in';
				}

				if ( $slider.find('.eut-slider-item').length == 1 ) {
					loop = false;
				}

				// Slider Init
				$slider.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : false,
					smartSpeed : 500,
					dots : pagination,
					animateOut : animateOut,
					animateIn : animateIn,
					autoHeight : autoHeight,
					itemClass : 'eut-slider-item-wrapper'
				});

				// Fixed for Carousel middle content
				if( $slider.parents('.eut-section').hasClass('eut-middle-content') ){
					var smallDelay;
					EUTHEM.basicElements.fixMiddleCarousel( $slider );
					$slider.parents('.eut-section').data('plugin_columnSize').reCalculate();
					$(window).on('resize',function(){
						window.clearTimeout(smallDelay);
						smallDelay = window.setTimeout(function () {
							EUTHEM.basicElements.fixMiddleCarousel( $slider );
						}, 300);
					});
				}

				$slider.parents('.eut-slider').css('visibility','visible');

				// Go to the next item
				$nextNav.on('click',function(){
					$slider.trigger('next.owl.carousel');
				})
				// Go to the previous item
				$prevNav.on('click',function(){
					$slider.trigger('prev.owl.carousel');
				})

			});

		},
		testimonial: function(){

			var $element = $('.eut-testimonial.eut-carousel-element');

			$element.each(function(){
				var $testimonial = $(this),
					sliderSpeed = ( parseInt( $testimonial.attr('data-slider-speed') ) ) ? parseInt( $testimonial.attr('data-slider-speed') ) : 3000,
					pagination = $testimonial.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $testimonial.attr('data-pagination-speed') ) ) ? parseInt( $testimonial.attr('data-pagination-speed') ) : 400,
					transition = $testimonial.attr('data-slider-transition'),
					autoHeight = $testimonial.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $testimonial.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $testimonial.attr('data-slider-pause') == 'yes' ? true : false,
					loop = true,
					animateOut = false,
					animateIn = false;

				// Testimonial Trantition
				if( $testimonial.hasClass('eut-layout-2') || 'fade' == transition ){
					animateOut = 'carousel-fade-out';
					animateIn = 'carousel-fade-in';
				}
				if ( $testimonial.find('.eut-testimonial-element').length == 1 ) {
					loop = false;
				}
				// Testimonial Init
				$testimonial.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					animateOut : animateOut,
					animateIn : animateIn,
					autoHeight : autoHeight,
					itemClass : 'eut-testimonial-item-wrapper'
				});

				// Fixed for Carousel middle content
				if( $testimonial.parents('.eut-section').hasClass('eut-middle-content') ){
					var smallDelay;
					EUTHEM.basicElements.fixMiddleCarousel( $testimonial );
					$testimonial.parents('.eut-section').data('plugin_columnSize').reCalculate();
					$(window).on('resize',function(){
						window.clearTimeout(smallDelay);
						smallDelay = window.setTimeout(function () {
							EUTHEM.basicElements.fixMiddleCarousel( $testimonial );
						}, 300);
					});
				}

				$testimonial.css('visibility','visible');

			});
		},
		flexibleCarousel: function(){

			var $element = $('.eut-flexible-carousel-element');

			$element.each(function(){

				var $carousel = $(this),
					$nextNav = $carousel.parents('.eut-flexible-carousel').find('.eut-carousel-next'),
					$prevNav = $carousel.parents('.eut-flexible-carousel').find('.eut-carousel-prev'),
					sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000,
					pagination = $carousel.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400,
					autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false,
					loop = true,
					itemNum = parseInt( $carousel.attr('data-items')),
					tabletLandscapeNum = $carousel.attr('data-items-tablet-landscape') ? parseInt( $carousel.attr('data-items-tablet-landscape')) : 4,
					tabletPortraitNum = $carousel.attr('data-items-tablet-portrait') ? parseInt( $carousel.attr('data-items-tablet-portrait')) : 2,
					mobileNum = $carousel.attr('data-items-mobile') ? parseInt( $carousel.attr('data-items-mobile')) : 1,
					gap = $carousel.parents('.eut-flexible-carousel').hasClass('eut-with-gap') ? 30 : 0,
					padding = $carousel.parents('.eut-flexible-carousel').hasClass('eut-with-gap') && $carousel.parents('.eut-section').hasClass('eut-fullwidth') ? 30 : 0;

				if ( $carousel.find('.eut-flexible-carousel-element').length == 1 ) {
					loop = false;
				}

				// Carousel Init
				$carousel.owlCarousel({
					items : 1,
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					responsive : {
						0 : {
							items : mobileNum
						},
						768 : {
							items : tabletPortraitNum
						},
						1024 : {
							items : tabletLandscapeNum
						},
						1200 : {
							items : itemNum
						}
					},
					margin : gap,
					stagePadding : padding,
					autoHeight : autoHeight,
					itemClass : 'eut-carousel-item-wrapper'
				});

				// Fixed for Carousel middle content
				if( $carousel.parents('.eut-section').hasClass('eut-middle-content') ){
					var smallDelay;
					EUTHEM.basicElements.fixMiddleCarousel( $carousel );
					$carousel.parents('.eut-section').data('plugin_columnSize').reCalculate();
					$(window).on('resize',function(){
						window.clearTimeout(smallDelay);
						smallDelay = window.setTimeout(function () {
							EUTHEM.basicElements.fixMiddleCarousel( $carousel );
						}, 300);
					});
				}

				$carousel.css('visibility','visible');

				// Go to the next item
				$nextNav.on('click',function(){
					$carousel.trigger('next.owl.carousel');
				})
				// Go to the previous item
				$prevNav.on('click',function(){
					$carousel.trigger('prev.owl.carousel');
				})

			});
		},
		carousel: function(){

			var $element = $('.eut-carousel-element');

			$element.each(function(){
				var $carousel = $(this),
					$nextNav = $carousel.parents('.eut-carousel').find('.eut-carousel-next'),
					$prevNav = $carousel.parents('.eut-carousel').find('.eut-carousel-prev'),
					sliderSpeed = ( parseInt( $carousel.attr('data-slider-speed') ) ) ? parseInt( $carousel.attr('data-slider-speed') ) : 3000,
					pagination = $carousel.attr('data-pagination') != 'no' ? true : false,
					paginationSpeed = ( parseInt( $carousel.attr('data-pagination-speed') ) ) ? parseInt( $carousel.attr('data-pagination-speed') ) : 400,
					autoHeight = $carousel.attr('data-slider-autoheight') == 'yes' ? true : false,
					autoPlay = $carousel.attr('data-slider-autoplay') != 'no' ? true : false,
					sliderPause = $carousel.attr('data-slider-pause') == 'yes' ? true : false,
					loop = $carousel.attr('data-slider-loop') != 'no' ? true : false,
					itemNum = parseInt( $carousel.attr('data-items')),
					tabletLandscapeNum = $carousel.attr('data-items-tablet-landscape') ? parseInt( $carousel.attr('data-items-tablet-landscape')) : 3,
					tabletPortraitNum = $carousel.attr('data-items-tablet-portrait') ? parseInt( $carousel.attr('data-items-tablet-portrait')) : 3,
					mobileNum = $carousel.attr('data-items-mobile') ? parseInt( $carousel.attr('data-items-mobile')) : 1,
					gap = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0,
					padding = $carousel.parents('.eut-carousel').hasClass('eut-with-gap') && $carousel.parents('.eut-section').hasClass('eut-fullwidth') && !isNaN( $carousel.data('gutter-size') ) ? Math.abs( $carousel.data('gutter-size') ) : 0;

				if ( $carousel.find('.eut-carousel-item').length == 1 ) {
					loop = false;
				}

				// Carousel Init
				$carousel.owlCarousel({
					loop : loop,
					autoplay : autoPlay,
					autoplayTimeout : sliderSpeed,
					autoplayHoverPause : sliderPause,
					smartSpeed : 500,
					dots : pagination,
					responsive : {
						0 : {
							items : mobileNum
						},
						768 : {
							items : tabletPortraitNum
						},
						1024 : {
							items : tabletLandscapeNum
						},
						1200 : {
							items : itemNum
						}
					},
					margin : gap,
					stagePadding : padding,
					itemClass : 'eut-carousel-item-wrapper'
				});

				// Fixed for Carousel middle content
				if( $carousel.parents('.eut-section').hasClass('eut-middle-content') ){
					var smallDelay;
					EUTHEM.basicElements.fixMiddleCarousel( $carousel );
					$carousel.parents('.eut-section').data('plugin_columnSize').reCalculate();
					$(window).on('resize',function(){
						window.clearTimeout(smallDelay);
						smallDelay = window.setTimeout(function () {
							EUTHEM.basicElements.fixMiddleCarousel( $carousel );
						}, 300);
					});
				}

				$carousel.css('visibility','visible');

				// Go to the next item
				$nextNav.on('click',function(){
					$carousel.trigger('next.owl.carousel');
				})
				// Go to the previous item
				$prevNav.on('click',function(){
					$carousel.trigger('prev.owl.carousel');
				})

			});
		},
		fixMiddleCarousel : function( $element ){
			$element.css({ 'width' : '0' });
			var $column = $element.parents('.eut-column-wrapper'),
				columnW = $column.width() - 1,
				owl = $element.data('owlCarousel');
			$element.css({ 'width' : columnW });
			owl.onResize();
		},
		advancedPromo: function(){
			var $item = $('.eut-expandable-info');
			$item.each(function(){
				var $that         = $(this),
					$wrapper      = $that.parents('.eut-section'),
					$content      = $that.find('.eut-expandable-info-content'),
					paddingTop    = parseInt( $wrapper.css('padding-top') ),
					paddingBottom = parseInt( $wrapper.css('padding-bottom') );

				$wrapper.addClass('eut-pointer-cursor');
				$wrapper.on('click',function(){

					var headerHeight   = $('#eut-header').data('sticky') != 'none' ? $('#eut-main-header').outerHeight() : 0,
						fieldBarHeight = $('.eut-fields-bar').length ? $('.eut-fields-bar').outerHeight() : 0,
						offset         = $(this).offset().top,
						distance       = offset - ( headerHeight + fieldBarHeight );

					if( $content.is(":visible") ){
						$content.slideUp( 600, function(){
							$content.removeClass('show');
						});
					} else {

						$('html,body').animate({
							scrollTop: distance
						}, 600,function(){
							$content.slideDown( function(){
								$content.addClass('show');
								return;
							});
						});
					}
				});
				$wrapper.mouseenter(function() {
					$(this).css({ 'padding-top' : paddingTop + 40, 'padding-bottom' : paddingBottom + 40 });
				});
				$wrapper.mouseleave(function() {
					$(this).css({ 'padding-top' : paddingTop, 'padding-bottom' : paddingBottom });
				});
			});
		},
		imageText: function(){
			var $el = $('.eut-image-text.eut-layout-1');
			if( !$el.length > 0 ) return;
			$el.each(function(){
				var $that = $(this),
					$img = $that.find('img'),
					$cont = $that.find('.eut-content');
				$img.css({ 'padding-top' : '', 'padding-bottom' : '' });
				$cont.css({ 'padding-top' : '', 'padding-bottom' : '' });
				$that.css('visibility','hidden');
				$img.imagesLoaded( function() {
					var imgHeight = $img.height(),
						contHeight = $cont.height(),
						space = parseInt( (imgHeight - contHeight)/2 );
					if( $(window).width() + scrollBarWidth >= mobileScreen ) {
						if( imgHeight < contHeight ){
							space = parseInt( (contHeight - imgHeight)/2 );
							$img.css({ 'padding-top' : space, 'padding-bottom' : space });
						} else {
							$cont.css({ 'padding-top' : space, 'padding-bottom' : space });
						}
					}
					$that.css('visibility','visible');
				});

			});
		},
		imageTextParallax: function(){
			var $el = $('.eut-image-text.eut-layout-2'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, false],
					mobileL : [767, false]
				});
			});
		},
		doubleImageText: function(){
			var $el = $('.eut-double-image-text'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		portfolioParallax: function(){
			var $el = $('.eut-portfolio-fildisi-style'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		teamParallax: function(){
			var $el = $('.eut-team.eut-layout-2'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		testimonialParallax: function(){
			var $el = $('.eut-testimonial.eut-layout-2'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		sliderParallax: function(){
			var $el = $('.eut-content-slider.eut-layout-2'),
				$paraller = $el.find('.eut-paraller');

			imagesLoaded( $el, function() {
				$paraller.paraller({
					wrapper : '.eut-paraller-wrapper',
					invert : false,
					tabletL : [1200, true],
					tabletP : [1023, true],
					mobileL : [767, false]
				});
			});
		},
		iconBox: function(){
			var $iconBox = $('.eut-box-icon.eut-advanced-hover');
			if( isMobile.any() ) {
				$iconBox.css({'visibility' : 'visible'});
				return false;
			}
			$iconBox.each(function(){
				var $that = $(this),
					$text = $that.find('p'),
					$column = $that.parents('.eut-column'),
					space = 0,
					resize = false;

				setup();
				$(window).smartresize(setup);

				function updateParams(){
					space = $text.outerHeight();
				}

				function resetIcon(){
					$that.css({ 'top' : '' });
					$text.css({ 'opacity' : 1, 'bottom' : '' });
				}

				function setup(){
					if(!resize){
						resize = true;

						resetIcon();
						updateParams();

						$column.css({ 'overflow' : 'hidden' });
						$that.css({ 'top' : space, 'visibility' : 'visible' });
						$text.css({ 'opacity' : 0, 'position' : 'relative', 'bottom' : '-120%' });

						resize = true;
					}
				}

				$column.hover(function(){
					$that.stop( true, true ).animate({
						'top' : 0
					},400, 'easeOutBack');
					$text.stop( true, true ).delay( 100 ).animate({
						'opacity' : 1,
						'bottom' : 0
					},600, 'easeOutBack');
				},function(){
					$that.stop( true, true ).animate({
						'top' : space
					},500, 'easeOutBack');
					$text.stop( true, true ).animate({
						'opacity' : 0,
						'bottom' : '-120%'
					},400, 'easeOutBack');
				});

				function resize(){
					var delay;
					window.clearTimeout(delay);
					delay = window.setTimeout(function() {
						setup();
					}, 200);
				}

			});

		},
		messageBox: function(){
			var infoMessage = $('.eut-message'),
			closeBtn = infoMessage.find($('.eut-close'));
			closeBtn.on('click',function(){
				$(this).parent().slideUp(150);
			});
		},
		wooProduct: function(){
			var $item   = $('.eut-product-item'),
				$addBtn = $item.find('.add_to_cart_button');
			$addBtn.on('click',function(){
				$(this).parents('.eut-product-item').addClass('eut-product-added');
			});
		},
		wooProductZoom: function(){
			if( !isMobile.any() ){
				if ( $('.eut-product-image.easyzoom').length ) {
					var $easyzoom = $('.eut-product-image.easyzoom').easyZoom();
					var api = $easyzoom.data('easyZoom');
					$( ".variations_form" ).on( 'woocommerce_variation_has_changed', function( event, variation ){
						var imageZoom = $('.eut-product-image .woocommerce-main-image').attr('href');
						var $productImg = $('.eut-product-image .woocommerce-main-image img');
						var imageSrc = $productImg.attr('src');
						api.swap( imageSrc , imageZoom );
					} );
				}
			}
		},
		animAppear: function(){
			if( bodyLoader || $('body').hasClass('page-template-template-full-page') ){
				return;
			}
			if( isMobile.any() && !deviceAnimAppear ) {
				$('.eut-animated-item').css('opacity',1);
			} else {
				$('.eut-animated-item').each(function() {
					var $that = $(this),
						timeDelay = $that.attr('data-delay');

					$that.appear(function() {
						setTimeout(function () {
							$that.addClass('eut-animated');
						}, timeDelay);
					},{accX: 0, accY: -150});
				});
			}
		},
		htmlVideoPlayWhenAppear: function(){
			var $video = $('.eut-embed-video');
			$video.each(function(){
				var $that = $(this);
				$that[0].pause();
				$that.appear(function(){
					if( $that[0].autoplay ){
						$that[0].play();
					}
				},{accX: 0, accY: -150});
			});
		},
		accordionToggle: function(){
			$('.eut-accordion-wrapper.eut-action-toggle li .eut-title-wrapper').on('click',function(){
				var $that = $(this);
				$that
					.toggleClass('active')
					.next().slideToggle(350);
				if( $(this).parent().find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
				if( $(this).parent().find('.eut-blog-leader.eut-fildisi-style').length ) {
					EUTHEM.leaderPostSize.init();
				}
			});
			$('.eut-accordion-wrapper.eut-action-accordion li .eut-title-wrapper').on('click',function(){
				var $that = $(this);
				$that
					.toggleClass('active').next().slideToggle(350)
					.parent().siblings().find('.eut-title-wrapper').removeClass('active')
					.next().slideUp(350);
				if( $(this).parent().find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
				if( $(this).parent().find('.eut-blog-leader.eut-fildisi-style').length ) {
					EUTHEM.leaderPostSize.init();
				}
			});
		},
		tabs: function(){
			$('.eut-tab-title').on('click',function(){
				var $that = $(this),
					contentId = $that.data('rel');
				$that.parents('.eut-tab').find('.eut-tab-title').removeClass('active');
				$that.addClass('active');
				$that.parents('.eut-tab').find('.eut-tab-content').removeClass('active');
				$that.parents('.eut-tab').find(contentId).addClass('active');
				if( $that.parents('.eut-tab').find('.eut-tab-content').find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
				if( $that.parents('.eut-tab').find('.eut-tab-content').find('.eut-blog-leader.eut-fildisi-style').length ) {
					EUTHEM.leaderPostSize.init();
				}
			});
		},
		vcAccordion: function(){
			var $target = $('.vc_tta-accordion').find('a[data-vc-accordion]'),
				$panel = $('.vc_tta-panel');
			if( $panel.find('.eut-isotope').length ) {
				setTimeout(function(){
					EUTHEM.isotope.init();
				},100);
			}
			$target.on('click',function(){
				if( $panel.find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
			});
		},
		vcTab: function(){
			var $target = $('.vc_tta-tabs').find('a[data-vc-tabs]'),
				$panel = $('.vc_tta-panel');
			if( $panel.find('.eut-isotope').length ) {
				setTimeout(function(){
					EUTHEM.isotope.init();
				},100);
			}
			$target.on('click',function(){
				if( $panel.find('.eut-isotope').length ) {
					setTimeout(function(){
						EUTHEM.isotope.init();
					},100);
				}
			});
		},
		productSocials: function(){
			var $socials = $('.eut-product-social'),
				$item    = $socials.find('li');
			if( !$socials.length ) return;

			$socials.appear(function() {
				$item.each(function(i,n){
					var $this = $(this);
					setTimeout(function(){
						$this.addClass('eut-animated');
					},150 * i);
				});
			},{accX: 0, accY: -50});
		},
		countdown: function(){
			$('.eut-countdown').each(function() {
				var $this        = $(this),
					finalDate    = $this.data('countdown'),
					numbersSize  = $this.data('numbers-size'),
					textSize     = $this.data('text-size'),
					numbersColor = $this.data('numbers-color'),
					textColor    = $this.data('text-color'),
					countdownItems = '',
					text = '',
					countdownFormat = $this.data('countdown-format').split('|');

				$.each( countdownFormat, function( index, value ) {
					switch (value) {
						case 'w':
							text = fildisi_eutf_main_data.string_weeks;
							break;
						case 'D':
						case 'd':
						case 'n':
							text = fildisi_eutf_main_data.string_days;
							break;
						case 'H':
							text = fildisi_eutf_main_data.string_hours;
							break;
						case 'M':
							text = fildisi_eutf_main_data.string_minutes;
							break;
						case 'S':
							text = fildisi_eutf_main_data.string_seconds;
							break;
						default:
							text = '';
					}
					countdownItems += '<div class="eut-countdown-item">'
					countdownItems += '<div class="eut-number eut-' + numbersSize + ' eut-text-' + numbersColor + '">%' + value + '</div>';
					countdownItems += '<span class="eut-' + textSize + ' eut-text-' + textColor + '">' + text + '</span>';
					countdownItems += '</div>';

				});

				$this.countdown(finalDate, function(event) {
					$this = $(this).html(event.strftime( countdownItems ));
				});
			});
		},
		hovers: function(){
			var $hoverItem = $('.eut-image-hover');
			if( isMobile.any() && 0 == fildisi_eutf_main_data.device_hover_single_tap ) {
				var touchevent = 'touchend';
				if( $hoverItem.parent().parent().hasClass('eut-carousel-item') ) {
					touchevent = 'touchstart';
				}
				$hoverItem.on(touchevent, function(e) {
					var $item = $(this);
					if ( !$item.hasClass('hover') ) {
						$item.addClass('hover');
						$hoverItem.not(this).removeClass('hover');
						e.preventDefault();
					}
				});
				$(document).on('touchstart touchend', function(e) {
					if ( !$hoverItem.is(e.target) && $hoverItem.has(e.target).length === 0 ) {
						$hoverItem.removeClass('hover');
					}
				});
			} else {
				$hoverItem.unbind('click');
				$hoverItem.unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
					$(this).toggleClass('hover');
				});
			}
		}
	}

	// # Parallax Section
	// ============================================================================= //
	EUTHEM.parallaxSection = {
		init : function( section ){
			var $section = $(section);
			imagesLoaded( $(section), function() {
				$(section).bgParallax();
			});
		}
	};

	// # Section Settings
	// ============================================================================= //
	EUTHEM.sectionSettings = {
		init: function(){

			if( !$('#eut-sidebar').length > 0 ) return;

			var section      = '#eut-content .eut-section',
				windowWidth  = $(window).width(),
				themeWidth   = $('#eut-theme-wrapper').width(),
				wrapperWidth = $('.eut-content-wrapper').width(),
				contentWidth = $('#eut-main-content').width(),
				sidebarWidth = $('#eut-sidebar').outerWidth(),
				space        = (themeWidth - wrapperWidth)/2,
				sidebarSpace = space + wrapperWidth - contentWidth;


			$(section).each(function(){
				var $section = $(this);
				if( $section.hasClass('eut-fullwidth-background') ){
					fullBg($section);
				}
				if( $section.hasClass('eut-fullwidth') ){
					fullElement($section);
				}

			});

			function fullBg( section ) {
				if( windowWidth + scrollBarWidth >= tabletPortrait ) {
					if( $('.eut-right-sidebar').length ) {
						section.css({ 'visibility': 'visible', 'padding-left':space, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
					}
					else {
						section.css({ 'visibility': 'visible', 'padding-left':sidebarSpace, 'padding-right': space, 'margin-left': -sidebarSpace, 'margin-right': -space});
					}
				} else {
					section.css({ 'visibility': 'visible', 'padding-left':'', 'padding-right': '', 'margin-left': '', 'margin-right': ''});
				}

			}

			function fullElement( section ) {
				if( windowWidth + scrollBarWidth >= tabletPortrait ) {
					if( $('.eut-right-sidebar').length ) {
						section.css({ 'visibility': 'visible', 'padding-left':0, 'padding-right': sidebarSpace, 'margin-left': -space, 'margin-right': -sidebarSpace});
					}
					else {
						section.css({ 'visibility': 'visible', 'padding-left':sidebarSpace, 'padding-right': 0, 'margin-left': -sidebarSpace, 'margin-right': -space});
					}
				} else {
					section.css({ 'visibility': 'visible', 'padding-left':'', 'padding-right': '', 'margin-left': -space, 'margin-right': -space});
				}
			}
		}
	};

	// # Isotope
	// ============================================================================= //
	EUTHEM.isotope = {

		init: function(){
			var $selector = $('.eut-isotope');
			if( !$selector.length ) return;
			$selector.each(function(){
				var $element = $(this);
				EUTHEM.isotope.settings($element);
			});

		},
		settings: function($element){
			var $container   = $element.find('.eut-isotope-container'),
				$curCategory = $element.find('.eut-current-category'),
				$isotopItem  = $container.find('.eut-isotope-item'),
				layout       = $element.data('layout') !== '' ? $element.data('layout') : 'fitRows',
				columnWidth  = $element.hasClass('eut-portfolio') ? '.eut-image-square' : '',
				dataSpinner  = $element.data('spinner'),
				gap          = $element.hasClass('eut-with-gap') && !isNaN( $element.data('gutter-size') ) ? Math.abs( $element.data('gutter-size') )/2 : 0,
				isOriginLeft = $('body').hasClass('rtl') ? false : true;

			var offset       = $element.parents('.eut-section').hasClass('eut-fullwidth') ? -(gap * 2) : gap * 2,
				windowWidth  = $(window).width() + scrollBarWidth,
				wrapperW, columns, columnW, containerW;

			if( $element.hasClass('eut-with-gap') && $element.parents('.eut-section').hasClass('eut-fullwidth') ) {
				$element.css({'padding-left' : gap*2, 'padding-right' : gap*2 });
			}

			// Add Spinner
			if( dataSpinner == 'yes' ) {
				addSpinner();
			}
			// Filters
			filter();

			var resizing = false,
				initIso  = false,
				smallDelay;

			updateParams( initIsotope );

			if( !isMobile.any() ) {
				$(window).smartresize(updateParams);
			} else {
				$(window).on("orientationchange",function(){
					setTimeout(updateParams, 100);
				});
			}

			$('.eut-modal-popup').on( "eut_relayout_isotope", function() {
				updateParams();
			});

			function updateParams(callback){
				if( !resizing ) {
					resizing = true;
					windowWidth = $(window).width() + scrollBarWidth;
					wrapperW = $element.innerWidth() -2;
					columns = setColumns();
					columnW = ( wrapperW + offset ) / columns;
					columnW = (columnW % 1 !== 0) ? Math.ceil(columnW) : columnW;
					containerW = columnW * columns;

					itemSize();
					containerSize();
					if( callback && !initIso ) callback();

					if( initIso ) {
						window.clearTimeout(smallDelay);
						smallDelay = window.setTimeout( function(){
							// Equal Columns
							if( layout === 'fitRows' && gridEqual ) {
								gridEqualColumns();
							}
							if( $container.parents('.eut-section').hasClass('eut-custom-height') ){
								$container.parents('.eut-section').data('plugin_columnSize').reCalculate();
							}
						}, 200 );
					}

					$container.isotope('layout');
					resizing = false;
				}
			}

			function setColumns(){
				var columns = {
						largeS   : $element.data('columns-large-screen'),
						desktop  : $element.data('columns'),
						tabletL  : $element.data('columns-tablet-landscape'),
						tabletP  : $element.data('columns-tablet-portrait'),
						mobile  : $element.data('columns-mobile')
					};
				$element.removeClass('eut-isotope-column-5 eut-isotope-column-4 eut-isotope-column-3 eut-isotope-column-2 eut-isotope-column-1');
				if ( windowWidth > largeScreen ) {
					columns = columns.largeS;
				} else if ( windowWidth > tabletLandscape && windowWidth <= largeScreen ) {
					columns = columns.desktop;
				} else if ( windowWidth > tabletPortrait && windowWidth <= tabletLandscape ) {
					columns = columns.tabletL;
				} else if ( windowWidth > mobileScreen && windowWidth <= tabletPortrait ) {
					columns = columns.tabletP;
				} else {
					columns = columns.mobile;
				}

				$element.addClass('eut-isotope-column-' + columns);
				return columns;
			}

			function itemSize(){

				$isotopItem.css({ 'padding-left' : gap, 'padding-right' : gap, 'margin-bottom' : gap * 2, 'width' : columnW });
				// Item Width * 2
				if( columns != 1 ) {
					$container.find('.eut-image-landscape').css({ 'width': columnW * 2 }).find('.eut-media').css({ 'height': columnW - ( gap * 2 ) });
					$container.find('.eut-image-portrait').css({ 'width': columnW }).find('.eut-media').css({ 'height': ( columnW * 2 ) - ( gap * 2 ) });
				}

				// Item Column 2
				if( columns == 2 ) {
					if( windowWidth > mobileScreen ){
						$container.find('.eut-image-landscape').css({ 'width': columnW  }).find('.eut-media').css({ 'height': ( columnW / 2 ) - ( gap * 2 ) });
					} else {
						$container.find('.eut-image-landscape').css({ 'width': columnW  }).find('.eut-media').css({ 'height': columnW - ( gap * 2 ) });
					}
				}

				// Item Column 1
				if( columns == 1 ) {
					$container.find('.eut-image-landscape').css({ 'width': columnW  }).find('.eut-media').css({ 'height': '' });
					$container.find('.eut-image-portrait').css({ 'width': columnW }).find('.eut-media').css({ 'height': '' });
				}
			}

			function containerSize(){
				$container.css({'margin-left' : - gap, 'margin-right' : - gap, 'width' : containerW });
			}

			function initIsotope(){
				$container.isotope({
					itemSelector: '.eut-isotope-item',
					layoutMode: layout,
					animationEngine : 'jquery',
					masonry: {
						columnWidth: columnWidth
					},
					resize: false,
					isOriginLeft: isOriginLeft
				});
				// layout Isotope after each image loads
				$container.imagesLoaded('always',function(){
					$container.isotope('layout');
					// Spinner
					var dataSpinner = $container.parent().data('spinner');
					if( dataSpinner == 'yes' ) {
						setTimeout(function() {
							removeSpinner();
						},2000);
					} else {
						$container.css({'opacity': 1});
						// Isotope Animation
						if( !isMobile.any() ){
							animation($container);
						} else {
							$container.find('.eut-isotope-item-inner').addClass('eut-animated');
						}
					}
				});

				initIso = true;
			}

			function addSpinner(){
				var $spinner = $('<div class="eut-spinner"></div>');
				$spinner.appendTo( $element );
			}

			function removeSpinner(){
				$element.find('.eut-spinner').fadeOut(600,function(){
					$container.css({'opacity': 1});
					animation();
				});
			}

			function animation(){
				var cnt = 1,
					itemAppeared = 1;
				$isotopItem.appear(function() {
					var $this = $(this),
						delay = 200 * cnt++;

					setTimeout(function () {
						itemAppeared++;
						if( itemAppeared == cnt ){
							cnt = 1;
						}
						$this.find('.eut-isotope-item-inner').addClass('eut-animated');
					}, delay);
				});
			}

			function filter(){
				$element.find('.eut-filter li').on('click',function(){
					var $filter      = $(this),
						selector     = $filter.attr('data-filter'),
						title        = $filter.html(),
						$curCategory = $element.find('.eut-current-category');

					if( $curCategory.length > 0 ){
						$curCategory.find('span').html( title );
					}

					$container.isotope({
						filter: selector
					});

					// Go to top
					EUTHEM.pageSettings.linkGoToTop( $filter.parent(), 300, 30 );

					$(this).addClass('selected').siblings().removeClass('selected');
				});
			}

			function gridEqualColumns(){
				var $elContent = $container.find('.eut-blog-item-inner'),
					heightArr = [],
					columnMaxH = 0;

				// Reset Height
				$container.find('.eut-isotope-item .eut-post-content').css('height','auto');
				$container.find('.eut-isotope-item .eut-blog-item-inner').css('height','auto');
				$container.find('.eut-isotope-item .eut-post-meta-wrapper').removeClass('eut-bottom');

				$elContent.each(function(){
					var $that = $(this),
						height = $that.outerHeight();
					heightArr.push( height );
				});

				columnMaxH = heightArr.length > 0 ? Math.max.apply(Math, heightArr) : 0;

				$container.find('.eut-isotope-item .eut-blog-item-inner').css('height',columnMaxH);
				$container.find('.eut-isotope-item .eut-post-meta-wrapper').addClass('eut-bottom');
				$container.find('.eut-isotope-item.eut-style-2').addClass('eut-middle');

				$container.isotope('layout');
			}
		},
		noIsoFilters: function() {
			var $selector = $('.eut-non-isotope');
			$selector.each(function(){
				var $that = $(this);
				$that.find('.eut-filter li').on('click',function(){
					var selector = $(this).attr('data-filter');
					if ( '*' == selector ) {
						$that.find('.eut-non-isotope-item').fadeIn('1000');
					} else {
						$that.find('.eut-non-isotope-item').hide();
						$that.find(selector).fadeIn('1000');
					}
					$(this).addClass('selected').siblings().removeClass('selected');
				});
			});
		}
	};

	// # Social Bar For Post
	// ============================================================================= //
	EUTHEM.socialBar = {
		init : function(){
			var $bar = $('#eut-socials-bar');
			if( !$bar.length > 0 ) {
				return;
			}
			if( isMobile.any() ) {
				$bar.addClass('eut-no-animation');
				return;
			}
			var posTop       = $bar.offset().top,
				scroll       = $(window).scrollTop(),
				windowHeight = $(window).height(),
				offset       = ( $bar.offset().top - windowHeight ) + 50;

			if( scroll > offset ) {
				this.showSocials();
			} else {
				this.hideSocials();
			}
		},
		showSocials : function(){
			var $item = $('#eut-socials-bar').find('ul.eut-socials li a'),
				i = 0;
			$item.each(function(){
				var $that = $(this);
				i++;
				setTimeout(function () {
					$that.addClass('show');
				}, i * 200 );
			});
		},
		hideSocials : function(){
			var $item = $('#eut-socials-bar').find('ul.eut-socials li a');
			$item.removeClass('show');
		}
	};


	// # Scroll Direction
	// ============================================================================= //
	EUTHEM.scrollDir = {
		init: function(){
			var scroll = $(window).scrollTop();
			if (scroll > lastScrollTop){
				lastScrollTop = scroll;
				return { direction : 'scrollDown'  }
			} else {
				lastScrollTop = scroll;
				return { direction : 'scrollUp'  }
			}

			lastScrollTop = scroll;
		}
	};

	// # Full Page
	// ============================================================================= //
	EUTHEM.fullPage = {
		init: function(){
			var $fPage = $('#eut-fullpage');
			if( !$fPage.length > 0 ) return;
				var $section = $fPage.find('.eut-row-section');
				var deviceNavigation = true;
				var deviceAutoScrolling = true;
				var scrollOverflow = true;
				var fitToSection = true;
				var speed = $fPage.data('scroll-speed');
				var deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;
				var lockAnchors = $fPage.data('lock-anchors') == 'yes' ? true : false;
				var loop = $fPage.data('scroll-loop');
				var loopTop = false;
				var loopBottom = false;
				if ( 'both' == loop || 'top' == loop ) {
					loopTop = true;
				}
				if ( 'both' == loop || 'bottom' == loop ) {
					loopBottom = true;
				}

				if( isMobile.any() && !deviceFullPageEnable ) {
					deviceNavigation = false;
					deviceAutoScrolling = false;
					scrollOverflow = false;
					fitToSection = false;
					$section.find('.eut-animated-item').addClass('eut-animated');
				}

				var navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function(){
					return $(this).data('anchor-tooltip').toString();
				}).get();

			$fPage.fullpage({
				navigation: deviceNavigation,
				navigationPosition: 'right',
				navigationTooltips: navigationAnchorTooltips,
				sectionSelector: $section,
				css3: true,
				scrollingSpeed: speed,
				autoScrolling : deviceAutoScrolling,
				fitToSection : fitToSection,
				lockAnchors : lockAnchors,
				loopTop : loopTop,
				loopBottom : loopBottom,
				scrollOverflow: scrollOverflow,
				afterLoad: function(anchorLink, index){

					var sectionHeaderColor = $($section[index-1]).attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;

					$section.find('.fp-tableCell').css('visibility','visible');

					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#fp-nav').removeClass('eut-light eut-dark').addClass(color);

					EUTHEM.scrollingPageAnimations.addAnim( $section, index );
				},
				afterRender: function(){
					$('.eut-bg-video').each(function(){
						var $that = $(this),
							$video = $that.find('video');
						if( $video.length ){
							$video[0].play();
						}
						EUTHEM.pageSettings.resizeVideoBgElement( $that );
					});

				},
				onLeave: function(index){
					if( !isMobile.any() ) {
						EUTHEM.scrollingPageAnimations.removeAnim( $section, index, speed );
					}
				}
			});
		}
	};

	// # Pilling Page
	// ============================================================================= //
	EUTHEM.pillingPage = {
		init: function(){
			var $fPage = $('#eut-pilling-page');
			if( !$fPage.length > 0 ) return;
				var $section = $fPage.find('.eut-row-section');
				var deviceFullPageEnable = $fPage.data('device-scrolling') == 'yes' ? true : false;
				var lockAnchors = $fPage.data('lock-anchors') == 'yes' ? true : false;
				var direction = $fPage.data('scroll-direction');
				var loop = $fPage.data('scroll-loop');
				var speed = $fPage.data('scroll-speed');
				var loopTop = false;
				var loopBottom = false;
				if ( 'both' == loop || 'top' == loop ) {
					loopTop = true;
				}
				if ( 'both' == loop || 'bottom' == loop ) {
					loopBottom = true;
				}

				if( isMobile.any() && !deviceFullPageEnable ) {
					$fPage.addClass('eut-disable-on-device');
					$section.find('.eut-animated-item').addClass('eut-animated');
					$section.children().wrap('<div class="pp-tableCell"></div>');
					$('.eut-row-section').each(function(){
						if ( $(this).attr('data-anchor').length ) {
							$(this).attr('id',  $(this).attr('data-anchor') );
						}
					});
					return;
				}

				var navigationAnchorTooltips = $('[data-anchor-tooltip]').map(function(){
					return $(this).data('anchor-tooltip').toString();
				}).get();


				var navigationAnchors = [];
				if ( !lockAnchors ) {
					navigationAnchors  = $('[data-anchor]').map(function(){
						return $(this).data('anchor').toString();
					}).get();
				}

				$('html').addClass('fp-enabled');

			$fPage.pagepiling({
				sectionSelector: $section,
				css3: true,
				scrollingSpeed: speed,
				anchors: navigationAnchors,
				direction: direction,
				lockAnchors : lockAnchors,
				loopTop : loopTop,
				loopBottom : loopBottom,
				navigation: {
					'tooltips': navigationAnchorTooltips
				},
				afterLoad: function(anchorLink, index){

					var sectionHeaderColor = $($section[index-1]).attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;
					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#pp-nav').removeClass('eut-light eut-dark').addClass(color);

					EUTHEM.scrollingPageAnimations.addAnim( $section, index );
				},
				afterRender: function(){
					var sectionHeaderColor = $($section[0]).attr('data-header-color');
					var color = 'eut-' + sectionHeaderColor;

					$('.eut-bg-video').each(function(){
						var $that = $(this),
							$video = $that.find('video');
						if( $video.length ){
							$video[0].play();
						}
						EUTHEM.pageSettings.resizeVideoBgElement( $that );
					});
					// Set Header Color
					if( !$('#eut-main-header').hasClass('eut-header-side') ) {
						$('#eut-main-header').removeClass('eut-light eut-dark').addClass(color);
					}
					$('#pp-nav').removeClass('eut-light eut-dark').addClass(color);
					EUTHEM.scrollingPageAnimations.addAnim( $section, 1 );
				},
				onLeave: function(index){
					EUTHEM.scrollingPageAnimations.removeAnim( $section, index, speed );
				}
			});
		}
	};

	// # Scrolling Page Animations
	// ============================================================================= //
	EUTHEM.scrollingPageAnimations = {
		addAnim: function( section, index ){
			var $section = $(section[index-1]),
				$element = $section.find('.eut-animated-item');

			$element.each(function(){
				var $that = $(this),
					delay = $that.data('delay');
				setTimeout(function(){
					$that.addClass('eut-animated');
				},delay);
			});
		},
		removeAnim: function(section, index, speed){
			var $section = $(section[index-1]),
				$element = $section.find('.eut-animated-item');
			setTimeout(function(){
				$element.removeClass('eut-animated');
			},speed);
		}
	};

	// # Section Navigation
	// ============================================================================= //
	EUTHEM.sectionNav = {
		init: function(){

			var $content = $('#eut-content');

			// Check if content has class section-nav
			if( !$content.hasClass('eut-section-nav') ) return;

			var $themeWrapper = $('#eut-theme-wrapper');
			var $section = $('.eut-section[data-anchor]');
			var anchor;

			// Create Navigation List
			createList();

			var $navigation = $('#eut-section-nav');
			var $navItem = $('#eut-section-nav .eut-nav-item');
			var animate = false;

			// On Click Navigation Item
			$navItem.on('click', function(event){
				event.preventDefault();
				var $that = $(this);
				var link = $that.attr('href');
				var scrollTop = Math.abs($(window).scrollTop()) / 2;
				var speed = scrollTop < 1000 ? 1000 : scrollTop;
				var $target = $('.eut-section[data-anchor=' + link + ']');
				var headerHeight = $('#eut-header').data('sticky') != 'none' ? $('#eut-header').data('sticky-height') : 0;
				var targetTop = $target.offset().top - headerHeight + 1;

				$that.addClass('active').siblings().removeClass('active');

				smoothScroll( targetTop, speed );

			});

			updateNav();
			$(window).on('scroll', function(){
				if( !animate ){
					updateNav();
				}
			});

			function createList(){
				$('<div id="eut-section-nav"><div class="eut-inner-nav"></div></div>').appendTo($themeWrapper);
				$section.each(function(){
					var $that = $(this);
					var title = $that.data('anchor-tooltip');
					anchor = $that.data('anchor');
					var $listEl = $('<a class="eut-nav-item eut-small-text" href="' + anchor + '">' + title + '</a>');
					if( title ) {
						$listEl.prependTo( $('#eut-section-nav .eut-inner-nav') );
					}
				});
			}

			function updateNav(){
				$section.each(function(){
					var $that = $(this);
					if ( ( $that.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $that.offset().top + $that.outerHeight() - $(window).height()/2 > $(window).scrollTop() ) ) {
						$navigation.find('a[href=' + $that.data('anchor') + ']').addClass('active');
					} else {
						$navigation.find('a[href=' + $that.data('anchor') + ']').removeClass('active');
					}
				});
			}

			function smoothScroll(target, speed){
				if( !animate ) {
					animate = true;
					$('html, body').animate({scrollTop: target}, speed, 'easeInOutCubic',function(){
						animate = false;
					});
					$("html, body").bind("scroll mousedown DOMMouseScroll mousewheel keyup", function(){
						$('html, body').stop();
						animate = false;
					});
				}
			}
		}
	};

	// # Global Variables
	// ============================================================================= //
	var bodyLoader = false;
	var largeScreen = 2048;
	var tabletLandscape = 1200;
	var tabletPortrait = 1023;
	var mobileScreen = 767;
	var lastScrollTop = 0;
	var wpBarHeight = $('.eut-body').hasClass('admin-bar') ? 32 : 0;
	var $videoBg = $('.eut-bg-video');
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	// Animation support & prefixing
	var t = document.body || document.documentElement;
	var s = t.style;
	var tSupport = s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
	var property = [ 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ];
	var prefix;
	for( var i in property ){
		if( s[ property[ i ] ] !== undefined ){
			prefix = '-' + property[ i ].replace( 'Transform', '' ).toLowerCase();
		}
	}
	var transform = prefix + '-transform';

	// # Scrollbar Width
	// ============================================================================= //
	var parent, child, scrollBarWidth;

	if( scrollBarWidth === undefined ) {
		parent          = $('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo('body');
		child           = parent.children();
		scrollBarWidth  = child.innerWidth()-child.height(99).innerWidth();
		parent.remove();
	};



	$(document).ready(function(){ EUTHEM.documentReady.init(); });
	$(window).smartresize(function(){ EUTHEM.documentResize.init(); });
	$(window).on('load',function () { EUTHEM.documentLoad.init(); });
	$(window).on('scroll', function() { EUTHEM.documentScroll.init(); });

})(jQuery);