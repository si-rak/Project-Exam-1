// Some code borrowed from youtube channel. https://youtube.com/playlist?list=PLA9oyBlTfuCguMi9PTwvA2ewTPJ7701EI&si=olCRaYh-zFkICpOQ
document
  .getElementById('loginButton')
  .addEventListener('click', async function (event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const errorMessage = document.getElementById('errorMessage');

    errorMessage.style.display = 'none';

    try {
      const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('userName', data.data.name);

        const examplePostId = 'be2582e1-d624-4bd7-bf4f-e27c18ea35e5';
        window.location.href = `/post/edit.html?id=${examplePostId}`;
      } else {
        errorMessage.textContent =
          data.errors?.[0]?.message || 'Invalid login credentials.';
        errorMessage.style.display = 'block';
      }
    } catch (error) {
      console.error('Login error:', error);
      errorMessage.textContent = 'Something went wrong. Please try again.';
      errorMessage.style.display = 'block';
    }
  });
