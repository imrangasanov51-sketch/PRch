import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Contact from './pages/Contact';
import ContactSuccess from './pages/ContactSuccess';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <header className="header">
        <h1>ПР18: React — маршрутизация</h1>
        <nav style={{ marginTop: 10 }}>
          <NavLink to="/" className="nav-link">Главная</NavLink>
          <NavLink to="/about" className="nav-link">О нас</NavLink>
          <NavLink to="/products" className="nav-link">Товары</NavLink>
          <NavLink to="/contact" className="nav-link">Контакты</NavLink>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-success" element={<ContactSuccess />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
