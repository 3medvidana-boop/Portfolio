/* ==========================================================================
   Header Menu — toggle mobile/tablet menu
   ========================================================================== */

(function () {
  function initHeaderMenu() {
    var header = document.querySelector('.header');
    var toggle = document.querySelector('.header__home');
    var menu   = document.querySelector('.header__menu');

    if (!header || !toggle || !menu) return;

    toggle.addEventListener('click', function (e) {
      /* Only act as menu toggle at <= 1199px */
      if (window.innerWidth > 1200) return;

      e.preventDefault();

      var isOpen = header.classList.toggle('header--menu-open');
      menu.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    /* Close menu on link click */
    var links = menu.querySelectorAll('.header__menu-link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('header--menu-open');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    /* Close menu on resize above tablet */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1200) {
        header.classList.remove('header--menu-open');
        menu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderMenu);
  } else {
    initHeaderMenu();
  }
})();
