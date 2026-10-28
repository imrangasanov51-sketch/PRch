import React, { useState, useEffect, useCallback, useRef } from 'react';

// ================= КАСТОМНЫЕ ХУКИ =================

// useLocalStorage: синхронизация с localStorage
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

export function LocalStorageDemo() {
  const [name, setName] = useLocalStorage('pr16-username', '');
  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useLocalStorage</h3>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя (сохраняется в localStorage)" />
      <p>Сохранено: {name || 'ничего'}</p>
    </div>
  );
}

// useFetch: HTTP-запросы с состоянием загрузки
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
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

export function FetchDemo() {
  const [userId, setUserId] = useState(1);
  const { data, loading, error } = useFetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useFetch</h3>
      <button onClick={() => setUserId(id => Math.max(1, id - 1))}>Предыдущий</button>
      <button onClick={() => setUserId(id => id + 1)}>Следующий</button>
      <p>User ID: {userId}</p>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error-text">Ошибка: {error}</p>}
      {data && <p>{data.name} — {data.email}</p>}
    </div>
  );
}

// useForm: управление формой
export function useForm(initialValues, onSubmit) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
  }, []);
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(values);
  }, [values, onSubmit]);
  const reset = useCallback(() => { setValues(initialValues); setErrors({}); }, [initialValues]);
  return { values, errors, setErrors, handleChange, handleSubmit, reset };
}

export function FormDemo() {
  const { values, handleChange, handleSubmit, reset } = useForm({ email: '', password: '' }, (vals) => {
    alert(`Отправлено: ${JSON.stringify(vals)}`);
  });
  return (
    <form onSubmit={handleSubmit} style={{ margin: '8px 0' }}>
      <h3>useForm</h3>
      <input name="email" placeholder="Email" value={values.email} onChange={handleChange} /><br />
      <input name="password" type="password" placeholder="Пароль" value={values.password} onChange={handleChange} /><br />
      <button type="submit">Отправить</button>
      <button type="button" onClick={reset}>Сброс</button>
    </form>
  );
}

// useDebounce: задержка обновления значения
export function useDebounce(value, delayMs = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}

export function DebounceDemo() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useDebounce</h3>
      <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Ввод с задержкой 500мс..." />
      <p>Текущее значение: {query}</p>
      <p>Debounced (применится через 500мс): {debouncedQuery}</p>
    </div>
  );
}
