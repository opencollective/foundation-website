const DOCS_URL_KEY = 'docs';

function goToDocsUrl() {
  const qs = new URLSearchParams(location.search);
  const maybeDocsPath = qs.get(DOCS_URL_KEY);

  if (!maybeDocsPath) {
    return;
  }

  const docsFrame = document.getElementById('docs-frame');
  docsFrame.src += maybeDocsPath;

  // Otherwise scroll jumps up
  setTimeout(() => {
    docsFrame.scrollIntoView();
  }, 500);
}

goToDocsUrl();
