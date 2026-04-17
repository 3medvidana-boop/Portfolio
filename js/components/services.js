/* ==========================================================================
   Services — scroll-driven horizontal card movement (>1200px only)
   When staircase pushes cards beyond grid, scrolling down moves
   the whole card list right-to-left. Scrolling up reverses.
   ========================================================================== */
(function () {
  var wrapper = document.querySelector('.services__cards-wrapper');
  var cards = document.querySelector('.services__cards');

  if (!wrapper || !cards) return;

  function updateScroll() {
    /* Only active on desktop >1200px */
    if (window.innerWidth <= 1200) {
      cards.style.transform = '';
      return;
    }

    var rect = wrapper.getBoundingClientRect();
    var viewH = window.innerHeight;

    /* Calculate how far the section has scrolled into view */
    var progress = (viewH - rect.top) / (viewH + rect.height);
    progress = Math.max(0, Math.min(1, progress));

    /* Total overflow = how much cards extend beyond wrapper */
    var overflow = cards.scrollWidth - wrapper.clientWidth;
    if (overflow <= 0) {
      cards.style.transform = '';
      return;
    }

    /* Move cards from right to left as user scrolls down */
    var translateX = -overflow * progress;
    cards.style.transform = 'translateX(' + translateX + 'px)';
  }

  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
  updateScroll();
})();
