// Party like it's 2013 (I dont want to manage a transpiler)
var HAS_SIGNED_UP = 'signed-up';

(function () {
  var popupEl = null;

  function resetPopup() {
    popupEl.removeAttribute('data-pdf-href');
  }

  function closePopup() {
    var classList = popupEl.classList;
    classList.add('hidden');
    document.documentElement.classList.remove('noscroll');
    resetPopup();
  }

  function showPdfInterstitial(pdfUrl) {
    popupEl.classList.remove('hidden');
    popupEl.setAttribute('data-pdf-href', pdfUrl);
    document.documentElement.classList.add('noscroll');
  }

  function downloadPdf(pdfUrl) {
    var link = document.createElement('a');
    link.href = pdfUrl;
    link.download = '';
    link.dispatchEvent(new MouseEvent('click'));
  }

  function handleSubmit(e) {
    e.preventDefault();
    var pdfUrl = popupEl.getAttribute('data-pdf-href');
    var formData = new FormData(e.target);
    formData.set('pdf', pdfUrl);
    var request = new XMLHttpRequest();
    request.onload = function () {
      Cookies.set(HAS_SIGNED_UP, true, { expires: 3650 });
      downloadPdf(pdfUrl);
      closePopup();
    };
    request.open('POST', '/form');
    request.send(formData);
  }

  function bind() {
    document
      .querySelectorAll('.scrim, .popup .close-button')
      .forEach(function (el) {
        el.addEventListener(
          'click',
          function (e) {
            if (e.target !== this) return;
            closePopup();
          },
          true
        );
      });

    popupEl.querySelector('form').addEventListener('submit', handleSubmit);
  }

  document.addEventListener('DOMContentLoaded', function () {
    popupEl = document.querySelector('.popup');
    bind();
    closePopup();
  });

  window.showPdfInterstitial = showPdfInterstitial;
})();
