const INTERVAL_LENGTH = 3000;

function renderRotatingConcepts() {
  var el = document.getElementById('concept');
  if (!el) return;
  var concepts = JSON.parse(el.getAttribute('data-concepts'));

  function rotate() {
    if (el.matches && el.matches(':hover')) return;
    var concept = concepts[i++ % concepts.length];
    el.innerText = concept.conceptTitle;
    el.setAttribute('title', concept.conceptDescription);
  }

  var i = 0;
  setInterval(rotate, INTERVAL_LENGTH);
  rotate();
  el.addEventListener('click', rotate);
}

renderRotatingConcepts();
