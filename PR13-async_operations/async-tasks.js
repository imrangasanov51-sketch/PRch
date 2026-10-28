// === АСИНХРОННЫЕ ОПЕРАЦИИ - ОСНОВНЫЕ ЗАДАНИЯ ===

// ---------- ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ----------
function getEl(id) {
  return document.getElementById(id);
}

function printOutput(elementId, message) {
  const el = getEl(elementId);
  if (el) {
    el.textContent += (el.textContent ? "\n" : "") + message;
    el.scrollTop = el.scrollHeight;
  }
}

function clearOutput(elementId) {
  const el = getEl(elementId);
  if (el) el.textContent = "";
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatUserCard(user) {
  return `<div class="user-card">
    <h3>${user.name}</h3>
    <p>Email: ${user.email}</p>
    <p>Телефон: ${user.phone}</p>
    <p>Компания: ${user.company ? user.company.name : "-"}</p>
  </div>`;
}

// ================= ЗАДАНИЕ 1: Основы промисов =================

// 1.1. Функция createBasicPromise
function createBasicPromise(shouldResolve = true) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve("Успех!");
      } else {
        reject(new Error("Ошибка!"));
      }
    }, 1000);
  });
}

// 1.2. Функция handleBasicPromise
function handleBasicPromise() {
  clearOutput("promise-output");
  printOutput("promise-output", "Запущен базовый промис (ожидание 1 сек)...");
  createBasicPromise(true)
    .then(result => {
      printOutput("promise-output", `Результат: ${result}`);
    })
    .catch(error => {
      printOutput("promise-output", `Поймана ошибка: ${error.message}`);
    });
}

// 1.3. Функция createPromiseChain
function createPromiseChain() {
  clearOutput("promise-output");
  printOutput("promise-output", "Запущена цепочка из 3 промисов...");
  Promise.resolve(1)
    .then(num => {
      printOutput("promise-output", `Шаг 1: получено ${num}`);
      return delay(500).then(() => num * 2);
    })
    .then(num => {
      printOutput("promise-output", `Шаг 2: получено ${num}`);
      return delay(500).then(() => num * 3);
    })
    .then(num => {
      printOutput("promise-output", `Шаг 3: финальный результат ${num}`);
    });
}

// 1.4. Функция handlePromiseError
function handlePromiseError() {
  clearOutput("promise-output");
  printOutput("promise-output", "Запущен промис с ошибкой (ожидание 1 сек)...");
  createBasicPromise(false)
    .then(result => {
      printOutput("promise-output", `Результат: ${result}`);
    })
    .catch(error => {
      printOutput("promise-output", `Поймана ошибка: ${error.message}`);
    });
}

// 1.5. Функция setupPromiseEvents
function setupPromiseEvents() {
  getEl("basic-promise").addEventListener("click", handleBasicPromise);
  getEl("promise-chain").addEventListener("click", createPromiseChain);
  getEl("promise-error").addEventListener("click", handlePromiseError);
}

// ================= ЗАДАНИЕ 2: Async/Await =================

// 2.1. Функция basicAsyncAwait
async function basicAsyncAwait() {
  clearOutput("async-output");
  printOutput("async-output", "Запущен async/await (ожидание 1 сек)...");
  const result = await createBasicPromise(true);
  await delay(300);
  printOutput("async-output", `Результат: ${result}`);
}

// 2.2. Функция handleAsyncError
async function handleAsyncError() {
  clearOutput("async-output");
  printOutput("async-output", "Запущен async с try/catch (ожидание 1 сек)...");
  try {
    const result = await createBasicPromise(false);
    printOutput("async-output", `Результат: ${result}`);
  } catch (error) {
    printOutput("async-output", `Поймана ошибка: ${error.message}`);
  }
}

// 2.3. Функция parallelAsyncExecution
async function parallelAsyncExecution() {
  clearOutput("async-output");
  printOutput("async-output", "Запущено 3 промиса параллельно...");
  const start = performance.now();
  const [r1, r2, r3] = await Promise.all([
    delay(600).then(() => "Промис 1 завершён (600мс)"),
    delay(800).then(() => "Промис 2 завершён (800мс)"),
    delay(400).then(() => "Промис 3 завершён (400мс)")
  ]);
  const elapsed = (performance.now() - start).toFixed(0);
  printOutput("async-output", r1);
  printOutput("async-output", r2);
  printOutput("async-output", r3);
  printOutput("async-output", `Общее время: ${elapsed}мс (не 1800мс — промисы шли параллельно)`);
}

