
// Some code borrowed from youtube channel. https://youtube.com/playlist?list=PLA9oyBlTfuCguMi9PTwvA2ewTPJ7701EI&si=olCRaYh-zFkICpOQ
document.getElementById('loginButton').addEventListener('click', function(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const adminEmail = 'login@admin.com';
  const adminPassword = 'admin357';

  const errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = 'none'; 

  if (email === adminEmail && password === adminPassword) {
      localStorage.setItem('authToken', 'your-token-here'); 
      
      window.location.href = 'https://voluble-narwhal-669edf.netlify.app/login'; 

  } else {
      errorMessage.textContent = 'Invalid email or password';
      errorMessage.style.display = 'block';
  }
});
