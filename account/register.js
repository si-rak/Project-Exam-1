document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const validationMessage = document.getElementById('validationMessage');

    validationMessage.style.display = 'none';
    validationMessage.textContent = '';

    if (!email.endsWith('@stud.noroff.no')) {
      validationMessage.textContent =
        'Email must be a @stud.noroff.no address.';
      validationMessage.style.display = 'block';
      return;
    }

    if (password.length < 8) {
      validationMessage.textContent = 'Password must be at least 8 characters.';
      validationMessage.style.display = 'block';
      return;
    }

    if (password !== confirmPassword) {
      validationMessage.textContent = 'Passwords do not match.';
      validationMessage.style.display = 'block';
      return;
    }

    const name = fullName.replace(/\s+/g, '_').toLowerCase();

    const registrationData = {
      name: name,
      email: email,
      password: password,
    };

    fetch('https://v2.api.noroff.dev/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          const message = data.errors.map((err) => err.message).join(', ');
          validationMessage.textContent = '❌ Registration failed: ' + message;
          validationMessage.style.display = 'block';
          return;
        }

        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => {
          alert('✅ Registration successful!');
          window.location.href = 'login.html';
        }, 1000);
      })
      .catch((error) => {
        console.error('Error:', error);
        validationMessage.textContent =
          '❌ Unexpected error. Please try again.';
        validationMessage.style.display = 'block';
      });
  });
