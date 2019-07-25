'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var currentPopup = null;

  window.setCurrentPopup = function (popup) {
    currentPopup = popup;
  };

  window.addEventListener('keydown', function (evt) {
    if (currentPopup && evt.keyCode === ESC_KEYCODE) {
      currentPopup.remove();
    }
  });
})();
