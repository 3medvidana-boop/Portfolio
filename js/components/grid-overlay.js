/* ==========================================================================
   Grid Overlay — toggle logic
   ========================================================================== */

(function () {
  const STORAGE_KEY = 'grid-overlay-visible';

  function createGridOverlay() {
    /* overlay */
    const overlay = document.createElement('div');
    overlay.className = 'grid-overlay';

    const columns = document.createElement('div');
    columns.className = 'grid-overlay__columns';

    for (let i = 1; i <= 6; i++) {
      const col = document.createElement('div');
      col.className = 'grid-overlay__column';

      const label = document.createElement('span');
      label.className = 'grid-overlay__label';
      label.textContent = i;

      col.appendChild(label);
      columns.appendChild(col);
    }

    overlay.appendChild(columns);

    /* toggle button */
    const btn = document.createElement('button');
    btn.className = 'grid-toggle';
    btn.setAttribute('aria-label', 'Toggle grid overlay');
    btn.innerHTML =
      '<svg class="grid-toggle__icon" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<line x1="3" y1="0" x2="3" y2="18"/>' +
        '<line x1="7" y1="0" x2="7" y2="18"/>' +
        '<line x1="11" y1="0" x2="11" y2="18"/>' +
        '<line x1="15" y1="0" x2="15" y2="18"/>' +
      '</svg>';

    /* restore state */
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'true') {
      overlay.classList.add('is-visible');
      btn.classList.add('is-active');
    }

    btn.addEventListener('click', function () {
      const visible = overlay.classList.toggle('is-visible');
      btn.classList.toggle('is-active', visible);
      localStorage.setItem(STORAGE_KEY, visible);
    });

    document.body.appendChild(overlay);
    // btn hidden: document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createGridOverlay);
  } else {
    createGridOverlay();
  }
})();
