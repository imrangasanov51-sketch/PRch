// === FETCH API - ОСНОВНЫЕ ЗАДАНИЯ ===

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

function getEl(id) { return document.getElementById(id); }
function printOutput(id, msg) {
  const el = getEl(id);
  if (el) { el.textContent += (el.textContent ? "\n" : "") + msg; el.scrollTop = el.scrollHeight; }
}
function clearOutput(id) { const el = getEl(id); if (el) el.textContent = ""; }
function delay(ms) { return new Promise(r => setTimeout(r, ms)); }

// ================= ЗАДАНИЕ 1: Базовые GET запросы =================

// 1.1. fetchGetRequest
async function fetchGetRequest() {
  clearOutput("get-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1`);
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
    const data = await response.json();
    printOutput("get-output", `GET ${API_BASE_URL}/posts/1`);
    printOutput("get-output", JSON.stringify(data, null, 2));
  } catch (error) {
    printOutput("get-output", `Ошибка: ${error.message}`);
  }
}

// 1.2. fetchJsonData
async function fetchJsonData() {
  clearOutput("get-output");
  getEl("get-data").innerHTML = "";
  try {
    const response = await fetch(`${API_BASE_URL}/users`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const users = await response.json();
    getEl("get-data").innerHTML = users.map(u => `
      <div class="user-card">
        <h3>${u.name}</h3>
        <p>Email: ${u.email}</p>
        <p>Телефон: ${u.phone}</p>
      </div>`).join("");
    printOutput("get-output", `Загружено пользователей: ${users.length}`);
  } catch (error) {
    printOutput("get-output", `Ошибка: ${error.message}`);
  }
}

// 1.3. fetchWithError
async function fetchWithError() {
  clearOutput("get-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/999999`);
    printOutput("get-output", `response.ok = ${response.ok}`);
    printOutput("get-output", `response.status = ${response.status}`);
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  } catch (error) {
    printOutput("get-output", `HTTP ошибка: ${error.message}`);
    printOutput("get-output", "Важно: fetch НЕ реджектится на 404/500 — reject только при сетевых сбоях!");
  }
}

// 1.4. setupGetRequests
function setupGetRequests() {
  getEl("fetch-get").addEventListener("click", fetchGetRequest);
  getEl("fetch-json").addEventListener("click", fetchJsonData);
  getEl("fetch-error").addEventListener("click", fetchWithError);
}

// ================= ЗАДАНИЕ 2: POST, PUT, DELETE =================

// 2.1. fetchPostRequest
async function fetchPostRequest() {
  clearOutput("crud-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title: "Новый пост", body: "Тело нового поста", userId: 1 })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    printOutput("crud-output", `POST — создан пост с ID: ${data.id}`);
    printOutput("crud-output", JSON.stringify(data, null, 2));
  } catch (error) {
    printOutput("crud-output", `Ошибка: ${error.message}`);
  }
}

// 2.2. fetchPutRequest
async function fetchPutRequest() {
  clearOutput("crud-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ id: 1, title: "Полностью обновлённый пост", body: "Новое тело", userId: 1 })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    printOutput("crud-output", "PUT — все поля заменены:");
    printOutput("crud-output", JSON.stringify(data, null, 2));
  } catch (error) {
    printOutput("crud-output", `Ошибка: ${error.message}`);
  }
}

// 2.3. fetchPatchRequest
async function fetchPatchRequest() {
  clearOutput("crud-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ title: "Только заголовок обновлён" })
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    printOutput("crud-output", "PATCH — изменено только поле title, остальные сохранились:");
    printOutput("crud-output", JSON.stringify(data, null, 2));
  } catch (error) {
    printOutput("crud-output", `Ошибка: ${error.message}`);
  }
}

// 2.4. fetchDeleteRequest
async function fetchDeleteRequest() {
  clearOutput("crud-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1`, { method: "DELETE" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    printOutput("crud-output", `DELETE успешен! Статус: ${response.status} ${response.statusText}`);
    printOutput("crud-output", "Ресурс удалён (JSONPlaceholder эмулирует удаление).");
  } catch (error) {
    printOutput("crud-output", `Ошибка: ${error.message}`);
  }
}

// 2.5. setupCrudRequests
function setupCrudRequests() {
  getEl("fetch-post").addEventListener("click", fetchPostRequest);
  getEl("fetch-put").addEventListener("click", fetchPutRequest);
  getEl("fetch-patch").addEventListener("click", fetchPatchRequest);
  getEl("fetch-delete").addEventListener("click", fetchDeleteRequest);
}

// ================= ЗАДАНИЕ 3: Заголовки и параметры =================

// 3.1. fetchWithHeaders
async function fetchWithHeaders() {
  clearOutput("headers-output");
  const headers = {
    "Content-Type": "application/json",
    "X-Custom-Header": "PR14-Fetch-Demo",
    "Authorization": "Bearer test-token-12345"
  };
  printOutput("headers-output", "Отправляемые заголовки:");
  Object.entries(headers).forEach(([k, v]) => printOutput("headers-output", `  ${k}: ${v}`));
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, { headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    printOutput("headers-output", `Ответ получен: ${response.status}`);
  } catch (error) {
    printOutput("headers-output", `Ошибка: ${error.message}`);
  }
}

// 3.2. fetchWithAuth
async function fetchWithAuth() {
  clearOutput("headers-output");
  printOutput("headers-output", "=== Bearer Token ===");
  try {
    const res1 = await fetch(`${API_BASE_URL}/users/1`, {
      headers: { "Authorization": "Bearer my-secret-token-abc123" }
    });
    printOutput("headers-output", `Bearer: ${res1.status} ${res1.statusText}`);
  } catch (e) { printOutput("headers-output", `Bearer ошибка: ${e.message}`); }

  printOutput("headers-output", "=== Basic Auth ===");
  try {
    const credentials = btoa("user:password");
    const res2 = await fetch(`${API_BASE_URL}/users/1`, {
      headers: { "Authorization": `Basic ${credentials}` }
    });
    printOutput("headers-output", `Basic: ${res2.status} ${res2.statusText}`);
  } catch (e) { printOutput("headers-output", `Basic ошибка: ${e.message}`); }

  printOutput("headers-output", "=== OAuth2 (обобщённо) ===");
  printOutput("headers-output", "OAuth2: сначала POST на /token -> получаем access_token -> используем как Bearer.");
}

// 3.3. fetchWithParams
async function fetchWithParams() {
  clearOutput("headers-output");
  try {
    const params = new URLSearchParams({ _limit: "5", _sort: "id", _order: "desc" });
    printOutput("headers-output", `URL: ${API_BASE_URL}/posts?${params.toString()}`);
    const response = await fetch(`${API_BASE_URL}/posts?${params.toString()}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const posts = await response.json();
    printOutput("headers-output", `Получено постов: ${posts.length} (отсортированы по id desc)`);
    posts.forEach(p => printOutput("headers-output", `  #${p.id}: ${p.title}`));
  } catch (error) {
    printOutput("headers-output", `Ошибка: ${error.message}`);
  }
}

// 3.4. fetchWithTimeout
async function fetchWithTimeout() {
  clearOutput("headers-output");
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);
  try {
    printOutput("headers-output", "Запрос с таймаутом 3 сек...");
    const response = await fetch(`${API_BASE_URL}/posts`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    printOutput("headers-output", `Успех! Получено ${data.length} записей до таймаута.`);
  } catch (error) {
    if (error.name === "AbortError") {
      printOutput("headers-output", "Таймаут: запрос отменён через 3 секунды (AbortError).");
    } else {
      printOutput("headers-output", `Ошибка: ${error.message}`);
    }
  }
}

// 3.5. setupHeadersAndParams
function setupHeadersAndParams() {
  getEl("fetch-headers").addEventListener("click", fetchWithHeaders);
  getEl("fetch-auth").addEventListener("click", fetchWithAuth);
  getEl("fetch-params").addEventListener("click", fetchWithParams);
  getEl("fetch-timeout").addEventListener("click", fetchWithTimeout);
}

// ================= ЗАДАНИЕ 4: Обработка ответов =================

// 4.1. fetchAndCheckStatus
async function fetchAndCheckStatus() {
  clearOutput("response-output");
  const urls = [
    `${API_BASE_URL}/posts/1`,
    `${API_BASE_URL}/posts/999999`,
    `${API_BASE_URL}/posts`
  ];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      printOutput("response-output", `${url}`);
      printOutput("response-output", `  ok=${response.ok} status=${response.status} statusText=${response.statusText}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      printOutput("response-output", "  -> запрос успешен (2xx)");
    } catch (error) {
      printOutput("response-output", `  -> ОШИБКА: ${error.message}`);
    }
  }
}

// 4.2. fetchAndReadHeaders
async function fetchAndReadHeaders() {
  clearOutput("response-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1`);
    printOutput("response-output", "Заголовки ответа:");
    response.headers.forEach((value, key) => {
      printOutput("response-output", `  ${key}: ${value}`);
    });
    printOutput("response-output", `Content-Type: ${response.headers.get("Content-Type")}`);
    printOutput("response-output", `Content-Length: ${response.headers.get("Content-Length") || "n/a"}`);
    printOutput("response-output", `Date: ${response.headers.get("Date")}`);
  } catch (error) {
    printOutput("response-output", `Ошибка: ${error.message}`);
  }
}

// 4.3. fetchBlobData
async function fetchBlobData() {
  clearOutput("response-output");
  try {
    const response = await fetch("https://picsum.photos/200/300");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const blob = await response.blob();
    const objectUrl = URL.createObjectURL(blob);
    getEl("image-container").innerHTML = `<img src="${objectUrl}" alt="Случайное изображение">`;
    printOutput("response-output", `Blob загружен: ${blob.size} байт, тип: ${blob.type}`);
  } catch (error) {
    printOutput("response-output", `Ошибка: ${error.message}`);
  }
}

// 4.4. fetchWithFormData
async function fetchWithFormData() {
  clearOutput("response-output");
  const formData = new FormData();
  formData.append("title", "Пост через FormData");
  formData.append("body", "Тело поста из FormData");
  formData.append("userId", "1");
  printOutput("response-output", "FormData автоматически устанавливает Content-Type: multipart/form-data с boundary.");
  printOutput("response-output", "JSON требует ручной установки Content-Type: application/json.");
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      body: formData
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    printOutput("response-output", `Ответ: ${JSON.stringify(data)}`);
  } catch (error) {
    printOutput("response-output", `Ошибка: ${error.message}`);
  }
}

