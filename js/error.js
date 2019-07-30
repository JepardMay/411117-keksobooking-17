'use strict';
(function () {
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorButton = errorPopup.querySelector('.error__button');

  errorPopup.addEventListener('click', function () {
    errorPopup.remove();
  });

  errorButton.addEventListener('click', function () {
    errorPopup.remove();
  });

  window.error = errorPopup;
})();
