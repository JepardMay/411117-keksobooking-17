'use strict';
window.unit = (function () {
  var ESC_KEYCODE = 27;

  return {
    isEscEvent: function (evt, element) {
      if (evt.keyCode === ESC_KEYCODE) {
        element.remove();
      }
    }
  };
})();
