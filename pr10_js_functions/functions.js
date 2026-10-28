function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
function createUser({ name, age, email = 'не указан' }) {
  return 'Пользователь: ' + name + ', возраст: ' + age + ', email: ' + email;
}
function secretMessage(password, message) {
  return function (inputPassword) {
    return inputPassword === password ? message : 'Доступ запрещен';
  };
}
function compose(...functions) {
  return function (x) {
    return functions.reduceRight((acc, fn) => fn(acc), x);
  };
}
function myMap(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) result.push(callback(array[i], i, array));
  return result;
}
function myFilter(array, callback) {
  const result = [];
  for (let i = 0; i < array.length; i++) if (callback(array[i], i, array)) result.push(array[i]);
  return result;
}
function myReduce(array, callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;
  if (accumulator === undefined) { accumulator = array[0]; startIndex = 1; }
  for (let i = startIndex; i < array.length; i++) accumulator = callback(accumulator, array[i], i, array);
  return accumulator;
}
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return function (...args2) { return curried.apply(this, args.concat(args2)); };
  };
}
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}
function throttle(fn, interval) {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= interval) { lastCall = now; return fn.apply(this, args); }
  };
}
