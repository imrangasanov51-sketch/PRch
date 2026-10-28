import React from 'react';

// ================= ЗАДАНИЕ 1: Функциональные компоненты =================

// 1.1. WelcomeMessage — приветствие с name и age
export function WelcomeMessage({ name, age }) {
  return (
    <p>
      Привет, <strong>{name}</strong>! Тебе {age} год(а).
    </p>
  );
}

// 1.2. UserCard — карточка пользователя
export function UserCard({ user }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: 8, padding: 12, margin: '8px 0', maxWidth: 320 }}>
      <img src={user.avatar} alt={user.name} style={{ borderRadius: '50%', width: 60, height: 60 }} />
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <span className={user.isOnline ? 'badge online' : 'badge offline'}>
        {user.isOnline ? 'В сети' : 'Не в сети'}
      </span>
    </div>
  );
}

// 1.3. Button — кнопка с variant, size, onClick, children
export function Button({ variant = 'primary', size = 'medium', onClick, children }) {
  const styles = {
    primary: { background: '#20232a', color: '#61dafb' },
    secondary: { background: '#e0e0e0', color: '#333' }
  };
  const sizes = {
    small: { padding: '6px 12px', fontSize: '.8rem' },
    medium: { padding: '10px 16px', fontSize: '.9rem' },
    large: { padding: '14px 22px', fontSize: '1rem' }
  };
  return (
    <button
      style={{ ...styles[variant], ...sizes[size], border: 'none', borderRadius: 6, cursor: 'pointer', margin: 4 }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

// ================= ЗАДАНИЕ 2: Children и условный рендеринг =================

// 2.1. Card — карточка с title и children
export function Card({ title, children }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, margin: '8px 0', background: '#fafbfc' }}>
      <h3 style={{ marginBottom: 8 }}>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// 2.2. Toggle — показывает/скрывает children по клику
export class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { visible: false };
  }
  render() {
    return (
      <div style={{ margin: '8px 0' }}>
        <Button onClick={() => this.setState({ visible: !this.state.visible })}>
          {this.state.visible ? 'Скрыть' : 'Показать'} контент
        </Button>
        {this.state.visible && <div style={{ marginTop: 8 }}>{this.props.children}</div>}
      </div>
    );
  }
}

// 2.3. ConditionalMessage — сообщение по статусу
export function ConditionalMessage({ status }) {
  const messages = {
    success: <p className="success-text">✅ Операция прошла успешно!</p>,
    error: <p className="error-text">❌ Произошла ошибка!</p>,
    warning: <p style={{ color: '#f57c00' }}>⚠️ Внимание, предупреждение!</p>
  };
  return messages[status] || <p>ℹ️ Неизвестный статус: {status}</p>;
}
