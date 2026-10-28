document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    console.log('=== ТЕСТЫ DOM ===');
    console.log('countChildren:', countChildren() === 3 ? 'OK' : 'FAIL');
    console.log('findSpecialChild:', findSpecialChild() === 'Особый' ? 'OK' : 'FAIL');
    console.log('Карточки:', document.querySelectorAll('#target1 .card').length > 0 ? 'OK' : 'FAIL');
  }, 100);
});
