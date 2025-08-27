// Import styles to be processed by Vite
import './input.css';

// Wait for jQuery to load first (jQuery is loaded from CDN in the HTML)
document.addEventListener('DOMContentLoaded', function() {
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

    // Hide prev arrow on first slide, show otherwise
    if(currentSlide === 0) {
      $('.slick-prev').addClass('hidden');
    } else {
      $('.slick-prev').removeClass('hidden');
    }

    // Hide next arrow on last slide, show otherwise
    if(currentSlide >= slideCount - slidesToShow) {
      $('.slick-next').addClass('hidden');
    } else {
      $('.slick-next').removeClass('hidden');
    }
  }

  // Call initially to set correct state
  updateArrows();

  // Update arrows when slide changes
  $carousel.on('afterChange', function() {
    updateArrows();
  });

  // Handle mobile scrollbar functionality
  const $carouselSlides = $('.carousel-slide');
  const totalSlides = $carouselSlides.length;
  const $scrollbarThumb = $('.daycare-scrollbar-thumb');

  $carousel.on('afterChange', function(event, slick, currentSlide) {
    // Calculate the thumb position based on current slide
    const slidePercentage = currentSlide / (totalSlides - slick.options.slidesToShow);
    const maxThumbPosition = $('.daycare-scrollbar-container').width() - $scrollbarThumb.width();
    const newPosition = slidePercentage * maxThumbPosition;

    // Update thumb position
    $scrollbarThumb.css('left', newPosition + 'px');
  });

  // Initialize Testimonial Slider
  const $testimonialSlider = $('.testimonial-slider');

  $testimonialSlider.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    prevArrow: $('.testimonial-prev'),
    nextArrow: $('.testimonial-next'),
  });

  // Hide prev arrow by default on testimonial slider
  $('.testimonial-prev').addClass('hidden');

  // Update testimonial arrows
  function updateTestimonialArrows() {
    const slideCount = $testimonialSlider.slick('getSlick').slideCount;
    const currentSlide = $testimonialSlider.slick('slickCurrentSlide');

    // Hide prev arrow on first slide, show otherwise
    if(currentSlide === 0) {
      $('.testimonial-prev').addClass('hidden');
    } else {
      $('.testimonial-prev').removeClass('hidden');
    }

    // Hide next arrow on last slide, show otherwise
    if(currentSlide >= slideCount - 1) {
      $('.testimonial-next').addClass('hidden');
    } else {
      $('.testimonial-next').removeClass('hidden');
    }
  }

  // Call initially to set correct state
  updateTestimonialArrows();

  // Update arrows when slide changes
  $testimonialSlider.on('afterChange', function() {
    updateTestimonialArrows();
  });

  // Mobile Menu Toggle
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mainNav = document.getElementById('main-nav');
  const mobileMenuItems = document.getElementById('mobile-menu-items');

  hamburgerBtn.addEventListener('click', function() {
    this.classList.toggle('active');

    // Toggle the transform class to show/hide the navigation
    mainNav.classList.toggle('translate-x-full');
    mobileMenuItems.classList.toggle('translate-x-full');

    // Add 'active' class to hamburger button for styling if needed
    if (mainNav.classList.contains('translate-x-full')) {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    }
  });
});
