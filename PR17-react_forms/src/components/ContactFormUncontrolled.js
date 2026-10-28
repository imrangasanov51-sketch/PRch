import React, { useRef, useState } from 'react';

// ================= ЗАДАНИЕ 3: Неуправляемая форма (useRef) =================
export default function ContactFormUncontrolled() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value
    };
    console.log('Неуправляемая форма:', data);
    setSent(true);
    e.target.reset(); // сброс DOM-полей
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя:</label><br />
        <input ref={nameRef} name="name" placeholder="Ваше имя" />
      </div>
      <div>
        <label>Email:</label><br />
        <input ref={emailRef} name="email" type="email" placeholder="email@example.com" />
      </div>
      <div>
        <label>Сообщение:</label><br />
        <textarea ref={messageRef} name="message" rows={4} placeholder="Ваше сообщение..." />
      </div>
      <button type="submit">Отправить</button>
      {sent && <p className="success-text">✅ Сообщение отправлено!</p>}
      <p style={{ fontSize: '.85rem', color: '#666', marginTop: 8 }}>
        Значения полей читаются напрямую из DOM через ref, React не контролирует их состояние.
      </p>
    </form>
  );
}
