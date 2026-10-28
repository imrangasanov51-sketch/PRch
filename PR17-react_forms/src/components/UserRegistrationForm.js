import React, { useState } from 'react';

// ================= ЗАДАНИЕ 1: Управляемая форма регистрации =================
export default function UserRegistrationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'male',
    subscribe: false,
    age: '',
    about: ''
  });
  const [submitted, setSubmitted] = useState(null);

  // Единый обработчик для всех полей
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(form);
    console.log('Данные формы:', form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label><br />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Ваше имя" />
      </div>
      <div>
        <label>Email:</label><br />
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" />
      </div>
      <div>
        <label>Пароль:</label><br />
        <input name="password" type="password" value={form.password} onChange={handleChange} />
      </div>
      <div>
        <label>Подтверждение пароля:</label><br />
        <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
      </div>
      <div>
        <label>Пол:</label><br />
        <label><input type="radio" name="gender" value="male" checked={form.gender === 'male'} onChange={handleChange} /> Мужской</label>
        <label><input type="radio" name="gender" value="female" checked={form.gender === 'female'} onChange={handleChange} /> Женский</label>
      </div>
      <div>
        <label>
          <input type="checkbox" name="subscribe" checked={form.subscribe} onChange={handleChange} />
          Подписаться на рассылку
        </label>
      </div>
      <div>
        <label>Возраст:</label><br />
        <select name="age" value={form.age} onChange={handleChange}>
          <option value="">-- Выберите возраст --</option>
          <option value="18-25">18-25</option>
          <option value="26-35">26-35</option>
          <option value="36-50">36-50</option>
          <option value="50+">50+</option>
        </select>
      </div>
      <div>
        <label>О себе:</label><br />
        <textarea name="about" value={form.about} onChange={handleChange} rows={4} placeholder="Расскажите о себе..." />
      </div>
      <button type="submit">Зарегистрироваться</button>

      {submitted && (
        <div style={{ marginTop: 16, padding: 12, background: '#e8f5e9', borderRadius: 8 }}>
          <h4>Отправленные данные:</h4>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </form>
  );
}
