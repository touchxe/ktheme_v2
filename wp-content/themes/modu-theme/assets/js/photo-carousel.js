(function () {
  function pad(value) {
    return String(value).padStart(2, '0');
  }

  function closestSlideIndex(slides, viewport) {
    var viewportLeft = viewport.getBoundingClientRect().left;
    var bestIndex = 0;
    var bestDistance = Infinity;

    slides.forEach(function (slide, index) {
      var distance = Math.abs(slide.getBoundingClientRect().left - viewportLeft);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = index;
      }
    });

    return bestIndex;
  }

  function initCarousel(carousel) {
    if (carousel.dataset.ktPhotoCarouselReady === 'true') return;

    var viewport = carousel.querySelector('[data-modu-carousel-viewport]');
    var slides = Array.prototype.slice.call(carousel.querySelectorAll('[data-modu-carousel-slide]'));
    var previous = carousel.querySelector('[data-modu-carousel-prev]');
    var next = carousel.querySelector('[data-modu-carousel-next]');
    var current = carousel.querySelector('[data-modu-carousel-current]');
    var dots = Array.prototype.slice.call(carousel.querySelectorAll('[data-modu-carousel-dot]'));
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var activeIndex = 0;
    var scrollTimer = null;

    if (!viewport || slides.length === 0) return;

    carousel.dataset.ktPhotoCarouselReady = 'true';

    function update(index) {
      activeIndex = (index + slides.length) % slides.length;
      if (current) current.textContent = pad(activeIndex + 1);

      dots.forEach(function (dot, dotIndex) {
        var isActive = dotIndex === activeIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-current', isActive ? 'true' : 'false');
      });
    }

    function goTo(index) {
      var targetIndex = (index + slides.length) % slides.length;
      slides[targetIndex].scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'start'
      });
      update(targetIndex);
    }

    if (previous) {
      previous.addEventListener('click', function () {
        goTo(activeIndex - 1);
      });
    }

    if (next) {
      next.addEventListener('click', function () {
        goTo(activeIndex + 1);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(Number(dot.dataset.ktCarouselDot || 0));
      });
    });

    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goTo(activeIndex - 1);
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goTo(activeIndex + 1);
      }
    });

    viewport.addEventListener('scroll', function () {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(function () {
        update(closestSlideIndex(slides, viewport));
      }, 80);
    }, { passive: true });

    update(0);
  }

  function boot() {
    document.querySelectorAll('[data-modu-photo-carousel]').forEach(initCarousel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
