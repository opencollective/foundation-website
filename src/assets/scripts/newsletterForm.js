function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const url = form.getAttribute('action');
  const formData = new FormData(form);
  const bodyJson = {
    email: formData.get('email'),
  };

  fetch(url, {
    method: 'POST',
    body: JSON.stringify(bodyJson),
  }).then(function (resp) {
    if (resp.ok) form.classList.add('submitted');
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
