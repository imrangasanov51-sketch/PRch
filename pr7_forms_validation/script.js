document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('registrationForm');
  const inputs = form.querySelectorAll('input, textarea');
  const bioTextarea = document.getElementById('bio');
  const charCount = document.getElementById('charCount');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  if (bioTextarea && charCount) {
    bioTextarea.addEventListener('input', function () { charCount.textContent = this.value.length; });
  }
  inputs.forEach(input => {
    input.addEventListener('blur', validateField);
    input.addEventListener('input', clearError);
  });
  if (password && confirmPassword) {
    confirmPassword.addEventListener('input', validatePasswordMatch);
    password.addEventListener('input', validatePasswordMatch);
  }
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;
    inputs.forEach(input => { if (!validateField({ target: input })) isValid = false; });
    if (password && confirmPassword && !validatePasswordMatch()) isValid = false;
    if (isValid) alert('Форма успешно отправлена!');
    else alert('Исправьте ошибки');
  });
  function validateField(e) {
    const field = e.target;
    if (!field.required && !field.value.trim()) { clearErrorForField(field); return true; }
    if (!field.checkValidity()) { showErrorForField(field, getErrorMessage(field)); return false; }
    clearErrorForField(field); return true;
  }
  function validatePasswordMatch() {
    if (confirmPassword.value && password.value !== confirmPassword.value) {
      showErrorForField(confirmPassword, 'Пароли не совпадают'); return false;
    }
    clearErrorForField(confirmPassword); return true;
  }
  function getErrorMessage(field) {
    if (field.validity.valueMissing) return 'Поле обязательно';
    if (field.validity.typeMismatch && field.type === 'email') return 'Неверный email';
    if (field.validity.tooShort) return 'Минимум ' + field.minLength + ' символов';
    if (field.validity.patternMismatch && field.type === 'password') return 'Нужны заглавные, строчные, цифры';
    return 'Некорректное значение';
  }
  function showErrorForField(field, message) {
    field.classList.add('error');
    const el = document.getElementById(field.id + 'Error');
    if (el) el.textContent = message;
  }
  function clearErrorForField(field) {
    field.classList.remove('error');
    const el = document.getElementById(field.id + 'Error');
    if (el) el.textContent = '';
  }
  function clearError(e) { clearErrorForField(e.target); }
});
