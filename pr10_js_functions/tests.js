function runTest(name, actual, expected) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected);
  const el = document.createElement('div');
  el.className = 'test-result ' + (pass ? 'success' : 'error');
  el.innerHTML = '<strong>' + name + ':</strong> ' + (pass ? 'OK' : 'FAIL') + '<br>Ожидалось: ' + JSON.stringify(expected) + '<br>Получено: ' + JSON.stringify(actual);
  document.getElementById('testResults').appendChild(el);
}
document.addEventListener('DOMContentLoaded', function () {
  runTest('sum(1,2,3)', sum(1, 2, 3), 6);
  runTest('sum()', sum(), 0);
  runTest('createUser', createUser({ name: 'Иван', age: 25 }), 'Пользователь: Иван, возраст: 25, email: не указан');
  runTest('secretMessage wrong', secretMessage('123', 'Секрет')('000'), 'Доступ запрещен');
  runTest('secretMessage right', secretMessage('123', 'Секрет')('123'), 'Секрет');
  runTest('compose', compose(x => x + 1, x => x * 2)(5), 11);
  runTest('myMap', myMap([1, 2, 3], x => x * 2), [2, 4, 6]);
  runTest('myFilter', myFilter([1, 2, 3, 4], x => x % 2 === 0), [2, 4]);
  runTest('myReduce', myReduce([1, 2, 3, 4], (a, b) => a + b, 0), 10);
  const add = curry((a, b, c) => a + b + c);
  runTest('curry', add(1)(2)(3), 6);
  let callCount = 0;
  const memoized = memoize((x) => { callCount++; return x * 2; });
  memoized(5); memoized(5);
  runTest('memoize', callCount, 1);
  console.log('Все тесты ПР10 выполнены');
});
