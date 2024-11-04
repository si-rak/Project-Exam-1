
document.getElementById('registerButton').addEventListener('click', function(event) {
  event.preventDefault();

  // Retrieve form data
  const name = document.getElementById('nameInput').value;
  const email = document.getElementById('emailInput').value;
  const password = document.getElementById('passwordInput').value;
  
  // Construct the data object to match the API requirements
  const registrationData = {
    name: name,           // Required
    email: email,         // Required
    password: password,   // Required
  };

  // Send data to the registration API endpoint
  fetch('https://docs.noroff.dev/docs/v2/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registrationData)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Registration successful!');
      // Redirect or perform additional actions after registration
    } else {
      alert('Registration failed: ' + data.message);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
});
