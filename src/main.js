// Wait for jQuery to load first
$(document).ready(function() {
  console.log('jQuery loaded and document ready');

  // Initialize Daycare Carousel
  const $carousel = $('.daycare-carousel');

  $carousel.slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: false,
    dots: false,
    arrows: true,
    prevArrow: '<button type="button" class="slick-prev hidden"><span class="carousel-arrow carousel-arrow-prev"></span></button>',
    nextArrow: '<button type="button" class="slick-next"><span class="carousel-arrow carousel-arrow-next"></span></button>',
    responsive: [
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 3
            }
        },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.1,
          arrows: false,
        }
      }
    ]
  });
  console.log('Slick initialized');

  // Function to check slide position and hide/show arrows
  function updateArrows() {
    const slideCount = $carousel.slick('getSlick').slideCount;
    const currentSlide = $carousel.slick('slickCurrentSlide');
    const slidesToShow = $carousel.slick('getSlick').options.slidesToShow;

    // Check if we're at the first slide (hide prev arrow)
    if (currentSlide === 0) {
      $('.slick-prev').css('display', 'none');
    } else {
      $('.slick-prev').css('display', 'block');
    }

    // Check if we're at the last set of slides (hide next arrow)
    if (currentSlide >= slideCount - slidesToShow) {
      $('.slick-next').css('display', 'none');
    } else {
      $('.slick-next').css('display', 'block');
    }

    // Update scrollbar position
    updateScrollbar();
  }

  // Initialize scrollbar for daycare carousel
  function initScrollbar() {
    const $scrollbarContainer = $('.daycare-scrollbar-container');
    const $scrollbarThumb = $('.daycare-scrollbar-thumb');
    const slideCount = $carousel.slick('getSlick').slideCount;
    const slidesToShow = $carousel.slick('getSlick').options.slidesToShow;

    // Calculate thumb width as percentage
    const thumbWidth = (slidesToShow / slideCount) * 100;
    $scrollbarThumb.css('width', thumbWidth + '%');

    // Make scrollbar draggable
    let isDragging = false;
    let startX, startLeft;

    $scrollbarThumb.mousedown(function(e) {
      isDragging = true;
      $(this).addClass('dragging');
      startX = e.pageX;
      startLeft = parseInt($(this).css('left'));
      e.preventDefault();
    });

    $(document).mousemove(function(e) {
      if (!isDragging) return;

      const containerWidth = $scrollbarContainer.width();
      const thumbWidth = $scrollbarThumb.width();
      const maxLeft = containerWidth - thumbWidth;

      let newLeft = startLeft + (e.pageX - startX);
      // Constrain within bounds
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));

      // Move the thumb
      $scrollbarThumb.css('left', newLeft + 'px');

      // Calculate and go to the corresponding slide
      const slideRatio = newLeft / maxLeft;
      const targetSlide = Math.round(slideRatio * (slideCount - slidesToShow));
      $carousel.slick('slickGoTo', targetSlide, true);
    });

    $(document).mouseup(function() {
      isDragging = false;
      $scrollbarThumb.removeClass('dragging');
    });

    // Handle click on scrollbar container (jump to position)
    $scrollbarContainer.click(function(e) {
      if ($(e.target).hasClass('daycare-scrollbar-thumb')) return;

      const containerWidth = $scrollbarContainer.width();
      const thumbWidth = $scrollbarThumb.width();
      const maxLeft = containerWidth - thumbWidth;
      const clickPosition = e.pageX - $scrollbarContainer.offset().left;

      // Calculate position ratio (accounting for thumb width)
      let newLeft = clickPosition - (thumbWidth / 2);
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));

      // Calculate and go to the corresponding slide
      const slideRatio = newLeft / maxLeft;
      const targetSlide = Math.round(slideRatio * (slideCount - slidesToShow));
      $carousel.slick('slickGoTo', targetSlide, true);
    });
  }

  // Update scrollbar position based on current slide
  function updateScrollbar() {
    const $scrollbarContainer = $('.daycare-scrollbar-container');
    const $scrollbarThumb = $('.daycare-scrollbar-thumb');
    const slideCount = $carousel.slick('getSlick').slideCount;
    const slidesToShow = $carousel.slick('getSlick').options.slidesToShow;
    const currentSlide = $carousel.slick('slickCurrentSlide');

    // Only update if elements exist
    if ($scrollbarContainer.length && $scrollbarThumb.length) {
      const containerWidth = $scrollbarContainer.width();
      const thumbWidth = $scrollbarThumb.width();
      const maxLeft = containerWidth - thumbWidth;

      // Calculate position based on current slide
      const slideProgress = currentSlide / (slideCount - slidesToShow);
      const newLeft = slideProgress * maxLeft;

      $scrollbarThumb.css('left', newLeft + 'px');
    }
  }

  // Run on initialization
  updateArrows();

  // Initialize scrollbar after a short delay to ensure carousel is fully rendered
  setTimeout(initScrollbar, 100);

  // Update arrows when the slide changes
  $carousel.on('afterChange', function() {
    updateArrows();
  });

  // Update arrows when window resizes (as visible slides count might change)
  $(window).on('resize', function() {
    setTimeout(function() {
      updateArrows();
      initScrollbar(); // Reinitialize scrollbar on resize
    }, 300); // Small delay to allow responsive settings to apply
  });

  // Initialize Testimonial Slider
  $('.testimonial-slider').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    infinite: true,
    speed: 500,
    cssEase: 'linear',
    prevArrow: $('.testimonial-prev'),
    nextArrow: $('.testimonial-next'),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });

  // Add similar scrollbar for testimonial slider
  const $testimonialSlider = $('.testimonial-slider');
  const $testimonialScrollContainer = $('.testimonial-scrollbar-container');
  const $testimonialScrollThumb = $('.testimonial-scrollbar-thumb');

  if ($testimonialSlider.length && $testimonialScrollContainer.length) {
    const slideCount = $testimonialSlider.slick('getSlick').slideCount;

    // Set initial thumb width
    $testimonialScrollThumb.css('width', (1 / slideCount * 100) + '%');

    // Update thumb position on slide change
    $testimonialSlider.on('afterChange', function(event, slick, currentSlide) {
      const containerWidth = $testimonialScrollContainer.width();
      const thumbWidth = $testimonialScrollThumb.width();
      const maxLeft = containerWidth - thumbWidth;
      const slideProgress = currentSlide / (slideCount - 1);
      const newLeft = slideProgress * maxLeft;

      $testimonialScrollThumb.css('left', newLeft + 'px');
    });

    // Handle scrollbar clicks
    $testimonialScrollContainer.click(function(e) {
      if ($(e.target).hasClass('testimonial-scrollbar-thumb')) return;

      const containerWidth = $testimonialScrollContainer.width();
      const clickPosition = e.pageX - $testimonialScrollContainer.offset().left;
      const slideRatio = clickPosition / containerWidth;
      const targetSlide = Math.round(slideRatio * (slideCount - 1));

      $testimonialSlider.slick('slickGoTo', targetSlide);
    });
  }

  // Hamburger menu toggle
  $('#hamburger-btn').click(function() {
    $(this).toggleClass('active');
    $('#main-nav').toggleClass('translate-x-full');
    $('#mobile-menu-items').toggleClass('translate-x-full');

    // Toggle hamburger icon animation
    if ($(this).hasClass('active')) {
      $(this).find('span:nth-child(1)').addClass('rotate-45 translate-y-2');
      $(this).find('span:nth-child(2)').addClass('opacity-0');
      $(this).find('span:nth-child(3)').addClass('-rotate-45 -translate-y-2');
    } else {
      $(this).find('span').removeClass('rotate-45 translate-y-2 opacity-0 -rotate-45 -translate-y-2');
    }
  });
});
