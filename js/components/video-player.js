/* ==========================================================================
   Video Player — poster preview opens a fullscreen overlay with native
   HTML5 controls (play/pause, volume, progress, fullscreen). A dedicated
   close button (×, top-right) dismisses the overlay; Esc also closes.
   - Trigger: any element with [data-video-src] inside .video-player
     (or the .video-player container itself carrying the attribute).
   ========================================================================== */

(function () {
  var players = document.querySelectorAll('.video-player');
  if (!players.length) return;

  /* ---- build single reusable overlay ---- */
  var overlay = document.createElement('div');
  overlay.className = 'video-player-overlay';
  overlay.innerHTML =
    '<button class="video-player-overlay__close" type="button" aria-label="Close">\u00D7</button>' +
    '<video class="video-player-overlay__video" controls playsinline muted ' +
           'controlslist="nodownload nofullscreen noplaybackrate noremoteplayback" ' +
           'disablepictureinpicture disableremoteplayback></video>';
  document.body.appendChild(overlay);

  var video = overlay.querySelector('.video-player-overlay__video');
  var closeBtn = overlay.querySelector('.video-player-overlay__close');

  function open(src, poster) {
    if (poster) video.setAttribute('poster', poster);
    else video.removeAttribute('poster');
    video.src = src;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    // Attempt autoplay; if blocked, user can press Play via native controls.
    var p = video.play();
    if (p && typeof p.catch === 'function') p.catch(function () {});
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    try { video.pause(); } catch (_) {}
    video.removeAttribute('src');
    video.load();
  }

  /* ---- wire each preview ---- */
  players.forEach(function (player) {
    // Resolve data source: from .video-player itself or an inner [data-video-src]
    var srcEl = player.hasAttribute('data-video-src')
      ? player
      : player.querySelector('[data-video-src]');
    if (!srcEl) return;

    player.addEventListener('click', function (e) {
      e.preventDefault();
      var src = srcEl.getAttribute('data-video-src');
      var poster = srcEl.getAttribute('data-video-poster') || '';
      if (src) open(src, poster);
    });
  });

  /* ---- close handlers ---- */
  closeBtn.addEventListener('click', close);

  document.addEventListener('keydown', function (e) {
    if (!overlay.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
  });

  // Clicking the overlay background does NOT close — only the close button
  // or Escape. This prevents accidental dismissal while interacting with the
  // native player controls.
})();
