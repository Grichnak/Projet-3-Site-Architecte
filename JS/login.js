const loginUrl = "http://localhost:5678/api/users/login";
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const submitBtn = document.querySelector("input[type='submit']");
const form = document.getElementById("loginForm");
const loginError = document.querySelector(".loginError");
const passwordError = document.querySelector(".passwordError");

const logUser = {
  email: "",
  password: "",
};

// Evenement au Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  loginUser();
});

// Evenement au Mai
inputEmail.addEventListener("input", (e) => {
  //inputEmail.setCustomValidity("nooooooo");
  inputEmail.reportValidity();
  logUser.email = e.target.value;
});

// Evenement au Password
inputPassword.addEventListener("input", (e) => {
  //inputEmail.setCustomValidity("nooooooo");
  inputPassword.reportValidity();
  logUser.password = e.target.value;
});

//Evenement au chargement du DOM
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  logUser.email = inputEmail.value;
  logUser.password = inputPassword.value;
  console.log(logUser);
});

// Fetch la route user


