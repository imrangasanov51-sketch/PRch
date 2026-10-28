import React, { Component } from 'react';

// ================= ЗАДАНИЕ 5: Жизненный цикл =================

// 5.1. Timer — секундомер (componentDidMount, componentWillUnmount)
export class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0, running: false };
    this.intervalId = null;
  }
  start = () => {
    if (this.intervalId) return;
    this.setState({ running: true });
    this.intervalId = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  };
  stop = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.setState({ running: false });
  };
  reset = () => {
    this.stop();
    this.setState({ seconds: 0 });
  };
  componentDidMount() {
    console.log('Timer: componentDidMount');
  }
  componentWillUnmount() {
    this.stop();
    console.log('Timer: componentWillUnmount');
  }
  render() {
    return (
      <div style={{ margin: '8px 0' }}>
        <h3>Секундомер: {this.state.seconds} сек</h3>
        <button onClick={this.start} disabled={this.state.running}>Старт</button>
        <button onClick={this.stop} disabled={!this.state.running}>Стоп</button>
        <button onClick={this.reset}>Сброс</button>
      </div>
    );
  }
}

// 5.2. WindowSizeTracker — размер окна
export class WindowSizeTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { width: window.innerWidth, height: window.innerHeight };
  }
  handleResize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  render() {
    return (
      <p>Размер окна: {this.state.width} × {this.state.height}</p>
    );
  }
}

// 5.3. DataFetcher — загрузка данных с API
export class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, loading: false, error: null };
  }
  fetchData = async (userId) => {
    this.setState({ loading: true, error: null });
    try {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const user = await res.json();
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };
  componentDidMount() {
    this.fetchData(this.props.userId);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchData(this.props.userId);
    }
  }
  render() {
    if (this.state.loading) return <p>Загрузка...</p>;
    if (this.state.error) return <p className="error-text">Ошибка: {this.state.error}</p>;
    if (!this.state.user) return null;
    return (
      <div>
        <h3>Загружен пользователь:</h3>
        <p>{this.state.user.name} — {this.state.user.email}</p>
      </div>
    );
  }
}
