document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    console.log('=== ТЕСТЫ EVENTS ===');
    console.log('basic-btn:', !!document.getElementById('basic-btn') ? 'OK' : 'FAIL');
    console.log('item-list:', !!document.getElementById('item-list') ? 'OK' : 'FAIL');
    console.log('load-image:', !!document.getElementById('load-image') ? 'OK' : 'FAIL');
  }, 100);
});
