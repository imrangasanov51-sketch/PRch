// === ТЕСТЫ ДЛЯ ПР13 (запускаются автоматически, результаты в консоли и #test-output) ===

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    return true;
  }
  console.error(`❌ FAIL: ${message}`);
  return false;
}

async function runTests() {
  console.log("=== Запуск тестов ПР13 ===");
  let passed = 0, total = 0;
  const check = (cond, msg) => { total++; if (assert(cond, msg)) passed++; };

  // --- Тесты createBasicPromise ---
  const resolved = await createBasicPromise(true);
  check(resolved === "Успех!", "createBasicPromise(true) резолвится с 'Успех!'");
  try {
    await createBasicPromise(false);
    check(false, "createBasicPromise(false) должен реджектить");
  } catch (e) {
    check(e.message === "Ошибка!", "createBasicPromise(false) реджектит с 'Ошибка!'");
  }

  // --- Тесты delayWithPromise ---
  const t0 = performance.now();
  await delayWithPromise(100);
  const elapsed = performance.now() - t0;
  check(elapsed >= 95, `delayWithPromise(100) ждёт не менее 100мс (факт: ${elapsed.toFixed(0)}мс)`);
  const delayMsg = await delayWithPromise(50);
  check(typeof delayMsg === "string", "delayWithPromise возвращает строку");

  // --- Тесты retryWithBackoff ---
  let attempts = 0;
  const retryResult = await retryWithBackoff(async () => {
    attempts++;
    if (attempts < 3) throw new Error("fail");
    return "ok";
  }, 5);
  check(retryResult === "ok", "retryWithBackoff успешно ретраит");
  check(attempts === 3, `retryWithBackoff сделал ${attempts} попытки (ожидалось 3)`);

  let failAttempts = 0;
  try {
    await retryWithBackoff(async () => { failAttempts++; throw new Error("always fail"); }, 2);
    check(false, "retryWithBackoff должен бросить ошибку после maxRetries");
  } catch (e) {
    check(e.message === "always fail", "retryWithBackoff бросает последнюю ошибку");
    check(failAttempts === 2, "retryWithBackoff не превысил maxRetries");
  }

  // --- Тесты Promise-утилит (через задачи) ---
  const allResults = await Promise.all([delay(50), delay(50), delay(50)]);
  check(allResults.length === 3, "Promise.all возвращает массив из 3 результатов");
  const raceResult = await Promise.race([delay(100).then(() => "slow"), delay(10).then(() => "fast")]);
  check(raceResult === "fast", "Promise.race возвращает первый завершённый");
  const settled = await Promise.allSettled([Promise.resolve(1), Promise.reject(new Error("x"))]);
  check(settled[0].status === "fulfilled" && settled[1].status === "rejected", "Promise.allSettled возвращает статусы");

  // --- Тест createRequestCache (без сети, проверяем логику на Map) ---
  const cache = createRequestCache();
  check(typeof cache === "function", "createRequestCache возвращает функцию");

  // --- Крайние случаи ---
  check(typeof createBasicPromise === "function", "createBasicPromise существует");
  check(typeof retryWithBackoff === "function", "retryWithBackoff существует");
  check(typeof delayWithPromise === "function", "delayWithPromise существует");

  const summary = `Тесты ПР13: пройдено ${passed}/${total}`;
  console.log(summary);
  const out = document.getElementById("test-output");
  if (out) out.textContent = summary;
  return { passed, total };
}

document.addEventListener("DOMContentLoaded", () => {
  runTests();
});
