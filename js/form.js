document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  const formSuccess = document.getElementById('form-success');
  const formFailed = document.getElementById('form-failed');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.classList.remove('show');
      formFailed.classList.remove('show');

      const { name, email, phone, subject, message, data } = validateForm();

      // If any of the fields are empty, return
      if (
        name === '' ||
        email === '' ||
        phone === '' ||
        subject === '' ||
        message === ''
      ) {
        return;
      }

      fetch('/submit-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log('Success:', data);
          if (data.success) {
            form.reset();
            formSuccess.classList.add('show');
          } else {
            formFailed.classList.add('show');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
          formFailed.classList.add('show');
        });
    });

    // Add event listener to remove error class when input is focused
    document.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('focusout', function () {
        validateForm();
      });
    });
  }
});

function validateForm() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const data = { name, email, phone, subject, message };

  // Simple validation example
  if (name === '') {
    // Add error handling, like highlighting the input field, showing an error message, etc.
  }

  return { name, email, phone, subject, message, data };
}