// 4.5. setupResponseHandling
function setupResponseHandling() {
  getEl("fetch-status").addEventListener("click", fetchAndCheckStatus);
  getEl("fetch-read-headers").addEventListener("click", fetchAndReadHeaders);
  getEl("fetch-blob").addEventListener("click", fetchBlobData);
  getEl("fetch-formdata").addEventListener("click", fetchWithFormData);
}

// ================= ЗАДАНИЕ 5: Обработка ошибок =================

// 5.1. fetchNetworkError
async function fetchNetworkError() {
  clearOutput("error-output");
  try {
    await fetch("https://this-domain-does-not-exist-12345.com/data");
  } catch (error) {
    printOutput("error-output", `Сетевая ошибка (TypeError): ${error.message}`);
    printOutput("error-output", "Это ТИПИЧНЫЙ случай, когда fetch реально reject-ится.");
  }
}

// 5.2. fetchHttpError
async function fetchHttpError() {
  clearOutput("error-output");
  try {
    const response = await fetch(`${API_BASE_URL}/posts/999999`);
    if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  } catch (error) {
    printOutput("error-output", `HTTP ошибка: ${error.message}`);
    printOutput("error-output", "Обработка: проверка response.ok вручную, т.к. fetch не реджектится на 4xx/5xx.");
  }
}

