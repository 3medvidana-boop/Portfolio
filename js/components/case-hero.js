/* ==========================================================================
   Case Hero — gate-driven section reveal (desktop) / static (tablet+mobile)
   - Desktop (>1200px): sections appear one by one as the user scrolls
     past the previous section. Both left and right blocks enter from
     the bottom of the viewport naturally via scroll.
   - Tablet & mobile (≤1200px): all sections open, static layout
   ========================================================================== */

(function () {
  var items = Array.from(document.querySelectorAll('.case-hero__nav-item'));
  if (!items.length) return;

  /* ---- Tablet & mobile (≤1200px): open everything, no gate ---- */
  if (window.innerWidth <= 1200) {
    items.forEach(function (item) { item.classList.add('is-open'); });
    var cb = document.querySelector('.case-bottom');
    if (cb) cb.classList.add('is-visible');
    return;
  }

  /* ====================================================================
     Desktop (>1200px): gate-driven reveal
     ==================================================================== */

  var GATE_BUFFER = 50; /* px — previous section's bottom must be this
                           far above the viewport bottom before the next
                           section appears */

  /* Skip items that start with .is-open (e.g. Solution) */
  var current = 0;
  while (current < items.length && items[current].classList.contains('is-open')) {
    current++;
  }

  var caseBottom = document.querySelector('.case-bottom');

  /* ---- Gate check: open the next section when the previous one's
         bottom is visible in the viewport ---- */
  function tryOpenNext() {
    while (current < items.length) {
      if (current > 0) {
        var rect = items[current - 1].getBoundingClientRect();
        if (rect.bottom > window.innerHeight - GATE_BUFFER) break;
      }

      items[current].classList.add('is-open');
      current++;
    }

    /* Show bottom sections only after the last nav-item is open */
    if (caseBottom && current >= items.length) {
      caseBottom.classList.add('is-visible');
    }
  }

  window.addEventListener('scroll', tryOpenNext, { passive: true });
  window.addEventListener('wheel', tryOpenNext, { passive: true });
  window.addEventListener('touchmove', tryOpenNext, { passive: true });

  /* ==========================================================================
     Title-click navigation
     ========================================================================== */

  function getHeaderHeight() {
    return window.innerWidth <= 834 ? 60 : 90;
  }

  function openClosedUpTo(upTo) {
    for (var i = 0; i <= upTo; i++) {
      if (!items[i].classList.contains('is-open')) {
        items[i].classList.add('is-open');
      }
    }
    if (upTo + 1 > current) current = upTo + 1;
  }

  function scrollItemToTop(item) {
    var rect = item.getBoundingClientRect();
    var y = window.pageYOffset + rect.top - getHeaderHeight();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  items.forEach(function (item, index) {
    var title = item.querySelector('.case-hero__nav-title');
    if (!title) return;
    title.style.cursor = 'pointer';
    title.addEventListener('click', function () {
      if (item.classList.contains('is-open')) return;
      openClosedUpTo(index);
      scrollItemToTop(item);
    });
  });

  /* ---- Try on load in case a section's bottom is already visible ---- */
  tryOpenNext();
})();
