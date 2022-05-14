const INTERVAL_LENGTH = 3000;

function renderRotatingConcepts() {
  var script = document.currentScript;
  var sectionEl = script.parentElement;
  var collectives = JSON.parse(
    script.getAttribute('data-featured-collectives')
  );

  const collectiveNameEl = sectionEl.querySelector('.collective-name');
  const heroImageEl = sectionEl.querySelector('.collective-hero-image');

  function rotate() {
    var collective = collectives[i++ % collectives.length];
    collectiveNameEl.innerText = collective.name;
    heroImageEl.setAttribute('src', collective.heroImage);

    if (collective.heroImageAlt)
      heroImageEl.setAttribute('alt', collective.heroImageAlt);
    else heroImageEl.removeAttribute('alt');
  }

  var i = 0;
  setInterval(rotate, INTERVAL_LENGTH);
  rotate();
  collectiveNameEl.addEventListener('click', rotate);
}

renderRotatingConcepts();
