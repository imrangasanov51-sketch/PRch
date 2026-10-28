import React from 'react';
import { createRoot } from 'react-dom/client';
import { StateDemo, ReducerDemo, EffectDemoBasic, ContextDemo } from './BasicHooks';
import { MemoDemo, RefDemo, CallbackDemo } from './AdvancedHooks';
import { useLocalStorage, useDebounce, useFetch } from './CustomHooks';

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

function HooksTests() {
  // Тест 1: StateDemo рендерится
  const div1 = renderToHtml(<StateDemo />);
  check(div1.innerHTML.includes('useState'), 'StateDemo рендерится');

  // Тест 2: ReducerDemo с начальным состоянием
  const div2 = renderToHtml(<ReducerDemo />);
  check(div2.innerHTML.includes('Count: 0'), 'ReducerDemo рендерит начальный count=0');

  // Тест 3: EffectDemoBasic
  const div3 = renderToHtml(<EffectDemoBasic />);
  check(div3.innerHTML.includes('useEffect'), 'EffectDemoBasic рендерится');

  // Тест 4: ContextDemo с темой
  const div4 = renderToHtml(<ContextDemo />);
  check(div4.innerHTML.includes('Тема: light'), 'ContextDemo рендерит начальную тему light');

  // Тест 5: MemoDemo
  const div5 = renderToHtml(<MemoDemo />);
  check(div5.innerHTML.includes('Сумма'), 'MemoDemo рендерит мемоизированную сумму');

  // Тест 6: RefDemo
  const div6 = renderToHtml(<RefDemo />);
  check(div6.innerHTML.includes('useRef'), 'RefDemo рендерится');

  // Тест 7: CallbackDemo
  const div7 = renderToHtml(<CallbackDemo />);
  check(div7.innerHTML.includes('useCallback'), 'CallbackDemo рендерится');

  // Тест 8: useLocalStorage хук
  const StorageTest = () => {
    const [val] = useLocalStorage('pr16-test', 'init');
    return <span>{val}</span>;
  };
  const div8 = renderToHtml(<StorageTest />);
  check(div8.innerHTML.includes('init'), 'useLocalStorage возвращает initialValue');

  // Тест 9: useDebounce хук
  const DebounceTest = () => {
    const d = useDebounce('hello', 100);
    return <span>{d}</span>;
  };
  const div9 = renderToHtml(<DebounceTest />);
  check(div9.innerHTML.includes('hello'), 'useDebounce возвращает начальное значение');

  // Тест 10: useFetch хук
  const FetchTest = () => {
    const { loading } = useFetch(null);
    return <span>{loading ? 'loading' : 'idle'}</span>;
  };
  const div10 = renderToHtml(<FetchTest />);
  check(div10.innerHTML.includes('idle'), 'useFetch с null URL не запускает загрузку');

  console.log(`Тесты хуков: ${passed}/${total}`);
  return (
    <div>
      <p>Тесты хуков запущены — результаты в консоли (F12).</p>
      <p>Пройдено: {passed} из {total}</p>
    </div>
  );
}

export default HooksTests;
