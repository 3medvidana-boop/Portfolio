document.addEventListener('DOMContentLoaded', function () {
  var backBtn = document.querySelector('.footer__back');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      var hero = document.querySelector('.hero');
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});
