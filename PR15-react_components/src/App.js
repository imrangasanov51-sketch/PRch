import React from 'react';
import {
  WelcomeMessage,
  UserCard,
  Button,
  Card,
  Toggle,
  ConditionalMessage
} from './components/basic/BasicComponents';
import {
  Counter,
  LoginForm,
  ColorPicker,
  TodoList,
  SearchBox
} from './components/stateful/StatefulComponents';
import {
  Timer,
  WindowSizeTracker,
  DataFetcher
} from './components/lifecycle/LifecycleComponents';
import {
  CounterWithHooks,
  UserProfile,
  EffectDemo,
  ThemeToggle,
  ThemeProvider
} from './components/hooks/HooksComponents';
import ComponentTests from './components/ComponentTests';

const demoUser = {
  name: 'Иван Петров',
  email: 'ivan.petrov@example.com',
  avatar: 'https://i.pravatar.cc/100?img=12',
  isOnline: true
};

function App() {
  return (
    <ThemeProvider>
      <header className="header">
        <h1>ПР15: React — создание компонентов</h1>
      </header>
      <main className="container">

        <section className="card">
          <h2>1. Функциональные компоненты с props</h2>
          <WelcomeMessage name="Анна" age={21} />
          <UserCard user={demoUser} />
          <Button variant="primary" size="large" onClick={() => alert('Клик по primary!')}>
            Primary кнопка
          </Button>
          <Button variant="secondary" size="small" onClick={() => alert('Клик по secondary!')}>
            Secondary
          </Button>
        </section>

        <section className="card">
          <h2>2. Children и условный рендеринг</h2>
          <Card title="Карточка с children">
            <p>Это содержимое передано через children.</p>
            <Button>Кнопка внутри Card</Button>
          </Card>
          <Toggle>
            <p>Скрытый контент, виден после нажатия кнопки!</p>
          </Toggle>
          <ConditionalMessage status="success" />
          <ConditionalMessage status="error" />
          <ConditionalMessage status="warning" />
          <ConditionalMessage status="unknown" />
        </section>

        <section className="card">
          <h2>3. Классовые компоненты с состоянием</h2>
          <Counter />
          <LoginForm />
          <ColorPicker />
        </section>

        <section className="card">
          <h2>4. События и формы</h2>
          <TodoList />
          <SearchBox />
        </section>

        <section className="card">
          <h2>5. Жизненный цикл</h2>
          <Timer />
          <WindowSizeTracker />
          <DataFetcher userId={1} />
        </section>

        <section className="card">
          <h2>6. Хуки useState и useEffect</h2>
          <CounterWithHooks />
          <UserProfile />
          <EffectDemo />
        </section>

        <section className="card">
          <h2>7. Кастомные хуки и useContext</h2>
          <ThemeToggle />
        </section>

        <section className="card">
          <h2>Тесты компонентов</h2>
          <ComponentTests />
        </section>

      </main>
    </ThemeProvider>
  );
}

export default App;
