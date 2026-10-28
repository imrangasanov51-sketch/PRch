import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const products = {
  1: { name: 'Ноутбук', price: 75000, description: 'Мощный ноутбук для работы и учёбы.' },
  2: { name: 'Смартфон', price: 45000, description: 'Современный смартфон с отличной камерой.' },
  3: { name: 'Наушники', price: 5000, description: 'Беспроводные наушники с шумоподавлением.' },
  4: { name: 'Монитор', price: 22000, description: 'IPS-монитор 27 дюймов с точной цветопередачей.' },
  5: { name: 'Клавиатура', price: 3500, description: 'Механическая клавиатура с подсветкой.' }
};

export default function ProductDetail() {
  const { id } = useParams();      // параметр из URL
  const navigate = useNavigate();  // программная навигация
  const product = products[id];

  if (!product) {
    return (
      <section className="card">
        <h2>Товар не найден</h2>
        <button onClick={() => navigate('/products')}>← Назад к товарам</button>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>{product.name}</h2>
      <p><strong>Цена:</strong> {product.price.toLocaleString('ru-RU')} ₽</p>
      <p>{product.description}</p>
      <p style={{ color: '#888', fontSize: '.85rem' }}>ID товара из URL: {id}</p>
      <button onClick={() => navigate('/products')}>← Назад к товарам</button>
    </section>
  );
}
