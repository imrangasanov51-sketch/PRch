# Ответы на вопросы для самоконтроля — ПР14

1. **Fetch API vs XMLHttpRequest**: Fetch — современный, Promise-based интерфейс, более чистый синтаксис, встроен в браузер, поддерживает потоки (streams), AbortController, шире возможности для работы с CORS. XHR — старый, callback-based, но поддерживает прогресс загрузки/скачивания нативно (у Fetch прогресс скачивания есть через ReadableStream, загрузки — только через XHR или формы).

2. **Обработка ошибок в Fetch**: fetch reject-ится только при сетевых сбоях (нет соединения, CORS, DNS). HTTP-статусы 404/500 fetch считает УСПЕШНЫМ ответом — проверять вручную через `response.ok` или `response.status`. Поэтому всегда нужна проверка `if (!response.ok) throw new Error(...)`.

3. **HTTP-методы Fetch**: GET (получение), POST (создание), PUT (полная замена ресурса), PATCH (частичное обновление), DELETE (удаление). Также HEAD, OPTIONS — через указание в `method`.

4. **Заголовки запроса/ответа**: `headers: { "Content-Type": "application/json", "Authorization": "Bearer ..." }` в запросе; `response.headers.get("Content-Type")` или `response.headers.forEach()` в ответе. Полезные: Content-Type, Authorization, Accept, Cache-Control, X-Custom-Header.

5. **PUT vs PATCH**: PUT — полная замена ресурса (все поля должны быть отправлены), PATCH — частичное обновление (отправляются только изменяемые поля). PUT идемпотентен, PATCH — не обязательно.

6. **Авторизация**: Basic Auth — `Authorization: Basic base64(login:password)`. Bearer Token — `Authorization: Bearer <token>`. OAuth2 — сначала POST на /token с grant_type, получаем access_token, затем используем как Bearer. Refresh token — для обновления access_token.

7. **Отмена запросов**: AbortController + `signal: controller.signal`, затем `controller.abort()`. Отменяется fetch, Promise reject-ится с AbortError. Используется для таймаутов, отмены устаревших запросов (debounce поиска), навигации.

8. **Форматы данных**: `response.json()` — JSON, `response.text()` — текст, `response.blob()` — бинарные данные (картинки, файлы), `response.arrayBuffer()` — бинарные для низкоуровневой работы, `response.formData()` — FormData. Отправка: `body: JSON.stringify(obj)` с заголовком, или `body: formData` (Content-Type ставится автоматически), или `body: blob`.

9. **Оптимизация**: Promise.all для параллельности, кэширование (Map + TTL), дебаунс/троттлинг, ленивая загрузка, пагинация, prefetching, HTTP-кэш (ETag, Cache-Control), сжатие (gzip/brotli), CDN.

10. **Лучшие практики**: централизованная обёртка над fetch, единая обработка ошибок, таймауты через AbortController, retry-логика, типизация (TypeScript), валидация ответов (zod), избегание дублирующихся запросов, мониторинг, следование принципам REST.
