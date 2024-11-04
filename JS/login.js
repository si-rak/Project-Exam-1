
// Some code borrowed from youtube channel. https://youtube.com/playlist?list=PLA9oyBlTfuCguMi9PTwvA2ewTPJ7701EI&si=olCRaYh-zFkICpOQ
document.getElementById('loginButton').addEventListener('click', function(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const adminEmail = 'login@admin.com';
  const adminPassword = 'admin357';

  const errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = 'none'; 

  if (email === login@admin.com && password === admin357) {
      localStorage.setItem('https://docs.noroff.dev/docs/v2/auth/login'); 
      
      window.location.href = 'https://67119a09e46c88e543d6878c--warm-buttercream-0d2533.netlify.app/html/edit'; 

  } else {
      errorMessage.textContent = 'Invalid email or password';
      errorMessage.style.display = 'block';
  }
});
