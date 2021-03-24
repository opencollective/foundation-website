DEMO = false;
document.addEventListener('DOMContentLoaded', function () {
  const els = document.querySelectorAll('a[data-use-interstitial]');
  els.forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (!DEMO && Cookies.get('signed-up')) return true;
      window.showPdfInterstitial(el.getAttribute('href'));
      e.preventDefault();
    });
  });
});
