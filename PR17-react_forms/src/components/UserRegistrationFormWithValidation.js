import React, { useState } from 'react';

// ================= ЗАДАНИЕ 2: Форма регистрации с валидацией =================
export default function UserRegistrationFormWithValidation() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    subscribe: false,
    age: '',
    about: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Очищаем ошибку поля при вводе
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Имя обязательно';
    if (!form.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Некорректный формат email';
    }
    if (!form.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (form.password.length < 8) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
    }
    if (!form.gender) newErrors.gender = 'Выберите пол';
    if (!form.age) newErrors.age = 'Выберите возраст';
    if (!form.about.trim()) newErrors.about = 'Расскажите о себе';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSubmitted(false);
      return;
    }
    setErrors({});
    setSubmitted(true);
    console.log('Валидация пройдена:', form);
  };

  const err = (field) => errors[field] ? <p className="error-text">{errors[field]}</p> : null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label>Имя *:</label><br />
        <input name="name" value={form.name} onChange={handleChange} />
        {err('name')}
      </div>
      <div>
        <label>Email *:</label><br />
        <input name="email" type="email" value={form.email} onChange={handleChange} />
        {err('email')}
      </div>
      <div>
        <label>Пароль * (минимум 8 символов):</label><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} />
        {err('password')}
      </div>
      <div>
        <label>Подтверждение пароля *:</label><br />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
        {err('confirmPassword')}
      </div>
      <div>
        <label>Пол *:</label><br />
        <label><input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} /> Женский</label>
        {err('gender')}
      </div>
      <div>
        <label>
          <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} />
          Подписаться на рассылку
        </label>
      </div>
      <div>
        <label>Возраст *:</label><br />
        <select name="age" value={form.age} onChange={handleChange}>
          <option value="">-- Выберите возраст --</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="50+">50+</option>
        </select>
        {err('age')}
      </div>
      <div>
        <label>О себе *:</label><br />
        <textarea name="about" value={form.about} onChange={handleChange} rows={4} />
        {err('about')}
      </div>
      <button type="submit">Зарегистрироваться</button>

      {submitted && <p className="success-text">✅ Форма успешно отправлена!</p>}
    </form>
  );
}
