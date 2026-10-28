function handleBasicClick(event) {
  const output = document.getElementById('basic-output');
  output.innerHTML = 'Событие: ' + event.type + '<br>Координаты: ' + event.clientX + ', ' + event.clientY + '<br>Target: ' + event.target.tagName;
  event.target.classList.add('pulse');
  setTimeout(() => event.target.classList.remove('pulse'), 500);
}
function handleMouseEvents(event) {
  const box = document.getElementById('color-box');
  const output = document.getElementById('mouse-output');
  if (event.type === 'mouseenter') box.style.background = '#e74c3c';
  else if (event.type === 'mouseleave') box.style.background = '#3498db';
  else if (event.type === 'mousemove') output.textContent = 'Координаты: ' + event.clientX + ', ' + event.clientY;
}
function setupBasicEvents() {
  const btn = document.getElementById('basic-btn');
  const box = document.getElementById('color-box');
  if (btn) btn.addEventListener('click', handleBasicClick);
  if (box) {
    box.addEventListener('mouseenter', handleMouseEvents);
    box.addEventListener('mouseleave', handleMouseEvents);
    box.addEventListener('mousemove', handleMouseEvents);
  }
}
function handleKeyEvents(event) {
  const output = document.getElementById('key-output');
  output.innerHTML = 'key: ' + event.key + '<br>code: ' + event.code + '<br>Ctrl: ' + event.ctrlKey + ', Alt: ' + event.altKey + ', Shift: ' + event.shiftKey;
  if (event.ctrlKey && event.key === 's') { event.preventDefault(); output.innerHTML += '<br>Ctrl+S перехвачено!'; }
  if (event.altKey && event.key === 'c') { event.preventDefault(); output.innerHTML += '<br>Alt+C перехвачено!'; }
}
function setupKeyboardEvents() {
  const input = document.getElementById('key-input');
  if (input) input.addEventListener('keydown', handleKeyEvents);
}
function handleDelegationClick(event) {
  const list = document.getElementById('item-list');
  const output = document.getElementById('delegation-output');
  const item = event.target.closest('.item');
  if (!item) return;
  if (event.target.classList.contains('delete')) item.remove();
  else item.classList.toggle('selected');
  const ids = Array.from(list.querySelectorAll('.item.selected')).map(el => el.dataset.id);
  output.textContent = 'Выбранные: ' + (ids.join(', ') || 'нет');
}
function addNewItem() {
  const list = document.getElementById('item-list');
  const newId = Date.now();
  const item = document.createElement('div');
  item.className = 'item';
  item.dataset.id = newId;
  item.innerHTML = 'Элемент ' + newId + ' <span class="delete">X</span>';
  list.appendChild(item);
}
function setupDelegationEvents() {
  const list = document.getElementById('item-list');
  const addBtn = document.getElementById('add-item-btn');
  if (list) list.addEventListener('click', handleDelegationClick);
  if (addBtn) addBtn.addEventListener('click', addNewItem);
}
function preventLinkDefault(event) {
  event.preventDefault();
  const output = document.getElementById('prevention-output');
  output.textContent = 'Переход отменён!';
  event.target.classList.add('shake');
  setTimeout(() => event.target.classList.remove('shake'), 500);
}
function preventFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const value = form.field.value.trim();
  const output = document.getElementById('prevention-output');
  if (!value) { output.textContent = 'Ошибка: поле пустое'; output.className = 'output error-message'; }
  else { output.textContent = 'Данные: ' + value; output.className = 'output success-message'; form.reset(); }
}
function setupPreventionEvents() {
  const link = document.getElementById('prevent-link');
  const form = document.getElementById('prevent-form');
  if (link) link.addEventListener('click', preventLinkDefault);
  if (form) form.addEventListener('submit', preventFormSubmit);
}
function triggerCustomEvent() {
  const event = new CustomEvent('customAction', { detail: { message: 'Привет от кастомного события!' } });
  document.dispatchEvent(event);
}
function handleCustomEvent(event) {
  const output = document.getElementById('custom-output');
  output.textContent = event.detail.message;
  output.classList.add('pulse');
  setTimeout(() => output.classList.remove('pulse'), 500);
}
function setupCustomEvents() {
  document.addEventListener('customAction', handleCustomEvent);
  document.addEventListener('customAction', () => console.log('Слушатель 2'));
  document.addEventListener('customAction', () => console.log('Слушатель 3'));
  const triggerBtn = document.getElementById('trigger-custom');
  const multiBtn = document.getElementById('multiple-listeners');
  if (triggerBtn) triggerBtn.addEventListener('click', triggerCustomEvent);
  if (multiBtn) multiBtn.addEventListener('click', triggerCustomEvent);
}
function loadImageWithEvents() {
  const container = document.getElementById('image-container');
  const output = document.getElementById('loading-output');
  container.innerHTML = '';
  container.className = 'image-container loading';
  output.textContent = 'Статус: начало';
  const img = document.createElement('img');
  img.addEventListener('loadstart', () => output.textContent = 'Загрузка...');
  img.addEventListener('load', () => { container.className = 'image-container success'; output.textContent = 'Загружено'; });
  img.addEventListener('error', () => { container.className = 'image-container error'; output.textContent = 'Ошибка'; });
  img.addEventListener('loadend', () => output.textContent += ' (завершено)');
  img.src = 'https://picsum.photos/300/200?' + Date.now();
  container.appendChild(img);
}
function simulateLoadError() {
  const container = document.getElementById('image-container');
  const output = document.getElementById('loading-output');
  container.innerHTML = '';
  container.className = 'image-container loading';
  const img = document.createElement('img');
  img.addEventListener('error', () => { container.className = 'image-container error'; output.textContent = 'Не удалось загрузить'; });
  img.src = 'https://nonexistent-url-12345.com/image.jpg';
  container.appendChild(img);
}
function setupLoadingEvents() {
  const loadBtn = document.getElementById('load-image');
  const errorBtn = document.getElementById('load-error');
  if (loadBtn) loadBtn.addEventListener('click', loadImageWithEvents);
  if (errorBtn) errorBtn.addEventListener('click', simulateLoadError);
}
let timerInterval = null;
let timerValue = 0;
function startTimer() {
  if (timerInterval) return;
  const output = document.getElementById('timer-output');
  timerInterval = setInterval(() => { timerValue++; output.textContent = 'Таймер: ' + timerValue; }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval); timerInterval = null; timerValue = 0;
  document.getElementById('timer-output').textContent = 'Таймер: 0';
}
function createDebounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
function createThrottle(func, interval) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) { lastCall = now; return func.apply(this, args); }
  };
}
function testDebounce() {
  const output = document.getElementById('async-output');
  let count = 0;
  const debounced = createDebounce(() => { count++; output.textContent = 'Debounce сработал: ' + count + ' раз'; }, 500);
  for (let i = 0; i < 10; i++) debounced();
  output.textContent = '10 вызовов, debounce сработает 1 раз через 500мс...';
}
function testThrottle() {
  const output = document.getElementById('async-output');
  let count = 0;
  const throttled = createThrottle(() => { count++; output.textContent = 'Throttle сработал: ' + count + ' раз'; }, 500);
  for (let i = 0; i < 10; i++) throttled();
}
function setupTimerEvents() {
  const startBtn = document.getElementById('start-timer');
  const stopBtn = document.getElementById('stop-timer');
  const debounceBtn = document.getElementById('debounce-btn');
  const throttleBtn = document.getElementById('throttle-btn');
  if (startBtn) startBtn.addEventListener('click', startTimer);
  if (stopBtn) stopBtn.addEventListener('click', stopTimer);
  if (debounceBtn) debounceBtn.addEventListener('click', testDebounce);
  if (throttleBtn) throttleBtn.addEventListener('click', testThrottle);
}
function initializeEventHandler() {
  setupBasicEvents(); setupKeyboardEvents(); setupDelegationEvents();
  setupPreventionEvents(); setupCustomEvents(); setupLoadingEvents(); setupTimerEvents();
  console.log('Все обработчики инициализированы');
}
document.addEventListener('DOMContentLoaded', initializeEventHandler);
