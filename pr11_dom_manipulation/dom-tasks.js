function createCard(title, content) {
  const target = document.getElementById('target1');
  if (!target) return;
  const card = document.createElement('div');
  card.className = 'card';
  const h4 = document.createElement('h4'); h4.textContent = title;
  const p = document.createElement('p'); p.textContent = content;
  card.appendChild(h4); card.appendChild(p); target.appendChild(card);
}
function createList(items) {
  const target = document.getElementById('target1');
  if (!target) return;
  const ol = document.createElement('ol');
  items.forEach(item => { const li = document.createElement('li'); li.textContent = item; ol.appendChild(li); });
  target.appendChild(ol);
}
function countChildren() {
  const parent = document.getElementById('parent-element');
  return parent ? parent.children.length : 0;
}
function findSpecialChild() {
  const special = document.querySelector('#parent-element .special');
  return special ? special.textContent.trim() : null;
}
function setupStyleToggle() {
  const btn = document.getElementById('toggle-style');
  const target = document.getElementById('style-target');
  if (!btn || !target) return;
  btn.addEventListener('click', () => target.classList.toggle('active-style'));
}
function setupClickCounter() {
  const btn = document.getElementById('click-btn');
  const counter = document.getElementById('click-counter');
  if (!btn || !counter) return;
  let count = 0;
  btn.addEventListener('click', () => { count++; counter.textContent = 'Кликов: ' + count; });
}
function setupInputDisplay() {
  const input = document.getElementById('text-input');
  const display = document.getElementById('input-display');
  if (!input || !display) return;
  input.addEventListener('input', () => { display.textContent = 'Вы ввели: ' + input.value; });
}
function addListItem() {
  const input = document.getElementById('item-input');
  const list = document.getElementById('dynamic-list');
  if (!input || !list) return;
  const value = input.value.trim();
  if (!value) return;
  const li = document.createElement('li');
  li.className = 'list-item';
  const span = document.createElement('span'); span.textContent = value;
  const btn = document.createElement('button'); btn.textContent = 'X';
  btn.addEventListener('click', () => li.remove());
  li.appendChild(span); li.appendChild(btn); list.appendChild(li);
  input.value = '';
}
function clearList() {
  const list = document.getElementById('dynamic-list');
  if (list) list.innerHTML = '';
}
function setupListEvents() {
  const addBtn = document.getElementById('add-item');
  const clearBtn = document.getElementById('clear-list');
  if (addBtn) addBtn.addEventListener('click', addListItem);
  if (clearBtn) clearBtn.addEventListener('click', clearList);
}
function validateForm(formData) {
  const errors = [];
  const name = formData.get('name');
  const email = formData.get('email');
  const age = Number(formData.get('age'));
  if (!name || name.trim().length < 2) errors.push('Имя: минимум 2 символа');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Некорректный email');
  if (!age || age < 1 || age > 120) errors.push('Возраст: 1-120');
  return errors;
}
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const errors = validateForm(formData);
  const output = document.getElementById('form-output');
  if (errors.length > 0) {
    output.className = 'output error-message';
    output.innerHTML = '<strong>Ошибки:</strong><br>' + errors.join('<br>');
  } else {
    output.className = 'output success-message';
    output.innerHTML = '<strong>Успех!</strong><br>Имя: ' + formData.get('name') + '<br>Email: ' + formData.get('email') + '<br>Возраст: ' + formData.get('age');
    form.reset();
  }
}
function setupForm() {
  const form = document.getElementById('user-form');
  if (form) form.addEventListener('submit', handleFormSubmit);
}
function initializeApp() {
  setupStyleToggle(); setupClickCounter(); setupInputDisplay(); setupListEvents(); setupForm();
  createCard('Пример карточки', 'Это содержимое');
  createList(['Элемент 1', 'Элемент 2', 'Элемент 3']);
  console.log('Инициализировано');
}
document.addEventListener('DOMContentLoaded', initializeApp);
