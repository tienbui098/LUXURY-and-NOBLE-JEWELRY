// Function to handle form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector('.login-form');

  form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent the default form submission

      // Get form data
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value;

      // Validate inputs
      if (!validateInputs(username, password)) {
          return; // Stop form submission if validation fails
      }

      // Retrieve user data from localStorage
      const userData = JSON.parse(localStorage.getItem('userData'));

      // Validate credentials
      if (userData && userData.username === username && userData.password === password) {
          // Successful login
          alert("Login successful!");
          window.location.href = "Home.html"; // Redirect to Home page
      } else {
          // Invalid credentials
          alert("Invalid username or password. Please try again.");
      }
  });
});

// Function to validate inputs
function validateInputs(username, password) {
  // Check if username is empty
  if (username === "") {
      alert("Username cannot be empty.");
      return false;
  }

  // Check if password is empty
  if (password === "") {
      alert("Password cannot be empty.");
      return false;
  }

  // Check for minimum length (optional)
  if (username.length < 3) {
      alert("Username must be at least 3 characters long.");
      return false;
  }

  if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return false;
  }

  return true; // All validations passed
}