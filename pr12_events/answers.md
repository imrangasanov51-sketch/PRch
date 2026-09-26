# Ответы ПР12

1. preventDefault отменяет поведение браузера; stopPropagation — всплытие.
2. Делегирование — один обработчик на родителе. Меньше памяти.
3. Фазы: capturing → target → bubbling.
4. event.target — где произошло; event.currentTarget — где обработчик.
5. CustomEvent: new CustomEvent + dispatchEvent.
6. Debounce — после паузы; Throttle — не чаще интервала.
7. removeEventListener — важно для предотвращения утечек.
8. События error, loadend у img/script.
9. addEventListener — несколько обработчиков; onclick — один.
10. Делегирование, throttle/debounce, пассивные слушатели.
