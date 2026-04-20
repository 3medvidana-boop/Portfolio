/* ==========================================================================
   Contact Overlay — open/close contact form, validation
   ========================================================================== */

(function () {
  function initContactOverlay() {
    var overlay = document.getElementById('contact-overlay');
    if (!overlay) return;

    var panel = overlay.querySelector('.contact-overlay__panel');
    var backdrop = overlay.querySelector('.contact-overlay__backdrop');
    var closeBtn = overlay.querySelector('.contact-overlay__close');
    var form = overlay.querySelector('.contact-overlay__form');
    var openers = document.querySelectorAll('.js-contact-open');

    var emailInput = form.querySelector('input[type="email"]');
    var nameInput = form.querySelector('input[type="text"]');
    var textarea = form.querySelector('textarea');

    var EMAIL_MAX = 254;
    var NAME_MAX = 100;
    var TEXT_MAX = 500;

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function closeOverlay() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      // Wait for the panel slide-out transition to finish, then hide from compositor
      panel.addEventListener('transitionend', function handler(e) {
        if (e.target !== panel) return;
        overlay.classList.remove('is-animating');
      }, { once: true });
    }

    function openOverlay() {
      var menu = document.querySelector('.header__menu');
      if (menu && typeof menu._closeMenu === 'function') {
        // Use the menu's own close logic (handles is-animating cleanup)
        menu._closeMenu();
      } else if (menu) {
        // Fallback: instant close without animation
        var header = document.querySelector('.header');
        if (header) header.classList.remove('header--menu-open');
        menu.classList.remove('is-open');
        menu.classList.remove('is-animating');
      }
      // Step 1: make element display:flex so transitions can fire
      overlay.classList.add('is-animating');
      // Step 2: one frame later add is-open to trigger CSS transitions
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          overlay.classList.add('is-open');
        });
      });
      document.body.style.overflow = 'hidden';
      if (panel) {
        panel.scrollTop = 0;
      }
    }

    openers.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        openOverlay();
      });
    });

    backdrop.addEventListener('click', closeOverlay);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeOverlay);
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
        closeOverlay();
      }
    });

    // --- Validation ---

    function showError(input, message) {
      input.classList.add('is-error');
      var error = input.parentElement.querySelector('.contact-overlay__error');
      if (error) {
        error.textContent = message;
        error.classList.add('is-visible');
      }
    }

    function clearError(input) {
      input.classList.remove('is-error');
      var error = input.parentElement.querySelector('.contact-overlay__error');
      if (error) {
        error.textContent = '';
        error.classList.remove('is-visible');
      }
    }

    function validateEmail() {
      var val = emailInput.value.trim();
      if (!val) {
        showError(emailInput, 'Email is required');
        return false;
      }
      if (val.length > EMAIL_MAX) {
        showError(emailInput, 'Email must be ' + EMAIL_MAX + ' characters or less');
        return false;
      }
      if (!emailRegex.test(val)) {
        showError(emailInput, 'Please enter a valid email address');
        return false;
      }
      clearError(emailInput);
      return true;
    }

    function validateName() {
      var val = nameInput.value.trim();
      if (!val) {
        showError(nameInput, 'Name is required');
        return false;
      }
      if (val.length > NAME_MAX) {
        showError(nameInput, 'Name must be ' + NAME_MAX + ' characters or less');
        return false;
      }
      clearError(nameInput);
      return true;
    }

    function validateTextarea() {
      var val = textarea.value;
      if (val.length > TEXT_MAX) {
        showError(textarea, 'Message must be ' + TEXT_MAX + ' characters or less');
        return false;
      }
      clearError(textarea);
      return true;
    }

    // Live validation on input
    emailInput.addEventListener('input', function () {
      if (emailInput.value.trim().length > EMAIL_MAX) {
        showError(emailInput, 'Email must be ' + EMAIL_MAX + ' characters or less');
      } else if (emailInput.classList.contains('is-error')) {
        clearError(emailInput);
      }
    });

    nameInput.addEventListener('input', function () {
      if (nameInput.value.trim().length > NAME_MAX) {
        showError(nameInput, 'Name must be ' + NAME_MAX + ' characters or less');
      } else if (nameInput.classList.contains('is-error')) {
        clearError(nameInput);
      }
    });

    textarea.addEventListener('input', function () {
      if (textarea.value.length > TEXT_MAX) {
        showError(textarea, 'Message must be ' + TEXT_MAX + ' characters or less');
      } else if (textarea.classList.contains('is-error')) {
        clearError(textarea);
      }
    });

    // Validate on blur
    emailInput.addEventListener('blur', validateEmail);
    nameInput.addEventListener('blur', validateName);
    textarea.addEventListener('blur', validateTextarea);

    // Validate on submit — send via Formspree
    var submitBtn = form.querySelector('.contact-overlay__submit');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var validEmail = validateEmail();
      var validName = validateName();
      var validText = validateTextarea();
      if (!validEmail || !validName || !validText) return;

      submitBtn.classList.add('is-sending');

      var data = new FormData(form);

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          submitBtn.classList.remove('is-sending');
          if (response.ok) {
            form.classList.add('is-sent');
          } else {
            return response.json().then(function (json) {
              var msg = (json.errors && json.errors.map(function (err) { return err.message; }).join(', ')) || 'Something went wrong';
              showError(emailInput, msg);
            });
          }
        })
        .catch(function () {
          submitBtn.classList.remove('is-sending');
          showError(emailInput, 'Network error. Please try again.');
        });
    });

    // Send one more — reset form
    var againBtn = overlay.querySelector('.contact-overlay__again');
    if (againBtn) {
      againBtn.addEventListener('click', function () {
        form.reset();
        form.classList.remove('is-sent');
        clearError(emailInput);
        clearError(nameInput);
        clearError(textarea);
        if (panel) {
          panel.scrollTop = 0;
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initContactOverlay);
  } else {
    initContactOverlay();
  }
})();