// 5.3. fetchWithAbort
let abortController = null;
async function fetchWithAbort() {
  clearOutput("error-output");
  abortController = new AbortController();
  printOutput("error-output", "Запрос запущен. Нажмите кнопку ещё раз, чтобы отменить...");
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, { signal: abortController.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    printOutput("error-output", `Запрос завершён: ${data.length} записей.`);
  } catch (error) {
    if (error.name === "AbortError") {
      printOutput("error-output", "Запрос отменён пользователем (AbortError).");
    } else {
      printOutput("error-output", `Ошибка: ${error.message}`);
    }
  }
}

// 5.4. fetchWithRetry
async function fetchWithRetry(url, options = {}, retries = 3) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        const waitMs = Math.pow(2, attempt) * 500;
        await delay(waitMs);
      }
    }
  }
  throw lastError;
}

// 5.5. setupErrorHandling
function setupErrorHandling() {
  getEl("fetch-network-error").addEventListener("click", fetchNetworkError);
  getEl("fetch-http-error").addEventListener("click", fetchHttpError);
  getEl("fetch-abort").addEventListener("click", fetchWithAbort);
  getEl("fetch-retry").addEventListener("click", async () => {
    clearOutput("error-output");
    try {
      printOutput("error-output", "Запрос с retry (3 попытки)...");
      const data = await fetchWithRetry(`${API_BASE_URL}/posts/1`);
      printOutput("error-output", `Успех: ${data.title}`);
    } catch (error) {
      printOutput("error-output", `Все попытки исчерпаны: ${error.message}`);
    }
  });
}

