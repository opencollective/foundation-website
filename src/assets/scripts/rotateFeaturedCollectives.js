const INTERVAL_LENGTH = 3000;

function renderRotatingConcepts() {
  var script = document.currentScript;
  var sectionEl = script.parentElement;
  var collectives = JSON.parse(
    script.getAttribute('data-featured-collectives')
  );

  const collectiveNameEls = sectionEl.querySelectorAll('.collective-name');
  const heroImageEls = sectionEl.querySelectorAll('.collective-hero-image');

  function rotate() {
    var collective = collectives[i++ % collectives.length];
    collectiveNameEls.forEach((collectiveNameEl) => {
      collectiveNameEl.innerText = collective.name;
    });

    heroImageEls.forEach((heroImageEl) => {
      heroImageEl.setAttribute('src', collective.heroImage);

      if (collective.heroImageAlt)
        heroImageEl.setAttribute('alt', collective.heroImageAlt);
      else heroImageEl.removeAttribute('alt');
    });
  }

  var i = 0;
  setInterval(rotate, INTERVAL_LENGTH);
  rotate();
  collectiveNameEl.addEventListener('click', rotate);
}

renderRotatingConcepts();
