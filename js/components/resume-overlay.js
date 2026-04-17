/* ==========================================================================
   Resume Overlay — opens Google Doc preview in a fullscreen overlay
   with a Download PDF button
   ========================================================================== */

(function () {
  var EMBED_URL = 'https://docs.google.com/document/d/e/2PACX-1vT5a0clrbgi7EtcKgA0_7l17TmWGwkIdl5NTev8URAtgEAXai-8qAgE9dlWbmjbHfeIxUMzdmwhVAMa/pub?embedded=true';
  var DOWNLOAD_URL = 'https://docs.google.com/document/d/1JTT3Aj1-kQ1tji0HqDtxDAIE4A0DEETCDMihvhjeNKE/export?format=pdf';

  /* ---- Build overlay ---- */
  var overlay = document.createElement('div');
  overlay.className = 'resume-overlay';
  overlay.innerHTML =
    '<div class="resume-overlay__toolbar">' +
      '<a class="resume-overlay__download" href="' + DOWNLOAD_URL + '" target="_blank" rel="noopener noreferrer">Download PDF</a>' +
      '<button class="resume-overlay__close" type="button" aria-label="Close">\u00D7</button>' +
    '</div>' +
    '<div class="resume-overlay__frame-wrap">' +
      '<iframe class="resume-overlay__frame" src="" title="Resume" loading="lazy"></iframe>' +
    '</div>';
  document.body.appendChild(overlay);

  var frame = overlay.querySelector('.resume-overlay__frame');
  var closeBtn = overlay.querySelector('.resume-overlay__close');

  function open() {
    if (!frame.src || frame.src === window.location.href) {
      frame.src = EMBED_URL;
    }
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ---- Wire Resume buttons ---- */
  document.querySelectorAll('.header__resume').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      open();
    });
  });

  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