// 2.4. Функция setupAsyncEvents
function setupAsyncEvents() {
  getEl("basic-async").addEventListener("click", basicAsyncAwait);
  getEl("async-error").addEventListener("click", handleAsyncError);
  getEl("async-parallel").addEventListener("click", parallelAsyncExecution);
}

// ================= ЗАДАНИЕ 3: Работа с внешними API =================

const API_URL = "https://jsonplaceholder.typicode.com";

// 3.1. Функция fetchUsers
async function fetchUsers() {
  clearOutput("api-output");
  getEl("api-data").innerHTML = "";
  printOutput("api-output", "Загрузка пользователей...");
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status} ${response.statusText}`);
    }
    const users = await response.json();
    getEl("api-data").innerHTML = users.map(formatUserCard).join("");
    printOutput("api-output", `Загружено пользователей: ${users.length}`);
  } catch (error) {
    printOutput("api-output", `Ошибка: ${error.message}`);
  }
}

// 3.2. Функция createPost
async function createPost() {
  clearOutput("api-output");
  printOutput("api-output", "Отправка POST запроса...");
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        title: "Заголовок поста из ПР13",
        body: "Тело поста, созданного через fetch POST",
        userId: 1
      })
    });
    if (!response.ok) {
      throw new Error(`HTTP ошибка: ${response.status}`);
    }
    const post = await response.json();
    printOutput("api-output", `Пост создан! ID: ${post.id}`);
    printOutput("api-output", JSON.stringify(post, null, 2));
  } catch (error) {
    printOutput("api-output", `Ошибка: ${error.message}`);
  }
}

// 3.3. Функция testApiError
async function testApiError() {
  clearOutput("api-output");
  printOutput("api-output", "Запрос к несуществующему URL...");
  try {
    const response = await fetch(`${API_URL}/nonexistent-endpoint-12345`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    printOutput("api-output", JSON.stringify(data));
  } catch (error) {
    if (error.name === "TypeError") {
      printOutput("api-output", `Сетевая ошибка: ${error.message}`);
    } else {
      printOutput("api-output", `HTTP ошибка: ${error.message}`);
    }
  }
}

// 3.4. Функция setupApiEvents
function setupApiEvents() {
  getEl("fetch-users").addEventListener("click", fetchUsers);
  getEl("fetch-post").addEventListener("click", createPost);
  getEl("fetch-error").addEventListener("click", testApiError);
}

// ================= ЗАДАНИЕ 4: Асинхронные таймеры =================

let intervalId = null;
let intervalCounter = 0;

// 4.1. Функция startAsyncInterval
async function startAsyncInterval() {
  if (intervalId !== null) {
    printOutput("interval-output", "Интервал уже запущен!");
    return;
  }
  intervalCounter = 0;
  printOutput("interval-output", "Интервал запущен (1 тик/сек).");
  intervalId = setInterval(async () => {
    intervalCounter++;
    getEl("interval-output").textContent = `Счётчик: ${intervalCounter}`;
  }, 1000);
}

// 4.2. Функция stopAsyncInterval
function stopAsyncInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId);
    intervalId = null;
    intervalCounter = 0;
    getEl("interval-output").textContent = "Интервал остановлен. Счётчик сброшен.";
  } else {
    printOutput("interval-output", "Интервал не был запущен.");
  }
}

// 4.3. Функция delayWithPromise
function delayWithPromise(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(`Задержка ${ms}мс завершена`), ms);
  });
}

// 4.4. Функция testDelay
async function testDelay() {
  clearOutput("timer-output");
  for (let i = 1; i <= 3; i++) {
    printOutput("timer-output", `Ожидание ${i} сек...`);
    const msg = await delayWithPromise(1000);
    printOutput("timer-output", msg);
  }
  printOutput("timer-output", "Все задержки завершены!");
}

// 4.5. Функция setupTimerEvents
function setupTimerEvents() {
  getEl("start-interval").addEventListener("click", startAsyncInterval);
  getEl("stop-interval").addEventListener("click", stopAsyncInterval);
  getEl("delay-promise").addEventListener("click", testDelay);
}

// ================= ЗАДАНИЕ 5: Обработка ошибок =================

// 5.1. Функция asyncTryCatch
async function asyncTryCatch() {
  clearOutput("error-output");
  printOutput("error-output", "=== Вложенные try/catch ===");
  try {
    const r1 = await createBasicPromise(true);
    printOutput("error-output", `Операция 1: ${r1}`);
    try {
      const r2 = await createBasicPromise(false);
      printOutput("error-output", `Операция 2: ${r2}`);
    } catch (innerError) {
      printOutput("error-output", `Внутренний catch (операция 2): ${innerError.message}`);
    }
    const r3 = await createBasicPromise(true);
    printOutput("error-output", `Операция 3: ${r3}`);
  } catch (outerError) {
    if (outerError instanceof TypeError) {
      printOutput("error-output", `TypeError: ${outerError.message}`);
    } else {
      printOutput("error-output", `Общая ошибка: ${outerError.message}`);
    }
  }
}

// 5.2. Функция handleMultipleErrors
async function handleMultipleErrors() {
  clearOutput("error-output");
  printOutput("error-output", "=== Promise.allSettled ===");
  const results = await Promise.allSettled([
    createBasicPromise(true),
    createBasicPromise(false),
    createBasicPromise(true),
    createBasicPromise(false)
  ]);
  let fulfilled = 0;
  let rejected = 0;
  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      fulfilled++;
      printOutput("error-output", `Промис ${i + 1}: fulfilled -> ${res.value}`);
    } else {
      rejected++;
      printOutput("error-output", `Промис ${i + 1}: rejected -> ${res.reason.message}`);
    }
  });
  printOutput("error-output", `Статистика: успешно ${fulfilled}, с ошибкой ${rejected}`);
}

// 5.3. Функция retryWithBackoff
async function retryWithBackoff(operation, maxRetries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation(attempt);
    } catch (error) {
      lastError = error;
      if (attempt < maxRetries) {
        const waitMs = Math.pow(2, attempt) * 500;
        await delay(waitMs);
      }
    }
  }
  throw lastError;
}

// 5.4. Функция setupErrorEvents
function setupErrorEvents() {
  getEl("try-catch").addEventListener("click", asyncTryCatch);
  getEl("multiple-errors").addEventListener("click", handleMultipleErrors);
  getEl("retry-pattern").addEventListener("click", async () => {
    clearOutput("error-output");
    let calls = 0;
    try {
      const result = await retryWithBackoff(async (attempt) => {
        calls++;
        printOutput("error-output", `Попытка ${attempt}...`);
        if (calls < 3) throw new Error("Временная ошибка");
        return "Успех после повторных попыток!";
      }, 3);
      printOutput("error-output", `Результат: ${result}`);
    } catch (error) {
      printOutput("error-output", `Все попытки исчерпаны: ${error.message}`);
    }
  });
}

// ================= ЗАДАНИЕ 6: Параллельные операции =================

// 6.1. Функция demonstratePromiseAll
async function demonstratePromiseAll() {
  clearOutput("parallel-output");
  printOutput("parallel-output", "=== Promise.all: 5 промисов ===");
  const start = performance.now();
  const times = [300, 500, 200, 800, 400];
  const results = await Promise.all(
    times.map((ms, i) => delay(ms).then(() => `Промис ${i + 1} (${ms}мс)`))
  );
  const elapsed = (performance.now() - start).toFixed(0);
  results.forEach(r => printOutput("parallel-output", r));
  printOutput("parallel-output", `Общее время: ${elapsed}мс`);
}

// 6.2. Функция demonstratePromiseRace
async function demonstratePromiseRace() {
  clearOutput("parallel-output");
  printOutput("parallel-output", "=== Promise.race ===");
  const winner = await Promise.race([
    delay(500).then(() => "Медленный (500мс)"),
    delay(100).then(() => "Быстрый (100мс)"),
    delay(300).then(() => "Средний (300мс)")
  ]);
  printOutput("parallel-output", `Первый завершённый: ${winner}`);
  printOutput("parallel-output", "Разница с Promise.all: race ждёт только ПЕРВЫЙ, all — ВСЕ.");
}

// 6.3. Функция demonstratePromiseAllSettled
async function demonstratePromiseAllSettled() {
  clearOutput("parallel-output");
  printOutput("parallel-output", "=== Promise.allSettled ===");
  const results = await Promise.allSettled([
    delay(200).then(() => "Операция A успешна"),
    delay(300).then(() => { throw new Error("Операция B упала"); }),
    delay(100).then(() => "Операция C успешна")
  ]);
  results.forEach((res, i) => {
    if (res.status === "fulfilled") {
      printOutput("parallel-output", `Операция ${i + 1}: успех — ${res.value}`);
    } else {
      printOutput("parallel-output", `Операция ${i + 1}: ошибка — ${res.reason.message}`);
    }
  });
}

// 6.4. Функция setupParallelEvents
function setupParallelEvents() {
  getEl("promise-all").addEventListener("click", demonstratePromiseAll);
  getEl("promise-race").addEventListener("click", demonstratePromiseRace);
  getEl("promise-allSettled").addEventListener("click", demonstratePromiseAllSettled);
}

// ================= ЗАДАНИЕ 7: Реальные сценарии =================

// 7.1. Функция sequentialApiRequests
async function sequentialApiRequests() {
  clearOutput("scenario-output");
  try {
    printOutput("scenario-output", "1. Получаем пользователя...");
    const userRes = await fetch(`${API_URL}/users/1`);
    if (!userRes.ok) throw new Error(`HTTP ${userRes.status}`);
    const user = await userRes.json();

    printOutput("scenario-output", `2. Получаем посты пользователя ${user.name}...`);
    const postsRes = await fetch(`${API_URL}/users/1/posts`);
    if (!postsRes.ok) throw new Error(`HTTP ${postsRes.status}`);
    const posts = await postsRes.json();

    printOutput("scenario-output", "3. Получаем комментарии к первому посту...");
    const commentsRes = await fetch(`${API_URL}/posts/${posts[0].id}/comments`);
    if (!commentsRes.ok) throw new Error(`HTTP ${commentsRes.status}`);
    const comments = await commentsRes.json();

    printOutput("scenario-output", `Пользователь: ${user.name} (${user.email})`);
    printOutput("scenario-output", `Количество постов: ${posts.length}`);
    printOutput("scenario-output", `Первый пост: "${posts[0].title}"`);
    printOutput("scenario-output", `Комментариев к первому посту: ${comments.length}`);
  } catch (error) {
    printOutput("scenario-output", `Ошибка: ${error.message}`);
  }
}

// 7.2. Функция simulateFileUpload
async function simulateFileUpload() {
  clearOutput("scenario-output");
  const bar = getEl("progress-bar");
  bar.style.width = "0%";
  for (let progress = 0; progress <= 100; progress += 10) {
    bar.style.width = `${progress}%`;
    printOutput("scenario-output", `Загрузка: ${progress}%`);
    await delay(100);
  }
  printOutput("scenario-output", "Файл успешно загружен!");
}

// 7.3. Функция createRequestCache
function createRequestCache() {
  const cache = new Map();
  return async function cachedRequest(url) {
    if (cache.has(url)) {
      console.log(`[CACHE HIT] ${url}`);
      return cache.get(url);
    }
    console.log(`[CACHE MISS] ${url}`);
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    cache.set(url, data);
    return data;
  };
}

// 7.4. Функция setupRealScenarioEvents
function setupRealScenarioEvents() {
  getEl("sequential-requests").addEventListener("click", sequentialApiRequests);
  getEl("upload-simulation").addEventListener("click", simulateFileUpload);
  getEl("cache-requests").addEventListener("click", async () => {
    clearOutput("scenario-output");
    const cachedRequest = createRequestCache();
    try {
      printOutput("scenario-output", "Первый запрос (из сети)...");
      const t1 = performance.now();
      const data1 = await cachedRequest(`${API_URL}/users/1`);
      printOutput("scenario-output", `Получено за ${(performance.now() - t1).toFixed(0)}мс: ${data1.name}`);

      printOutput("scenario-output", "Второй запрос (из кэша)...");
      const t2 = performance.now();
      const data2 = await cachedRequest(`${API_URL}/users/1`);
      printOutput("scenario-output", `Получено за ${(performance.now() - t2).toFixed(2)}мс: ${data2.name}`);
    } catch (error) {
      printOutput("scenario-output", `Ошибка: ${error.message}`);
    }
  });
}

// ================= ИНИЦИАЛИЗАЦИЯ =================
document.addEventListener("DOMContentLoaded", () => {
  setupPromiseEvents();
  setupAsyncEvents();
  setupApiEvents();
  setupTimerEvents();
  setupErrorEvents();
  setupParallelEvents();
  setupRealScenarioEvents();
  console.log("ПР13: все обработчики событий настроены.");
});
