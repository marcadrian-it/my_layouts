var slideSpeed = 10000;
var isAnimating = false; // Flag to track animation state

var main = function() {
  // Carousel
  $('.carousel').each(function() {
    var $carousel = $(this);
    setInterval(function() {
      timedDelay($carousel);
    }, slideSpeed);
  });

  // arrow-next
  $('.arrow-next').click(function(e) {
    e.preventDefault();

    if (isAnimating) {
      return; // Exit early if animation is already in progress
    }

    isAnimating = true;

    var $carousel = $(this).closest('.carousel');
    var currentSlide = $carousel.find('.active-slide');
    var nextSlide = currentSlide.next('.slide');

    if (nextSlide.length === 0) {
      nextSlide = $carousel.find('.slide').first();
    }

    currentSlide.fadeOut(600, function() {
      $(this).removeClass('active-slide');
      nextSlide.fadeIn(600).addClass('active-slide');
      updateDots($carousel, nextSlide.index());
      isAnimating = false; // Reset animation flag
    });
  });

  // arrow-prev
  $('.arrow-prev').click(function(e) {
    e.preventDefault();

    if (isAnimating) {
      return; // Exit early if animation is already in progress
    }

    isAnimating = true;

    var $carousel = $(this).closest('.carousel');
    var currentSlide = $carousel.find('.active-slide');
    var prevSlide = currentSlide.prev('.slide');

    if (prevSlide.length === 0) {
      prevSlide = $carousel.find('.slide').last();
    }

    currentSlide.fadeOut(600, function() {
      $(this).removeClass('active-slide');
      prevSlide.fadeIn(600).addClass('active-slide');
      updateDots($carousel, prevSlide.index());
      isAnimating = false; // Reset animation flag
    });
  });

  // dot-click
  $('.slider-dots .dot').click(function() {
    if (isAnimating) {
      return; // Exit early if animation is already in progress
    }

    isAnimating = true;

    var $carousel = $(this).closest('.carousel');
    var dotIndex = $(this).index();
    var $slides = $carousel.find('.slide');

    var slideToActivate = $slides.eq(dotIndex);
    var currentSlide = $carousel.find('.active-slide');

    if (!slideToActivate.hasClass('active-slide')) {
      currentSlide.fadeOut(600, function() {
        $(this).removeClass('active-slide');
        slideToActivate.fadeIn(600).addClass('active-slide');
        updateDots($carousel, dotIndex);
        isAnimating = false; // Reset animation flag
      });
    } else {
      isAnimating = false; // Reset animation flag if slide is already active
    }
  });
};

// timedDelay function
function timedDelay($carousel) {
  if (isAnimating) {
    return; // Exit early if animation is already in progress
  }

  isAnimating = true;

  var currentSlide = $carousel.find('.active-slide');
  var nextTimedSlide = currentSlide.next('.slide');

  if (nextTimedSlide.length === 0) {
    nextTimedSlide = $carousel.find('.slide').first();
  }

  currentSlide.fadeOut(600, function() {
    $(this).removeClass('active-slide');
    nextTimedSlide.fadeIn(600).addClass('active-slide');
    updateDots($carousel, nextTimedSlide.index());
    isAnimating = false; // Reset animation flag
  });
}

// Update active dot
function updateDots($carousel, activeIndex) {
  var $dots = $carousel.find('.slider-dots .dot');
  $dots.removeClass('active-dot');
  $dots.eq(activeIndex).addClass('active-dot');
}

$(document).ready(main);
