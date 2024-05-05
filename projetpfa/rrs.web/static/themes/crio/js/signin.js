function authenticateUserWithFlask(email, password) {
    // Make a POST request to your Flask endpoint to authenticate the user
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // Change content type
        },
        body: new URLSearchParams({
            'email': email,
            'password': password
        }).toString(),
    })
    .then(response => {
        if (!response.ok) {
            // Authentication failed, display error message
            var credentialsError = document.getElementById("backenderror");
            credentialsError.textContent = "Invalid email or password";
            credentialsError.style.color = "red";
        }
        else{
            window.location.href="/dashboard"
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  
function validateForm() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var emailError = document.getElementById("email-error");
  var passwordError = document.getElementById("password-error");
  var credentialsError = document.getElementById("backenderror");
  
  // Reset previous error messages
  emailError.textContent = "";
  passwordError.textContent = "";
  credentialsError.textContent = "";
  
  if (email == "") {
      emailError.textContent = "Please enter your email";
      emailError.style.color = "red"; // Set error message color
      return;
  }
  
  if (password == "") {
      passwordError.textContent = "Please enter your password";
      passwordError.style.color = "red"; // Set error message color
      return;
  }

  // If email and password are provided, authenticate the user with Flask
  authenticateUserWithFlask(email, password);
}
