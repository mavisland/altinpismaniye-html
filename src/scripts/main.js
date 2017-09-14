(function($) {
  'use strict';

  var $window = $(window);
  var $body   = $('body');

  /**
   * Shrink Navbar
   */
  $window.scroll(function() {
    var navbar = $('#header');
    if ($window.scrollTop() > 0) {
      navbar.addClass('fixed-nav');
    } else {
      navbar.removeClass('fixed-nav');
    }
  });

  /**
   * ScrollSpy
   */
  $body.scrollspy({
    target : ".navbar-collapse",
    offset : 95
  });

  $('a[href^="#"]').on('click',function (e) {
      e.preventDefault();

      var target = this.hash;
      var $target = $(target);

      $('html, body').stop().animate({
          'scrollTop': $target.offset().top
      }, 900, 'swing', function () {
          window.location.hash = target;
      });
  });

  /**
   * Sponsor Carousel
   */
  var sponsor_carousel = $("#sponsor-carousel");
  var sliderPrev = $("#sponsorlar .carousel .slider-nav-left");
  var sliderNext = $("#sponsorlar .carousel .slider-nav-right");

  sponsor_carousel.owlCarousel({
    autoplay: true,
    autoplayHoverPause: true,
    dots: false,
    loop: (sponsor_carousel.find(".item").length > 1 ? true : false),
    nav: true,
    navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      }
    }
  });
  sliderPrev.click(function(e) {
    e.preventDefault();
    sponsor_carousel.trigger('prev.owl.carousel');
  });
  sliderNext.click(function(e) {
    e.preventDefault();
    sponsor_carousel.trigger('next.owl.carousel');
  });

  $(".mcs-horizontal-example").mCustomScrollbar({
    axis:"x",
    // theme:"dark-3",
    advanced:{
      autoExpandHorizontalScroll:true //optional (remove or set to false for non-dynamic/static elements)
    },
    scrollButtons:{enable:true,scrollType:"stepped"},
    keyboard:{scrollType:"stepped"},
    mouseWheel:{scrollAmount:188,normalizeDelta:true},
    theme:"rounded-dark",
    autoExpandScrollbar:true,
    snapAmount:188,
    snapOffset:65
  });

})(jQuery);
