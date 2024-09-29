document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
// Some code borrowed from youtube channel, https://youtu.be/rsd4FNGTRBw?si=PiHgJ5CfROsZFQDq
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const validationMessage = document.getElementById('validationMessage');
  const successMessage = document.getElementById('successMessage');

  if (password !== confirmPassword) {
      validationMessage.textContent = 'Passwords do not match.';
      validationMessage.style.display = 'block';
      successMessage.style.display = 'none';
      return;
  }

  validationMessage.style.display = 'none';
  successMessage.style.display = 'block';
});
