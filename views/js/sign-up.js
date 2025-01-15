form.addEventListener('submit', function (e) {
  const form = document.getElementById('signupForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const passwordError = document.getElementById('passwordError');
  if (password.value !== confirmPassword.value) {
    e.preventDefault();
    passwordError.style.display = 'block';
  } else {
    passwordError.style.display = 'none';
    delete confirmPassword;
  }
});
