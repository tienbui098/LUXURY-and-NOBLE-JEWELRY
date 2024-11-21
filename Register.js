// Function to handle form submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('.login-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form data
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value; // Thêm dòng này để lấy địa chỉ
        const phoneNumber = document.getElementById('phoneNumber').value;
        const gender = document.querySelector('input[name="gender"]:checked') ? document.querySelector('input[name="gender"]:checked').value : '';
        const dateOfBirth = document.getElementById('dateOfBirth').value;

        // Validate input fields
        if (!validateInputs(username, password, email, address, phoneNumber, dateOfBirth)) {
            return; // Stop form submission if validation fails
        }

        // Create a user object
        const user = {
            username,
            password,
            email,
            address, // Thêm địa chỉ vào đối tượng người dùng
            phoneNumber,
            gender,
            dateOfBirth
        };

        // Store user data in localStorage
        localStorage.setItem('userData', JSON.stringify(user));

        form.reset(); 

        // Optional: Redirect to Login page or display a success message
        alert("Registration successful!");
        // window.location.href = "Login.html"; // Uncomment to redirect after registration
    });
});

// Function to validate inputs
function validateInputs(username, password, email, address, phoneNumber, dateOfBirth) {
    // Username validation
    if (username.length < 3) {
        alert("Username must be at least 3 characters long.");
        return false;
    }

    // Password validation (at least 6 characters)
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return false;
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    // Address validation (not empty)
    if (address.trim() === "") {
        alert("Address cannot be empty.");
        return false;
    }

    // Phone number validation (digits only and must be 10 digits)
    const phonePattern = /^\d{10}$/; 
    if (!phonePattern.test(phoneNumber)) {
        alert("Phone number must be exactly 10 digits.");
        return false;
    }

    // Date of birth validation (must be a valid date and in the past)
    const dob = new Date(dateOfBirth);
    const today = new Date();
    if (dob >= today) {
        alert("Date of birth must be in the past.");
        return false;
    }

    return true; // All validations passed
}