import React, { useState, useEffect, useReducer, useContext, createContext } from 'react';

// ================= БАЗОВЫЕ ХУКИ =================

// useState: управление состоянием
export function StateDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useState</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1 (функциональное обновление)</button>
      <button onClick={() => setCount(0)}>Сброс</button>
      <br />
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Введите имя" />
      <p>Привет, {name || 'гость'}!</p>
    </div>
  );
}

// useEffect: побочные эффекты
export function EffectDemoBasic() {
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // Каждый рендер
  useEffect(() => {
    console.log('EffectDemoBasic: каждый рендер');
  });

  // Только монтирование (таймер)
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(id); // cleanup
  }, []);

  // По изменению count
  useEffect(() => {
    console.log(`EffectDemoBasic: count = ${count}`);
  }, [count]);

  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useEffect</h3>
      <p>Count: {count} | Секундомер: {seconds}</p>
      <button onClick={() => setCount(c => c + 1)}>Увеличить count</button>
    </div>
  );
}

// useReducer: сложное состояние
const initialState = { count: 0, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1, history: [...state.history, '+1'] };
    case 'decrement':
      return { count: state.count - 1, history: [...state.history, '-1'] };
    case 'reset':
      return initialState;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function ReducerDemo() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useReducer</h3>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Сброс</button>
      <p>История: {state.history.join(', ') || 'пусто'}</p>
    </div>
  );
}

// useContext: глобальные данные
export const ThemeContext = createContext({ theme: 'light', toggle: () => {} });

export function ContextDemo() {
  const [theme, setTheme] = useState('light');
  const value = {
    theme,
    toggle: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  };
  return (
    <ThemeContext.Provider value={value}>
      <div style={{ margin: '8px 0' }}>
        <h3>useContext</h3>
        <ThemedBox />
      </div>
    </ThemeContext.Provider>
  );
}

function ThemedBox() {
  const { theme, toggle } = useContext(ThemeContext);
  const style = theme === 'dark'
    ? { background: '#20232a', color: '#fff', padding: 12, borderRadius: 8 }
    : { background: '#f5f5f5', color: '#222', padding: 12, borderRadius: 8 };
  return (
    <div style={style}>
      <p>Тема: {theme}</p>
      <button onClick={toggle}>Переключить</button>
    </div>
  );
}
