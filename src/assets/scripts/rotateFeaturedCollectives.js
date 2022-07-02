const INTERVAL_LENGTH = 8 * 1000;

function renderRotatingCollectives() {
  var script = document.currentScript;
  var sectionEl = script.parentElement;
  var collectives = JSON.parse(
    script.getAttribute('data-featured-collectives')
  );

  const collectiveNameEls = sectionEl.querySelectorAll('.collective-name');

  function rotate() {
    const lastI = i % collectives.length;
    const curI = ++i % collectives.length;
    var collective = collectives[curI];
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

    // Images are already in html, this script just changes the style.display property

    // hide image element with last index
    const prevImageEls = sectionEl.querySelectorAll(
      `.collective-hero-image[data-index="${lastI}"]`
    );
    prevImageEls.forEach((imageEl) => {
      imageEl.style.setProperty('display', 'none', 'important');
    });

    // show image element matching new index
    const curImageEls = sectionEl.querySelectorAll(
      `.collective-hero-image[data-index="${curI}"]`
    );
    curImageEls.forEach((imageEl) => {
      imageEl.style.removeProperty('display');
    });
  }

  var i = -1;
  setInterval(rotate, INTERVAL_LENGTH);
  rotate();
}

renderRotatingCollectives();