// ================= ЗАДАНИЕ 6: Параллельные запросы =================

// 6.1. fetchWithPromiseAll
async function fetchWithPromiseAll() {
  clearOutput("parallel-output");
  const start = performance.now();
  try {
    const [users, posts, comments] = await Promise.all([
      fetch(`${API_BASE_URL}/users`).then(r => r.json()),
      fetch(`${API_BASE_URL}/posts`).then(r => r.json()),
      fetch(`${API_BASE_URL}/comments`).then(r => r.json())
    ]);
    const elapsed = (performance.now() - start).toFixed(0);
    printOutput("parallel-output", `Promise.all: users=${users.length}, posts=${posts.length}, comments=${comments.length}`);
    printOutput("parallel-output", `Время: ${elapsed}мс (параллельно)`);
  } catch (error) {
    printOutput("parallel-output", `Ошибка: ${error.message}`);
  }
}

// 6.2. fetchWithPromiseRace
async function fetchWithPromiseRace() {
  clearOutput("parallel-output");
  try {
    const result = await Promise.race([
      fetch(`${API_BASE_URL}/posts/1`).then(r => r.json()),
      delay(2000).then(() => { throw new Error("Таймаут 2с"); })
    ]);
    printOutput("parallel-output", `Promise.race: первый ответ — пост "${result.title}"`);
  } catch (error) {
    printOutput("parallel-output", `Ошибка: ${error.message}`);
  }
}

// 6.3. fetchSequentialRequests
async function fetchSequentialRequests() {
  clearOutput("parallel-output");
  const start = performance.now();
  try {
    const userRes = await fetch(`${API_BASE_URL}/users/1`);
    const user = await userRes.json();
    const postsRes = await fetch(`${API_BASE_URL}/users/1/posts`);
    const posts = await postsRes.json();
    const commentsRes = await fetch(`${API_BASE_URL}/posts/${posts[0].id}/comments`);
    const comments = await commentsRes.json();
    const elapsed = (performance.now() - start).toFixed(0);
    printOutput("parallel-output", `Последовательно: user=${user.name}, posts=${posts.length}, comments=${comments.length}`);
    printOutput("parallel-output", `Время: ${elapsed}мс (медленнее, каждый запрос ждёт предыдущий)`);
  } catch (error) {
    printOutput("parallel-output", `Ошибка: ${error.message}`);
  }
}

// 6.4. setupParallelRequests
function setupParallelRequests() {
  getEl("fetch-promise-all").addEventListener("click", fetchWithPromiseAll);
  getEl("fetch-promise-race").addEventListener("click", fetchWithPromiseRace);
  getEl("fetch-sequential").addEventListener("click", fetchSequentialRequests);
}

