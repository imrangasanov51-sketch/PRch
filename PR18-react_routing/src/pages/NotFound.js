import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="card">
      <h2>404 — Страница не найдена</h2>
      <p>Запрошенный маршрут не существует.</p>
      <Link to="/">← Вернуться на главную</Link>
    </section>
  );
}
