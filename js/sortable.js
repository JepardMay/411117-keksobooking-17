'use strict';
(function () {
  window.sorting = function (root) {
    var draggedItem = null;

    [].slice.call(root.querySelectorAll('.ad-form__photo')).forEach(function (item) {
      item.draggable = true;
    });

    var onDragOver = function (evt) {
      evt.preventDefault();
      evt.dataTransfer.dropEffect = 'move';

      var target = evt.target;
      if (target.nodeName === 'IMG') {
        target = target.parentNode;
      }
      if (target && target !== draggedItem && target.nodeName === 'DIV' && target.className === 'ad-form__photo') {
        root.insertBefore(draggedItem, root.children[0] !== target && root.children[1] !== target && target.nextSibling || target);
      }
    };

    var onDragEnd = function (evt) {
      evt.preventDefault();

      root.removeEventListener('dragover', onDragOver, false);
      root.removeEventListener('dragend', onDragEnd, false);
    };

    root.addEventListener('dragstart', function (evt) {
      draggedItem = evt.target;
      if (draggedItem.nodeName === 'IMG') {
        draggedItem = draggedItem.parentNode;
      }
      evt.dataTransfer.effectAllowed = 'move';
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      root.addEventListener('dragover', onDragOver, false);
      root.addEventListener('dragend', onDragEnd, false);
    }, false);
  };
})();
