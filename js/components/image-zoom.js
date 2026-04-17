/* ==========================================================================
   Image Zoom — fullscreen lightbox with zoom and pan
   - Trigger: [data-zoom-src]
   - + / - buttons step by 10% in [10..100] of natural size; opens at 50%
   - Image keeps natural aspect ratio (sized via width/height in px)
   - When image overflows the viewport: drag/swipe to pan + arrow controls
     in the bottom-right corner. Arrows hidden when image fits the viewport.
   ========================================================================== */

(function () {
  var triggers = document.querySelectorAll('[data-zoom-src]');
  if (!triggers.length) return;

  var STEP = 10;
  var MIN_PCT = 10;
  var MAX_PCT = 100;
  var DEFAULT_PCT = 50;
  var PAN_STEP = 120;
  var pct = DEFAULT_PCT;

  /* ---- Gallery state ---- */
  var gallerySrcs = [];
  var galleryAlts = [];
  var galleryIndex = -1;

  var overlay = document.createElement('div');
  overlay.className = 'image-zoom';
  overlay.innerHTML =
    '<button class="image-zoom__btn image-zoom__close" type="button" aria-label="Close">\u00D7</button>' +
    '<button class="image-zoom__btn image-zoom__gallery-prev" type="button" aria-label="Previous image">\u2039</button>' +
    '<button class="image-zoom__btn image-zoom__gallery-next" type="button" aria-label="Next image">\u203A</button>' +
    '<div class="image-zoom__viewport">' +
      '<div class="image-zoom__stage">' +
        '<img class="image-zoom__img" alt="">' +
      '</div>' +
    '</div>' +
    '<div class="image-zoom__controls">' +
      '<button class="image-zoom__btn image-zoom__out" type="button" aria-label="Zoom out">\u2212</button>' +
      '<button class="image-zoom__btn image-zoom__in" type="button" aria-label="Zoom in">+</button>' +
    '</div>' +
    '<div class="image-zoom__pan" aria-label="Pan controls">' +
      '<button class="image-zoom__pan-btn image-zoom__pan-btn--up"    type="button" data-pan="up"    aria-label="Pan up">\u2191</button>' +
      '<button class="image-zoom__pan-btn image-zoom__pan-btn--left"  type="button" data-pan="left"  aria-label="Pan left">\u2190</button>' +
      '<button class="image-zoom__pan-btn image-zoom__pan-btn--right" type="button" data-pan="right" aria-label="Pan right">\u2192</button>' +
      '<button class="image-zoom__pan-btn image-zoom__pan-btn--down"  type="button" data-pan="down"  aria-label="Pan down">\u2193</button>' +
    '</div>';
  document.body.appendChild(overlay);

  var viewport = overlay.querySelector('.image-zoom__viewport');
  var img = overlay.querySelector('.image-zoom__img');
  var closeBtn = overlay.querySelector('.image-zoom__close');
  var inBtn = overlay.querySelector('.image-zoom__in');
  var outBtn = overlay.querySelector('.image-zoom__out');
  var panBtns = overlay.querySelectorAll('.image-zoom__pan-btn');
  var galleryPrevBtn = overlay.querySelector('.image-zoom__gallery-prev');
  var galleryNextBtn = overlay.querySelector('.image-zoom__gallery-next');

  function updateOverflow() {
    var has = viewport.scrollWidth  > viewport.clientWidth + 1 ||
              viewport.scrollHeight > viewport.clientHeight + 1;
    overlay.classList.toggle('has-overflow', has);
  }

  function applyScale() {
    if (!img.naturalWidth) return;
    img.style.width  = (img.naturalWidth  * pct / 100) + 'px';
    img.style.height = (img.naturalHeight * pct / 100) + 'px';
    inBtn.disabled  = pct >= MAX_PCT;
    outBtn.disabled = pct <= MIN_PCT;
    // Defer overflow check until layout settles
    requestAnimationFrame(updateOverflow);
  }

  function centerViewport() {
    requestAnimationFrame(function () {
      viewport.scrollLeft = (viewport.scrollWidth - viewport.clientWidth) / 2;
      viewport.scrollTop = (viewport.scrollHeight - viewport.clientHeight) / 2;
    });
  }

  function onLoaded() {
    pct = DEFAULT_PCT;
    applyScale();
    centerViewport();
  }

  function open(src, alt) {
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    img.alt = alt || '';
    img.style.width = '';
    img.style.height = '';

    if (img.src && img.src.indexOf(src) !== -1 && img.complete && img.naturalWidth) {
      onLoaded();
      return;
    }

    img.onload = onLoaded;
    img.src = src;
    if (img.complete && img.naturalWidth) onLoaded();
  }

  function updateGalleryButtons() {
    var isGallery = gallerySrcs.length > 1;
    overlay.classList.toggle('has-gallery', isGallery);
    if (isGallery) {
      galleryPrevBtn.disabled = galleryIndex <= 0;
      galleryNextBtn.disabled = galleryIndex >= gallerySrcs.length - 1;
    }
  }

  function close() {
    overlay.classList.remove('is-open');
    overlay.classList.remove('has-overflow');
    overlay.classList.remove('has-gallery');
    document.body.style.overflow = '';
    gallerySrcs = [];
    galleryAlts = [];
    galleryIndex = -1;
  }

  function galleryPrev() {
    if (galleryIndex <= 0) return;
    galleryIndex--;
    open(gallerySrcs[galleryIndex], galleryAlts[galleryIndex]);
    updateGalleryButtons();
  }

  function galleryNext() {
    if (galleryIndex >= gallerySrcs.length - 1) return;
    galleryIndex++;
    open(gallerySrcs[galleryIndex], galleryAlts[galleryIndex]);
    updateGalleryButtons();
  }

  /* ---- Public API for carousel integration ---- */
  window.imageZoomOpenGallery = function (srcs, alts, startIndex) {
    gallerySrcs = srcs;
    galleryAlts = alts;
    galleryIndex = startIndex || 0;
    open(gallerySrcs[galleryIndex], galleryAlts[galleryIndex]);
    updateGalleryButtons();
  };

  function zoomIn() {
    if (pct >= MAX_PCT) return;
    pct = Math.min(MAX_PCT, pct + STEP);
    applyScale();
  }

  function zoomOut() {
    if (pct <= MIN_PCT) return;
    pct = Math.max(MIN_PCT, pct - STEP);
    applyScale();
  }

  function pan(direction) {
    switch (direction) {
      case 'up':    viewport.scrollBy({ top: -PAN_STEP, behavior: 'smooth' }); break;
      case 'down':  viewport.scrollBy({ top:  PAN_STEP, behavior: 'smooth' }); break;
      case 'left':  viewport.scrollBy({ left: -PAN_STEP, behavior: 'smooth' }); break;
      case 'right': viewport.scrollBy({ left:  PAN_STEP, behavior: 'smooth' }); break;
    }
  }

  /* ---- drag-to-pan (mouse + touch via pointer events) ---- */
  var dragging = false;
  var startX = 0, startY = 0, startScrollX = 0, startScrollY = 0;

  viewport.addEventListener('pointerdown', function (e) {
    if (!overlay.classList.contains('has-overflow')) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startScrollX = viewport.scrollLeft;
    startScrollY = viewport.scrollTop;
    viewport.classList.add('is-grabbing');
    viewport.setPointerCapture(e.pointerId);
  });

  viewport.addEventListener('pointermove', function (e) {
    if (!dragging) return;
    viewport.scrollLeft = startScrollX - (e.clientX - startX);
    viewport.scrollTop  = startScrollY - (e.clientY - startY);
  });

  function endDrag(e) {
    if (!dragging) return;
    dragging = false;
    viewport.classList.remove('is-grabbing');
    try { viewport.releasePointerCapture(e.pointerId); } catch (_) {}
  }
  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);

  /* ---- wiring ---- */
  triggers.forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      open(el.getAttribute('data-zoom-src'), el.getAttribute('data-zoom-alt'));
    });
  });

  closeBtn.addEventListener('click', close);
  inBtn.addEventListener('click', zoomIn);
  outBtn.addEventListener('click', zoomOut);
  galleryPrevBtn.addEventListener('click', galleryPrev);
  galleryNextBtn.addEventListener('click', galleryNext);
  panBtns.forEach(function (b) {
    b.addEventListener('click', function () { pan(b.getAttribute('data-pan')); });
  });

  // Backdrop click does NOT close — only the Close button closes the overlay.
  // Drag on the viewport pans the image (mouse + touch), as an alternative
  // to the pan arrow buttons.

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === '+' || e.key === '=') zoomIn();
    else if (e.key === '-') zoomOut();
    else if (e.key === 'ArrowUp')    pan('up');
    else if (e.key === 'ArrowDown')  pan('down');
    else if (e.key === 'ArrowLeft')  pan('left');
    else if (e.key === 'ArrowRight') pan('right');
  });

  window.addEventListener('resize', function () {
    if (overlay.classList.contains('is-open')) updateOverflow();
  });
})();
