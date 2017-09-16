(function($) {
  'use strict';

  var $window = $(window);
  var $body   = $('body');

  /**
   * Test Device
   */
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
      return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
    }
  };
  var testMobile = isMobile.any();

  /**
   * Animation functions
   */
  $.fn.animateIt = function(type, delay, effect) {
    if (testMobile === null) {
      $(this).each(function(i, e) {
        var a, b, c, d;
        if (effect != null) {
          a = effect.split('-');
        } else {
          a = $(e).data('effect').split('-');
        }
        b = typeof a[1] !== 'undefined' ? a[1] : '';
        if (delay != null) {
          c = delay;
        } else {
          c = $(e).data('delay');
        }
        if (c) {
          d = 'animated ' + a[0] + type + b.charAt(0).toUpperCase() + b.slice(1) + ' delay' + c / 100;
        } else {
          d = 'animated ' + a[0] + type + b.charAt(0).toUpperCase() + b.slice(1) + ' delay0';
        }
        $(e).addClass(d);
      });
    }
  };
  $.fn.removeAnimate = function() {
    if (testMobile === null) {
      $(this).each(function(i, e) {
        var a, b, c;
        a = $(e).attr('class');
        b = a.match(/animated(.*?)(delay[0-9]+)/g);
        if (b != null) {
          c = b.join('');
          $(e).removeClass(c);
        }
      });
    }
  };

  /**
   * On Scroll Animation with Waypoints
   */
  if ($.fn.waypoint) {
    $('.animateIt').waypoint((function() {
      if (!$(this.element).hasClass('animated')) {
        $(this.element).animateIt('In');
      }
    }), {
      offset: '95%'
    });
  }

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
    target: ".navbar-collapse",
    offset: 95
  });

  /**
   * Smooth Scroll
   */
  $('a[href^="#"]').on('click', function(e) {
    e.preventDefault();

    var target = this.hash;
    var $target = $(target);

    $('html, body').stop().animate({
      'scrollTop': $target.offset().top
    }, 900, 'swing', function() {
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

  /**
   * Horizontal Content Scroll
   */
  $(".mcs-horizontal-example").mCustomScrollbar({
    advanced: {
      autoExpandHorizontalScroll: true
    },
    autoExpandScrollbar: true,
    axis: "x",
    keyboard: {
      scrollType:"stepped"
    },
    mouseWheel: {
      enable: false
    },
    snapAmount: 188,
    snapOffset: 65,
    scrollButtons: {
      enable: true,
      scrollType: "stepped"
    },
    theme: "rounded-dark"
  });

  /**
   * Circle Progress Bar
   */
  $window.scroll(function() {
    var blmpxl = $('#sayilar').offset().top - $window.scrollTop();
    console.log(blmpxl);

    if (blmpxl < 536) {
      $('.chart').easyPieChart({
        barColor: '#ffffff',
        scaleColor: false,
        trackColor: '#b89205',
        lineCap: 'butt',
        lineWidth: 20,
        size: 124,
        easing: 'easeOutBounce',
        onStep: function(from, to, percent) {
          $(this.el).find('.percent').text(Math.round(percent) + "%");
        }
      });
    }
  });
})(jQuery);
