function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const url = form.getAttribute('action');
  const data = new FormData(form);
  const email = data.get('email');

  const request = new Request(`/api/newsletter`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  fetch(request).then(function (resp) {
    if (resp.ok) {
      form.classList.add('submitted');
    }
  });

  return false;
}

function bindSignupForm() {
  const els = document.querySelectorAll('form.sign-up-form');
  els.forEach(function (el) {
    el.addEventListener('submit', handleFormSubmit);
  });
}

bindSignupForm();