// ================= ЗАДАНИЕ 7: Реальные сценарии =================

// 7.1. fetchUserWithPosts
async function fetchUserWithPosts() {
  clearOutput("scenario-output");
  try {
    const userRes = await fetch(`${API_BASE_URL}/users/1`);
    const user = await userRes.json();
    const postsRes = await fetch(`${API_BASE_URL}/users/1/posts`);
    const posts = await postsRes.json();
    printOutput("scenario-output", `Пользователь: ${user.name}`);
    printOutput("scenario-output", `Email: ${user.email}`);
    printOutput("scenario-output", `Компания: ${user.company.name}`);
    printOutput("scenario-output", `Постов: ${posts.length}`);
    posts.slice(0, 3).forEach(p => printOutput("scenario-output", `  - ${p.title}`));
  } catch (error) {
    printOutput("scenario-output", `Ошибка: ${error.message}`);
  }
}

// 7.2. fetchWithSearch
async function fetchWithSearch() {
  clearOutput("scenario-output");
  const query = "sunt";
  try {
    const response = await fetch(`${API_BASE_URL}/posts?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const posts = await response.json();
    printOutput("scenario-output", `Поиск по "${query}": найдено ${posts.length} постов`);
    posts.slice(0, 5).forEach(p => printOutput("scenario-output", `  #${p.id}: ${p.title}`));
  } catch (error) {
    printOutput("scenario-output", `Ошибка: ${error.message}`);
  }
}

// 7.3. simulateFileUpload
async function simulateFileUpload() {
  clearOutput("scenario-output");
  const bar = getEl("upload-bar");
  bar.style.width = "0%";
  const formData = new FormData();
  formData.append("file", new Blob(["Содержимое файла для загрузки"], { type: "text/plain" }), "file.txt");
  for (let progress = 0; progress <= 100; progress += 5) {
    bar.style.width = `${progress}%`;
    if (progress % 20 === 0) printOutput("scenario-output", `Загрузка: ${progress}%`);
    await delay(80);
  }
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, { method: "POST", body: formData });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    printOutput("scenario-output", "Файл успешно загружен на сервер!");
  } catch (error) {
    printOutput("scenario-output", `Ошибка загрузки: ${error.message}`);
  }
}

// 7.4. createFetchCache
function createFetchCache(ttlMs = 60000) {
  const cache = new Map();
  return async function cachedFetch(url, options = {}) {
    const cached = cache.get(url);
    if (cached && (Date.now() - cached.timestamp < ttlMs)) {
      printOutput("scenario-output", `[CACHE HIT] ${url} (возраст: ${((Date.now() - cached.timestamp) / 1000).toFixed(1)}с)`);
      return cached.data;
    }
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    cache.set(url, { data, timestamp: Date.now() });
    printOutput("scenario-output", `[CACHE MISS] ${url} — сохранено в кэш`);
    return data;
  };
}

// 7.5. setupRealScenarios
function setupRealScenarios() {
  getEl("fetch-user-posts").addEventListener("click", fetchUserWithPosts);
  getEl("fetch-search").addEventListener("click", fetchWithSearch);
  getEl("fetch-upload").addEventListener("click", simulateFileUpload);
  getEl("fetch-cache").addEventListener("click", async () => {
    clearOutput("scenario-output");
    const cachedFetch = createFetchCache(30000);
    try {
      await cachedFetch(`${API_BASE_URL}/users/1`);
      await cachedFetch(`${API_BASE_URL}/users/1`);
    } catch (error) {
      printOutput("scenario-output", `Ошибка: ${error.message}`);
    }
  });
}

// ================= ИНИЦИАЛИЗАЦИЯ =================
document.addEventListener("DOMContentLoaded", () => {
  setupGetRequests();
  setupCrudRequests();
  setupHeadersAndParams();
  setupResponseHandling();
  setupErrorHandling();
  setupParallelRequests();
  setupRealScenarios();
  console.log("ПР14: все обработчики событий настроены.");
});
