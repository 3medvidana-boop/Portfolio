/* ==========================================================================
   Header Menu — toggle mobile/tablet menu
   ========================================================================== */

(function () {
  function initHeaderMenu() {
    var header = document.querySelector('.header');
    var toggle = document.querySelector('.header__home');
    var menu   = document.querySelector('.header__menu');

    if (!header || !toggle || !menu) return;

    function openMenu() {
      header.classList.add('header--menu-open');
      // Step 1: make element display:block so CSS transition can fire
      menu.classList.add('is-animating');
      // Step 2: one frame later add is-open to trigger slide-in transition
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          menu.classList.add('is-open');
        });
      });
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      header.classList.remove('header--menu-open');
      menu.classList.remove('is-open');
      document.body.style.overflow = '';
      // Wait for slide-out transition to finish, then remove from compositor
      menu.addEventListener('transitionend', function handler(e) {
        if (e.target !== menu) return;
        menu.classList.remove('is-animating');
      }, { once: true });
    }

    toggle.addEventListener('click', function (e) {
      /* Only act as menu toggle at <= 1199px */
      if (window.innerWidth > 1200) return;

      e.preventDefault();

      if (header.classList.contains('header--menu-open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close menu on link click */
    var links = menu.querySelectorAll('.header__menu-link');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });

    /* Close menu on resize above tablet */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 1200) {
        closeMenu();
      }
    });

    /* Expose closeMenu for contact-overlay to call */
    menu._closeMenu = closeMenu;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderMenu);
  } else {
    initHeaderMenu();
  }
})();
