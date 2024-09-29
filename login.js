document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
// Some code borrowed from youtube channel, https://youtu.be/In0nB0ABaUk?si=-58NjbIuE7agke6U
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const validationMessage = document.getElementById('validationMessage');

  if (email !== "test@example.com" || password !== "password") {
      validationMessage.textContent = 'Invalid email or password';
      validationMessage.style.display = 'block';
      return;
  }

  validationMessage.style.display = 'none';
  alert("Login successful!");
});
