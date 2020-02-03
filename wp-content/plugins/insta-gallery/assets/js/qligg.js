(function ($) {
//https://w3bits.com/flexbox-masonry/
  var swiper_index = 0, $swipers = {};

  // Ajax load
  // ---------------------------------------------------------------------------

  function qligg_load_item_images($item, next_max_id) {

    var $wrap = $('.insta-gallery-list', $item),
            $spinner = $('.insta-gallery-spinner', $item),
            options = $item.data('feed');

    $.ajax({
      url: qligg.ajax_url,
      type: 'post',
      timeout: 30000,
      data: {
        action: 'qligg_load_item_images',
        next_max_id: next_max_id,
        feed: options
      },
      beforeSend: function () {
        $spinner.show();
      },
      success: function (response) {

        if (response.success !== true) {
          $wrap.append($(response.data));
          $spinner.hide();
          return;
        }
        var $images = $(response.data);

        $wrap.append($images).trigger('qligg.loaded', [$images]);

      },
      complete: function () {
      },
      error: function (jqXHR, textStatus) {
        $spinner.hide();
        console.log(textStatus);
      }
    });

  }

  // Images
  // ---------------------------------------------------------------------------

  $('.insta-gallery-feed').on('qligg.loaded', function (e, images) {

    var $item = $(e.delegateTarget),
            $wrap = $('.insta-gallery-list', $item),
            $spinner = $('.insta-gallery-spinner', $item),
            $button = $('.insta-gallery-button.load', $item),
            options = $item.data('feed'),
            total = $(images).length,
            loaded = 0;

    if (total) {
      $wrap.find('.insta-gallery-image').load(function (e) {
        loaded++;
        if (loaded >= total) {
          $wrap.trigger('qligg.imagesLoaded', [images]);
        }
      });
    }

    if (total < options.limit) {
      $spinner.hide();
      setTimeout(function () {
        $button.fadeOut();
      }, 300);
    }

  });

  // Spinner
  // ---------------------------------------------------------------------------

  $('.insta-gallery-feed').on('qligg.imagesLoaded', function (e) {

    var $item = $(e.delegateTarget),
            $spinner = $('.insta-gallery-spinner', $item);

    $spinner.hide();

  });

  // Gallery
  // ---------------------------------------------------------------------------

  $('.insta-gallery-feed[data-feed_layout=gallery]').on('qligg.imagesLoaded', function (e, images) {

    var $item = $(e.delegateTarget);

    $item.addClass('loaded');

    $(images).each(function (i, item) {
      setTimeout(function () {
        $(item).addClass('ig-image-loaded');
      }, 150 + (i * 30));

    });
  });

  // Carousel
  // ---------------------------------------------------------------------------

  $('.insta-gallery-feed[data-feed_layout=carousel]').on('qligg.imagesLoaded', function (e, images) {

    var $item = $(e.delegateTarget);

    $item.addClass('loaded');

    $(images).each(function (i, item) {
      //setTimeout(function () {
      $(item).addClass('ig-image-loaded');
      //}, 500 + (i * 50));

    });
  });

  $('.insta-gallery-feed[data-feed_layout=carousel]').on('qligg.imagesLoaded', function (e, images) {

    var $item = $(e.delegateTarget),
            $swiper = $('.swiper-container', $item),
            options = $item.data('feed');

    swiper_index++;

    $swipers[swiper_index] = new Swiper($swiper, {
      //direction: 'vertical',
      //wrapperClass: 'insta-gallery-list',
      //slideClass: 'insta-gallery-item',
      loop: true,
      autoHeight: true,
      observer: true,
      observeParents: true,
      spaceBetween: parseInt(options.spacing),
      slidesPerView: parseInt(options.carousel.slides),
      autoplay: options.carousel.autoplay ? {
        delay: parseInt(options.carousel.interval),
      } : false,
      pagination: {
        el: '.swiper-pagination',
        dynamicBullets: true,
        clickable: true,
        type: 'bullets',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        420: {
          slidesPerView: 1,
          spaceBetween: 2,
        },
        767: {
          slidesPerView: Math.min(2, options.carousel.slides)
        },
        1023: {
          slidesPerView: Math.min(3, options.carousel.slides)
        }
      }
    });
  });

  // Masonry
  // ---------------------------------------------------------------------------

  $('.insta-gallery-feed[data-feed_layout=masonry]').on('qligg.imagesLoaded', function (e, images) {

    var $item = $(e.delegateTarget),
            $wrap = $('.insta-gallery-list', $item);

    if (!$wrap.data('masonry')) {
      $wrap.masonry({
        itemSelector: '.insta-gallery-item',
        isResizable: true,
        isAnimated: false,
        transitionDuration: 0,
        percentPosition: true,
        columnWidth: '.insta-gallery-item:last-child'
      });
    } else {
      $wrap.masonry('appended', images, false);
    }
  });


  $('.insta-gallery-feed[data-feed_layout=masonry]').on('layoutComplete', function (e, items) {

    var $item = $(e.delegateTarget);

    $item.addClass('loaded');

    $(items).each(function (i, item) {
      setTimeout(function () {
        $(item.element).addClass('ig-image-loaded');
      }, 500 + (i * 50));

    });
  });

  // Popup
  // ---------------------------------------------------------------------------
  $('.insta-gallery-feed').on('qligg.loaded', function (e) {

    var $item = $(e.delegateTarget),
            $wrap = $('.insta-gallery-list', $item),
            options = $item.data('feed');

    // Redirect
    // -------------------------------------------------------------------------
    $('.insta-gallery-item .insta-gallery-icon.qligg-icon-instagram', $wrap).on('click', function (e) {
      e.stopPropagation();
    });

    // Carousel
    // -------------------------------------------------------------------------
    //$('.insta-gallery-item', $wrap).on('mfpOpen', function (e) {
    //console.log(e);
    //});

    if (!options.popup.display) {
      return;
    }

    $('.insta-gallery-item', $wrap).magnificPopup({
      type: 'inline',
      callbacks: {
        beforeOpen: function () {
          this.st.mainClass = this.st.mainClass + ' ' + 'qligg-mfp-wrap';
        },
        elementParse: function (item) {

          var media = '', profile = '', counter = '', caption = '', likes = '';

          //if (item.el.data('item').type == 'video') {
          //  media = '<video autoplay>' +
          //          '<source src="' + item.el.data('item').videos.standard + '" type="video/mp4">' +
          //          '</video>';
          //} else if (item.el.data('item').type == 'gallery') {
          //media = 'this is a gallery';
          //} else {
          media = '<img src="' + item.el.data('item').images.standard + '"/>'
          //}

          counter = '<div class="mfp-icons"><div class="mfp-counter">' + (item.index + 1) + ' / ' + $('.insta-gallery-item', $wrap).length + '</div><a class="mfp-link" href="' + item.el.data('item').link + '" target="_blank" rel="noopener"><i class="qligg-icon-instagram"></i>Instagram</a></div>';

          if (options.popup.profile) {
            profile = '<div class="mfp-user"><img src="' + options.profile.picture + '"><a href="' + options.profile.link + '" title="' + options.profile.name + '" target="_blank" rel="noopener">' + options.profile.user + '</a></div>';
          }

          if (options.popup.caption) {
            caption = '<div class="mfp-caption">' + item.el.data('item').caption + '</div>';
          }

          if (options.popup.likes) {
            likes = '<div class="mfp-info"><div class="mfp-likes"><i class="qligg-icon-heart"></i>' + item.el.data('item').likes + '</div><div class="mfp-comments"><i class="qligg-icon-comment"></i>' + item.el.data('item').comments + '</div><div class="mfp-date">' + item.el.data('item').date + '</div></div>';
          }

          item.src = '<div class="mfp-figure ' + options.popup.align + '">' + media + '<div class="mfp-close"></div><div class="mfp-bottom-bar"><div class="mfp-title">' + profile + counter + caption + likes + '</div></div></div>';
        }
      },
      gallery: {
        enabled: true
      }
    });

  });

  // Init
  // ---------------------------------------------------------------------------

  $('.insta-gallery-feed').on('click', '.insta-gallery-button.load', function (e) {
    e.preventDefault();

    var $item = $(e.delegateTarget);

    if (!$item.hasClass('loaded')) {
      return false;
    }

    var next_max_id = $('.insta-gallery-list .insta-gallery-item:last-child', $item).data('item').i;

    qligg_load_item_images($item, next_max_id);

  });

  $('.insta-gallery-feed').each(function (index, item) {

    var $item = $(item);

    if ($item.hasClass('loaded')) {
      return false;
    }

    qligg_load_item_images($item, 0);

  });

  /*function ig_lazy_load($wrap, item) {
   var lazyImages = [].slice.call($wrap.find('img.ig-lazy'));
   var active = false;
   
   var lazyLoadImages = function () {
   if (active === false) {
   active = true;
   
   setTimeout(
   function () {
   lazyImages
   .forEach(function (lazyImage) {
   if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage
   .getBoundingClientRect().bottom >= 0)
   && getComputedStyle(lazyImage).display !== "none") {
   lazyImage.src = lazyImage.dataset.src;
   lazyImage.classList.remove("lazy");
   
   lazyImages = lazyImages
   .filter(function (image) {
   return image !== lazyImage;
   });
   
   if (lazyImages.length === 0) {
   document.removeEventListener(
   "scroll",
   lazyLoadImages);
   document.removeEventListener(
   "touchmove",
   lazyLoadImages);
   window.removeEventListener(
   "resize",
   lazyLoadImages);
   window.removeEventListener(
   "orientationchange",
   lazyLoadImages);
   }
   }
   });
   
   active = false;
   }, 200);
   }
   };
   
   document.addEventListener("scroll", lazyLoadImages);
   document.addEventListener("touchmove", lazyLoadImages);
   window.addEventListener("resize", lazyLoadImages);
   window.addEventListener("orientationchange", lazyLoadImages);
   lazyLoadImages();
   }*/

  // IE8
  // ---------------------------------------------------------------------------

  if (navigator.appVersion.indexOf("MSIE 8.") != -1) {
    document.body.className += ' ' + 'instagal-ie-8';
  }
  if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
    document.body.className += ' ' + 'instagal-ie-9';
  }

})(jQuery);
