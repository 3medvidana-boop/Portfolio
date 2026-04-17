/* ==========================================================================
   Projects — pagination & case switching
   ========================================================================== */
(function () {
  var pageBtns = document.querySelectorAll('.projects__page-btn[data-page]');
  var prevBtn = document.querySelector('.projects__page-btn--prev');
  var nextBtn = document.querySelector('.projects__page-btn--next');
  var cases = document.querySelectorAll('.projects__case[data-case]');
  var previews = document.querySelectorAll('.projects__preview-img[data-case]');

  if (!pageBtns.length) return;

  function setActivePage(page) {
    /* Update pagination buttons */
    pageBtns.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.dataset.page === String(page));
    });

    /* Update focused case */
    cases.forEach(function (c) {
      c.classList.toggle('is-focused', c.dataset.case === String(page));
    });

    /* Update preview image */
    previews.forEach(function (img) {
      img.classList.toggle('is-active', img.dataset.case === String(page));
    });
  }

  /* Number buttons */
  pageBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setActivePage(Number(btn.dataset.page));
    });
  });

  /* Prev / Next arrows */
  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      var current = document.querySelector('.projects__page-btn.is-active');
      var page = current ? Number(current.dataset.page) : 1;
      var prev = page > 1 ? page - 1 : pageBtns.length;
      setActivePage(prev);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      var current = document.querySelector('.projects__page-btn.is-active');
      var page = current ? Number(current.dataset.page) : 1;
      var next = page < pageBtns.length ? page + 1 : 1;
      setActivePage(next);
    });
  }
})();
