'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ESC_KEYCODE = 27;

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = errorTemplate.cloneNode(true);
  var errorButton = errorPopup.querySelector('.error__button');

  var createPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.description;
    pinElement.querySelector('img').title = pin.offer.title;

    return pinElement;
  };

  var renderPinSuccessHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
      mapPinsList.appendChild(fragment);
    }
  };

  var renderPinErrorHandler = function (errorMessage) {
    document.body.insertAdjacentElement('afterbegin', errorPopup);
  };

  window.renderPins = function () {
    window.data.load(renderPinSuccessHandler, renderPinErrorHandler)
  };

  errorPopup.addEventListener('click', function () {
    errorPopup.remove();
  });

  if (errorPopup) {
    window.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        errorPopup.remove();
      }
    });
  }

  errorButton.addEventListener('click', function () {
    errorPopup.remove();
    window.renderPins();
  });

})();
