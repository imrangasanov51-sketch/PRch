import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function ContactSuccess() {
  const location = useLocation();
  const name = location.state?.name || 'пользователь';

  return (
    <section className="card">
      <h2>Сообщение отправлено!</h2>
      <p>Спасибо, {name}! Ваше сообщение успешно отправлено.</p>
      <p>Имя передано через location.state программной навигации.</p>
      <Link to="/">← На главную</Link>
    </section>
  );
}
