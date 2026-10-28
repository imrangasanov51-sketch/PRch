import React from 'react';
import { Link } from 'react-router-dom';

const products = [
  { id: 1, name: 'Ноутбук', price: 75000 },
  { id: 2, name: 'Смартфон', price: 45000 },
  { id: 3, name: 'Наушники', price: 5000 },
  { id: 4, name: 'Монитор', price: 22000 },
  { id: 5, name: 'Клавиатура', price: 3500 }
];

export default function Products() {
  return (
    <section className="card">
      <h2>Товары</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(p => (
          <li key={p.id} style={{ margin: '8px 0' }}>
            <Link to={`/products/${p.id}`}>{p.name}</Link> — {p.price.toLocaleString('ru-RU')} ₽
          </li>
        ))}
      </ul>
    </section>
  );
}
