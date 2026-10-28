import React from 'react';
import {
  StateDemo, EffectDemoBasic, ReducerDemo, ContextDemo
} from './components/BasicHooks';
import {
  CallbackDemo, MemoDemo, RefDemo, CustomEffectDemo
} from './components/AdvancedHooks';
import {
  LocalStorageDemo, FetchDemo, FormDemo, DebounceDemo
} from './components/CustomHooks';
import HooksTests from './components/HooksTests';

function App() {
  return (
    <div>
      <header className="header">
        <h1>ПР16: React — использование хуков</h1>
      </header>
      <main className="container">

        <section className="card">
          <h2>Часть 2: Базовые хуки</h2>
          <StateDemo />
          <EffectDemoBasic />
          <ReducerDemo />
          <ContextDemo />
        </section>

        <section className="card">
          <h2>Часть 3: Продвинутые хуки</h2>
          <CallbackDemo />
          <MemoDemo />
          <RefDemo />
          <CustomEffectDemo />
        </section>

        <section className="card">
          <h2>Часть 4: Кастомные хуки</h2>
          <LocalStorageDemo />
          <FetchDemo />
          <FormDemo />
          <DebounceDemo />
        </section>

        <section className="card">
          <h2>Тесты хуков</h2>
          <HooksTests />
        </section>

      </main>
    </div>
  );
}

export default App;
