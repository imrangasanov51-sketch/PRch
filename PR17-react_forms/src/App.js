import React from 'react';
import UserRegistrationForm from './components/UserRegistrationForm';
import UserRegistrationFormWithValidation from './components/UserRegistrationFormWithValidation';
import ContactFormUncontrolled from './components/ContactFormUncontrolled';

function App() {
  return (
    <div>
      <header className="header">
        <h1>ПР17: React — работа с формами</h1>
      </header>
      <main className="container">
        <section className="card">
          <h2>Задание 1: Управляемая форма регистрации</h2>
          <UserRegistrationForm />
        </section>
        <section className="card">
          <h2>Задание 2: Форма с валидацией</h2>
          <UserRegistrationFormWithValidation />
        </section>
        <section className="card">
          <h2>Задание 3: Неуправляемая форма (useRef)</h2>
          <ContactFormUncontrolled />
        </section>
      </main>
    </div>
  );
}

export default App;
