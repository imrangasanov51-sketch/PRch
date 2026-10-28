import React, { useState, useEffect, useContext, createContext } from 'react';

// ================= ЗАДАНИЕ 6: Хуки useState и useEffect =================

// 6.1. CounterWithHooks — счётчик на хуках
export function CounterWithHooks() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ margin: '8px 0' }}>
      <h3>Счётчик (хуки): {count}</h3>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Сброс</button>
    </div>
  );
}

// 6.2. UserProfile — форма редактирования профиля
export function UserProfile() {
  const [profile, setProfile] = useState({ name: '', email: '', bio: '' });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '8px 0' }}>
      <h3>Профиль пользователя</h3>
      <input name="name" placeholder="Имя" value={profile.name} onChange={handleChange} /><br />
      <input name="email" placeholder="Email" value={profile.email} onChange={handleChange} /><br />
      <textarea name="bio" placeholder="О себе" value={profile.bio} onChange={handleChange} rows={3} /><br />
      <button type="submit">Сохранить</button>
      {saved && <p className="success-text">✅ Профиль сохранён!</p>}
    </form>
  );
}

// 6.3. EffectDemo — демонстрация useEffect
export function EffectDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Без массива зависимостей — каждый рендер
  useEffect(() => {
    console.log('EffectDemo: каждый рендер');
  });

  // Пустой массив — только при монтировании
  useEffect(() => {
    console.log('EffectDemo: монтирование');
    return () => console.log('EffectDemo: размонтирование (cleanup)');
  }, []);

  // С зависимостью — при изменении count
  useEffect(() => {
    console.log(`EffectDemo: count изменился на ${count}`);
  }, [count]);

  return (
    <div style={{ margin: '8px 0' }}>
      <h3>Демо useEffect (см. консоль)</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Увеличить count</button>
      <input value={text} onChange={e => setText(e.target.value)} placeholder="Ввод текста" />
    </div>
  );
}

// ================= ЗАДАНИЕ 7: Кастомные хуки и useContext =================

// 7.1. useLocalStorage — синхронизация с localStorage
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

// 7.2. useFetch — HTTP-запросы
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => { if (!cancelled) { setData(data); setLoading(false); } })
      .catch(err => { if (!cancelled) { setError(err.message); setLoading(false); } });
    return () => { cancelled = true; };
  }, [url]);
  return { data, loading, error };
}

// 7.3. ThemeToggle + ThemeContext — переключение темы
export const ThemeContext = createContext('light');

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const styles = theme === 'dark'
    ? { background: '#20232a', color: '#fff', padding: 16, borderRadius: 8 }
    : { background: '#fff', color: '#222', padding: 16, borderRadius: 8, border: '1px solid #ddd' };
  return (
    <div style={styles}>
      <p>Текущая тема: <strong>{theme}</strong></p>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}
