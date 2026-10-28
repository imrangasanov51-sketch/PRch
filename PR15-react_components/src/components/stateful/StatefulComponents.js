import React, { Component } from 'react';

// ================= ЗАДАНИЕ 3: Классовые компоненты =================

// 3.1. Counter — счётчик
export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  increment = () => this.setState({ count: this.state.count + 1 });
  decrement = () => this.setState({ count: this.state.count - 1 });
  render() {
    return (
      <div style={{ margin: '8px 0' }}>
        <h3>Счётчик: {this.state.count}</h3>
        <button onClick={this.increment}>+1</button>
        <button onClick={this.decrement}>-1</button>
        <button onClick={() => this.setState({ count: 0 })}>Сброс</button>
      </div>
    );
  }
}

// 3.2. LoginForm — форма входа с валидацией
export class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', errors: {} };
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  validate = () => {
    const errors = {};
    if (!this.state.email.includes('@')) errors.email = 'Введите корректный email';
    if (this.state.password.length < 6) errors.password = 'Пароль минимум 6 символов';
    return errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      alert(`Вход выполнен: ${this.state.email}`);
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: '8px 0' }}>
        <h3>Форма входа</h3>
        <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
        {this.state.errors.email && <p className="error-text">{this.state.errors.email}</p>}
        <br />
        <input name="password" type="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange} />
        {this.state.errors.password && <p className="error-text">{this.state.errors.password}</p>}
        <br />
        <button type="submit">Войти</button>
      </form>
    );
  }
}

// 3.3. ColorPicker — выбор цвета
export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
    this.colors = ['#e53935', '#1e88e5', '#43a047', '#fdd835', '#8e24aa'];
  }
  render() {
    return (
      <div style={{ margin: '8px 0' }}>
        <h3>Выбор цвета</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          {this.colors.map(c => (
            <div
              key={c}
              onClick={() => this.setState({ selected: c })}
              style={{
                width: 32, height: 32, background: c, borderRadius: 6, cursor: 'pointer',
                border: this.state.selected === c ? '3px solid #000' : '1px solid #ccc'
              }}
            />
          ))}
        </div>
        {this.state.selected && (
          <p>Выбран цвет: <strong style={{ color: this.state.selected }}>{this.state.selected}</strong></p>
        )}
      </div>
    );
  }
}

// ================= ЗАДАНИЕ 4: События и формы =================

// 4.1. TodoList — список задач
export class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], input: '' };
  }
  addTask = () => {
    if (!this.state.input.trim()) return;
    this.setState({
      tasks: [...this.state.tasks, { id: Date.now(), text: this.state.input, done: false }],
      input: ''
    });
  };
  toggleTask = (id) => {
    this.setState({
      tasks: this.state.tasks.map(t => t.id === id ? { ...t, done: !t.done } : t)
    });
  };
  removeTask = (id) => {
    this.setState({ tasks: this.state.tasks.filter(t => t.id !== id) });
  };
  render() {
    return (
      <div style={{ margin: '8px 0' }}>
        <h3>Список задач</h3>
        <input
          value={this.state.input}
          onChange={e => this.setState({ input: e.target.value })}
          placeholder="Новая задача"
        />
        <button onClick={this.addTask}>Добавить</button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {this.state.tasks.map(t => (
            <li key={t.id} style={{ margin: '4px 0' }}>
              <span
                onClick={() => this.toggleTask(t.id)}
                style={{ textDecoration: t.done ? 'line-through' : 'none', cursor: 'pointer' }}
              >
                {t.text}
              </span>
              {' '}
              <button onClick={() => this.removeTask(t.id)}>✕</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

// 4.2. SearchBox — поиск с результатами
export class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '', results: [] };
    this.data = ['Яблоко', 'Банан', 'Апельсин', 'Груша', 'Киви', 'Манго'];
  }
  handleSearch = (e) => {
    const query = e.target.value;
    const results = query
      ? this.data.filter(item => item.toLowerCase().includes(query.toLowerCase()))
      : [];
    this.setState({ query, results });
  };
  clear = () => this.setState({ query: '', results: [] });
  render() {
    return (
      <div style={{ margin: '8px 0' }}>
        <h3>Поиск</h3>
        <input value={this.state.query} onChange={this.handleSearch} placeholder="Поиск фрукта..." />
        {this.state.query && <button onClick={this.clear}>Очистить</button>}
        <ul>
          {this.state.results.map((r, i) => <li key={i}>{r}</li>)}
        </ul>
        {this.state.query && this.state.results.length === 0 && <p>Ничего не найдено</p>}
      </div>
    );
  }
}
