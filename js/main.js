document.addEventListener("DOMContentLoaded", function () {
    // Toggle form visibility
    function toggleForm() {
      const loginFormWrapper = document.getElementById("login-form-wrapper");
      const signupFormWrapper = document.querySelector(".form-wrapper:not(#login-form-wrapper)");
      loginFormWrapper.classList.toggle("hidden");
      signupFormWrapper.classList.toggle("hidden");
    }
  
    // Attach toggleForm to links (replace inline onclick)
    document.querySelectorAll(".switch-text a").forEach(link => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        toggleForm();
      });
    });
  
    // Handle Sign Up (with auto-login)
    const signupForm = document.getElementById("signup-form");
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("signup-name").value.trim();
      const email = document.getElementById("signup-email").value.trim();
      const password = document.getElementById("signup-password").value;
  
      if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
      }
  
      const user = { name, email, password };
      localStorage.setItem("roamUser", JSON.stringify(user));
      localStorage.setItem("loggedIn", "true");
  
      alert("Sign up successful! Redirecting to your profile...");
      window.location.href = "profile.html"; // Redirect user after sign-up
    });
  
    // Handle Login
    const loginForm = document.getElementById("login-form");
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
  
      const storedUser = JSON.parse(localStorage.getItem("roamUser"));
  
      if (storedUser && email === storedUser.email && password === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "profile.html";
      } else {
        alert("Invalid email or password.");
      }
    });
  });
  