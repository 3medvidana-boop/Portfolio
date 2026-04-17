/* ==========================================================================
   Image Carousel — inline gallery with prev/next and dot navigation.
   Also integrates with image-zoom: clicking a slide opens the zoom overlay
   and adds prev/next arrows inside it for gallery browsing.
   ========================================================================== */

(function () {
  var carousels = document.querySelectorAll('.image-carousel');
  if (!carousels.length) return;

  carousels.forEach(function (carousel) {
    var track = carousel.querySelector('.image-carousel__track');
    var slides = Array.from(carousel.querySelectorAll('.image-carousel__slide'));
    var prevBtn = carousel.querySelector('.image-carousel__btn--prev');
    var nextBtn = carousel.querySelector('.image-carousel__btn--next');
    var dots = Array.from(carousel.querySelectorAll('.image-carousel__dot'));
    var current = 0;

    function goTo(index) {
      if (index < 0 || index >= slides.length) return;
      current = index;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';

      if (prevBtn) prevBtn.disabled = current === 0;
      if (nextBtn) nextBtn.disabled = current === slides.length - 1;

      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === current);
      });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    goTo(0);

    /* ---- Zoom integration: open gallery in image-zoom with prev/next ---- */
    slides.forEach(function (slide, i) {
      var img = slide.querySelector('img');
      if (!img) return;
      img.style.cursor = 'pointer';
      img.addEventListener('click', function () {
        var srcs = slides.map(function (s) {
          var sImg = s.querySelector('img');
          return sImg ? sImg.src : '';
        });
        var alts = slides.map(function (s) {
          var sImg = s.querySelector('img');
          return sImg ? (sImg.alt || '') : '';
        });
        if (window.imageZoomOpenGallery) {
          window.imageZoomOpenGallery(srcs, alts, i);
        }
      });
    });
  });
})();
