/* ==========================================================================
   Competences — card accordion toggle (tablet / mobile)
   ========================================================================== */

document.querySelectorAll('.competences__card-toggle').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var card = btn.closest('.competences__card');
    card.classList.toggle('is-open');
  });
});
