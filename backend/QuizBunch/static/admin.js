function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

  const username = usernameInput.value;
  const password = passwordInput.value;

  // Check admin credentials (in a real scenario, this should be done on the server)
  if (username === "admin" && password === "admin123") {
    // Successful login, redirect to admin dashboard or perform other actions
    alert("Login successful! Redirecting to admin dashboard...");
    // You can redirect to another page or perform other actions here
  } else {
    // Display error message for unsuccessful login
    errorMessage.innerText = "Invalid username or password. Please try again.";
  }
}
