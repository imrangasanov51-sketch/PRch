import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Программная навигация + передача состояния через location.state
    navigate('/contact-success', { state: { name: form.name } });
  };

  return (
    <section className="card">
      <h2>Связаться с нами</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label><br />
          <input name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Email:</label><br />
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <label>Сообщение:</label><br />
          <textarea name="message" rows={4} value={form.message} onChange={handleChange} required />
        </div>
        <button type="submit">Отправить</button>
      </form>
    </section>
  );
}
