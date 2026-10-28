import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// ================= ПРОДВИНУТЫЕ ХУКИ =================

// useCallback: мемоизация функций
export function CallbackDemo() {
  const [count, setCount] = useState(0);
  const [other, setOther] = useState(0);

  // Мемоизированная функция — пересоздаётся только при изменении count
  const increment = useCallback(() => setCount(c => c + 1), []);
  const incrementWithLog = useCallback(() => {
    console.log('incrementWithLog, count =', count);
    setCount(c => c + 1);
  }, [count]);

  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useCallback</h3>
      <p>Count: {count} | Other: {other}</p>
      <button onClick={increment}>+1 (стабильная ссылка)</button>
      <button onClick={incrementWithLog}>+1 (зависит от count)</button>
      <button onClick={() => setOther(o => o + 1)}>Other +1</button>
    </div>
  );
}

// useMemo: мемоизация вычислений
export function MemoDemo() {
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5]);
  const [dummy, setDummy] = useState(0);

  // Без useMemo сумма пересчитывалась бы каждый рендер
  const sum = useMemo(() => {
    console.log('MemoDemo: пересчёт суммы');
    return numbers.reduce((a, b) => a + b, 0);
  }, [numbers]);

  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useMemo</h3>
      <p>Числа: {numbers.join(', ')}</p>
      <p>Сумма (useMemo): {sum}</p>
      <button onClick={() => setNumbers(n => [...n, n.length + 1])}>Добавить число</button>
      <button onClick={() => setDummy(d => d + 1)}>Просто рендер ({dummy})</button>
    </div>
  );
}

// useRef: доступ к DOM и мутабельные значения без рендера
export function RefDemo() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);
  const [text, setText] = useState('');

  renderCount.current += 1; // не вызывает рендер

  const focusInput = () => inputRef.current?.focus();

  return (
    <div style={{ margin: '8px 0' }}>
      <h3>useRef</h3>
      <input ref={inputRef} value={text} onChange={e => setText(e.target.value)} placeholder="Поле с фокусом" />
      <button onClick={focusInput}>Фокус на поле</button>
      <p>Количество рендеров (useRef, без перерисовки): {renderCount.current}</p>
      <p>Длина текста: {text.length}</p>
    </div>
  );
}

// Пользовательский эффект: комбинация хуков
export function CustomEffectDemo() {
  const [width, setWidth] = useState(window.innerWidth);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  return (
    <div style={{ margin: '8px 0' }}>
      <h3>Комбинированные эффекты</h3>
      <p>Ширина окна: {width}px</p>
      <p>Статус сети: {online ? '🟢 Онлайн' : '🔴 Офлайн'}</p>
    </div>
  );
}
