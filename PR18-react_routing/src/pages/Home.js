import React from 'react';

export default function Home() {
  return (
    <section className="card">
      <h2>Главная страница</h2>
      <p>Добро пожаловать в демо-приложение маршрутизации React Router!</p>
      <p>Используйте навигацию выше для перехода между страницами.</p>
      <ul>
        <li><strong>/</strong> — главная (этот компонент)</li>
        <li><strong>/about</strong> — информация о проекте</li>
        <li><strong>/products</strong> — список товаров</li>
        <li><strong>/products/:id</strong> — детали товара с параметром URL</li>
        <li><strong>/contact</strong> — форма с программной навигацией</li>
      </ul>
    </section>
  );
}
