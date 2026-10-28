// === ТЕСТЫ ДЛЯ ПР14 (запускаются автоматически) ===

function assert(condition, message) {
  if (condition) { console.log(`✅ PASS: ${message}`); return true; }
  console.error(`❌ FAIL: ${message}`); return false;
}

async function runTests() {
  console.log("=== Запуск тестов ПР14 ===");
  let passed = 0, total = 0;
  const check = (cond, msg) => { total++; if (assert(cond, msg)) passed++; };

  check(typeof fetchWithRetry === "function", "fetchWithRetry существует");
  check(typeof createFetchCache === "function", "createFetchCache существует");
  check(typeof fetchGetRequest === "function", "fetchGetRequest существует");

  // Проверка HTTP-ответа (не сетевая ошибка)
  const res = await fetch(`${API_BASE_URL}/posts/1`);
  check(res.ok === true, "GET /posts/1 возвращает ok=true");
  check(res.status === 200, "GET /posts/1 возвращает статус 200");
  const data = await res.json();
  check(data.id === 1, "GET /posts/1 возвращает пост с id=1");
  check(typeof data.title === "string", "Пост содержит title (строка)");

  // Проверка 404
  const notFound = await fetch(`${API_BASE_URL}/posts/999999`);
  check(notFound.ok === false, "GET /posts/999999 возвращает ok=false");
  check(notFound.status === 404, "GET /posts/999999 возвращает статус 404");

  // Проверка POST
  const postRes = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "test", body: "test body", userId: 1 })
  });
  check(postRes.status === 201, "POST /posts возвращает статус 201");
  const postData = await postRes.json();
  check(postData.id > 0, "POST /posts возвращает созданный пост с id");

  // Проверка DELETE
  const delRes = await fetch(`${API_BASE_URL}/posts/1`, { method: "DELETE" });
  check(delRes.ok === true, "DELETE /posts/1 успешен");

  // Проверка URLSearchParams
  const params = new URLSearchParams({ _limit: "3" });
  const limited = await fetch(`${API_BASE_URL}/posts?${params}`).then(r => r.json());
  check(limited.length === 3, "URL-параметр _limit=3 возвращает ровно 3 поста");

  // Проверка AbortController
  const controller = new AbortController();
  controller.abort();
  try {
    await fetch(`${API_BASE_URL}/posts/1`, { signal: controller.signal });
    check(false, "AbortController должен выбросить AbortError");
  } catch (e) {
    check(e.name === "AbortError", "AbortController выбрасывает AbortError");
  }

  // Проверка кэша
  const cache = createFetchCache(5000);
  const d1 = await cache(`${API_BASE_URL}/users/1`);
  const d2 = await cache(`${API_BASE_URL}/users/1`);
  check(d1.name === d2.name, "Кэш возвращает одинаковые данные");

  // Проверка retry
  let attempts = 0;
  const retryData = await fetchWithRetry(`${API_BASE_URL}/posts/1`);
  check(retryData.id === 1, "fetchWithRetry успешно выполняет запрос");

  const summary = `Тесты ПР14: пройдено ${passed}/${total}`;
  console.log(summary);
  const out = document.getElementById("test-output");
  if (out) out.textContent = summary;
}

document.addEventListener("DOMContentLoaded", () => { runTests(); });
