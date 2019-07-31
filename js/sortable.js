'use strict';
(function () {
  window.sorting = function (root, onUpdate) {
    var draggedItem = null;

    // Делаем всех детей перетаскиваемыми
    [].slice.call(root.querySelectorAll('.ad-form__photo')).forEach(function (item) {
      item.draggable = true;
    });

    // Фнукция отвечающая за сортировку
    var _onDragOver = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      var target = evt.target;
      if (target && target !== draggedItem && target.nodeName === 'DIV') {
        // Сортируем
        root.insertBefore(draggedItem, target.nextSibling || target);
      }
    };

    // Окончание сортировки
    var _onDragEnd = function (evt) {
      evt.preventDefault();

      draggedItem.classList.remove('ghost');
      root.removeEventListener('dragover', _onDragOver, false);
      root.removeEventListener('dragend', _onDragEnd, false);

      // Сообщаем об окончании сортировки
      onUpdate(draggedItem);
    };

    // Начало сортировки
    root.addEventListener('dragstart', function (evt) {
      draggedItem = evt.target; // Запоминаем элемент который будет перемещать

      // Ограничиваем тип перетаскивания
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      // Пописываемся на события при dnd
      root.addEventListener('dragover', _onDragOver, false);
      root.addEventListener('dragend', _onDragEnd, false);
    }, false);
  };
})();
