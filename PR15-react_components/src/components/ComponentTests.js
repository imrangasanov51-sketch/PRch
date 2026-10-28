import React from 'react';
import { createRoot } from 'react-dom/client';
import { WelcomeMessage, ConditionalMessage, Card, Toggle } from './basic/BasicComponents';
import { Counter } from './stateful/StatefulComponents';
import { CounterWithHooks, useLocalStorage } from './hooks/HooksComponents';

// Простейший рендер-тест без внешних библиотек:
// каждый тест рендерит компонент во временный div и проверяет HTML.
let passed = 0, total = 0;

function check(condition, message) {
  total++;
  if (condition) { passed++; console.log(`✅ PASS: ${message}`); }
  else { console.error(`❌ FAIL: ${message}`); }
}

function renderToHtml(element) {
  const container = document.createElement('div');
  const root = createRoot(container);
  root.render(element);
  return container;
}

function ComponentTests() {
  // Тест 1: WelcomeMessage рендерит имя
  const div1 = renderToHtml(<WelcomeMessage name="Тест" age={25} />);
  check(div1.innerHTML.includes('Тест'), 'WelcomeMessage рендерит имя');

  // Тест 2: ConditionalMessage по статусу
  const div2 = renderToHtml(<ConditionalMessage status="success" />);
  check(div2.innerHTML.includes('успешно'), 'ConditionalMessage рендерит success-сообщение');

  const div3 = renderToHtml(<ConditionalMessage status="error" />);
  check(div3.innerHTML.includes('ошибка'), 'ConditionalMessage рендерит error-сообщение');

  // Тест 3: Card рендерит title и children
  const div4 = renderToHtml(<Card title="Заголовок"><p>Текст внутри</p></Card>);
  check(div4.innerHTML.includes('Заголовок') && div4.innerHTML.includes('Текст внутри'),
    'Card рендерит title и children');

  // Тест 4: Counter с начальным состоянием 0
  const div5 = renderToHtml(<Counter />);
  check(div5.innerHTML.includes('Счётчик: 0'), 'Counter рендерит начальное состояние');

  // Тест 5: CounterWithHooks
  const div6 = renderToHtml(<CounterWithHooks />);
  check(div6.innerHTML.includes('Счётчик (хуки): 0'), 'CounterWithHooks рендерит начальное состояние');

  // Тест 6: Toggle скрывает children по умолчанию
  const div7 = renderToHtml(<Toggle><p>Скрытый</p></Toggle>);
  check(!div7.innerHTML.includes('Скрытый'), 'Toggle скрывает children по умолчанию');

  // Тест 7: useLocalStorage — хук возвращает initialValue
  const StorageTest = () => {
    const [val] = useLocalStorage('test-key', 'default');
    return <span>{val}</span>;
  };
  const div8 = renderToHtml(<StorageTest />);
  check(div8.innerHTML.includes('default'), 'useLocalStorage возвращает initialValue');

  console.log(`Тесты компонентов: ${passed}/${total}`);
  return (
    <div>
      <p>Тесты компонентов запущены — результаты в консоли (F12).</p>
      <p>Пройдено: {passed} из {total}</p>
    </div>
  );
}

export default ComponentTests;
