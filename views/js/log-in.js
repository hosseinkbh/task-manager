const loginWithEmail = document.getElementById('loginWithEmail');
const loginWithPhone = document.getElementById('loginWithPhone');
const emailField = document.querySelector('.email-field');
const phoneField = document.querySelector('.phone-field');

loginWithEmail.addEventListener('change', function () {
    if (loginWithEmail.checked) {
        emailField.classList.remove('hidden');
        emailField.classList.add('visible');
        phoneField.classList.remove('visible');
        phoneField.classList.add('hidden');
        document.getElementById('email').setAttribute('required', 'true');
        document.getElementById('phoneNumber').removeAttribute('required');
    }
});

loginWithPhone.addEventListener('change', function () {
    if (loginWithPhone.checked) {
        phoneField.classList.remove('hidden');
        phoneField.classList.add('visible');
        emailField.classList.remove('visible');
        emailField.classList.add('hidden');
        document.getElementById('phoneNumber').setAttribute('required', 'true');
        document.getElementById('email').removeAttribute('required');
    }
});
