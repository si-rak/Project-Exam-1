document.getElementById('loginButton').addEventListener('click', function() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const adminEmail = 'login@admin.com';
  const adminPassword = 'admin357';

  const errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = 'none'; 

  if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('authToken', 'your-token-here');
      alert('Login successful!'); 
  } else {
      errorMessage.style.display = 'block';
  }
});
