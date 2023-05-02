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

// event relatif au submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  e.stopPropagation();
  loginUser();
});

// event au mail
inputEmail.addEventListener("input", (e) => {
  inputEmail.reportValidity();
  logUser.email = e.target.value;
});

// event mdp
inputPassword.addEventListener("input", (e) => {
  inputPassword.reportValidity();
  logUser.password = e.target.value;
});

// event au chargement du DOM
document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  logUser.email = inputEmail.value;
  logUser.password = inputPassword.value;
  console.log(logUser);
});




