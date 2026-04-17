/* ==========================================================================
   Case Stack — progressive reveal stacked sections
   Sets sticky top offset and z-index for each section so they stack
   with 72px overlap (title tab visible).
   ========================================================================== */

(function () {
  var OVERLAP = 72; /* visible height of each tab/title */
  var sections = document.querySelectorAll('.case-stack__section');

  if (!sections.length) return;

  function getHeaderHeight() {
    return window.innerWidth <= 834 ? 60 : 90;
  }

  function apply() {
    var headerH = getHeaderHeight();

    sections.forEach(function (section, i) {
      section.style.top = (headerH + i * OVERLAP) + 'px';
      section.style.zIndex = i + 1;
    });
  }

  apply();
  window.addEventListener('resize', apply);
})();
