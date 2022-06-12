const INTERVAL_LENGTH = 3000;

function renderRotatingCollectives() {
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
      const nameTextEl = document.createTextNode(collective.name);
      if (collective.url) {
        const linkEl = document.createElement('a');
        linkEl.setAttribute('target', '_blank');
        linkEl.setAttribute('href', collective.url);
        linkEl.append(nameTextEl);
        collectiveNameEl.replaceChildren(linkEl);
      } else {
        collectiveNameEl.replaceChildren(nameTextEl);
      }
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

renderRotatingCollectives();
