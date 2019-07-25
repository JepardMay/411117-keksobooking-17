'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var RENDERED_PINS_MAX_QUANTITY = 5;

  var pins = [];

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapFilters = document.querySelector('.map__filters-container');
  var houseTypeSelect = mapFilters.querySelector('#housing-type');
  var houseType = houseTypeSelect.value;

  houseTypeSelect.addEventListener('change', function () {
    houseType = houseTypeSelect.value;
    updatePins(pins);
  });

  var createPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
    pinElement.querySelector('img').src = pin.author.avatar;
    pinElement.querySelector('img').alt = pin.offer.description;
    pinElement.querySelector('img').title = pin.offer.title;

    return pinElement;
  };

  var addPinClickHandler = function (pin, data) {
    pin.addEventListener('click', function () {
      window.renderCard(data);
    });
  };

  var renderPin = function (data) {
    var takeNumber = data.length > RENDERED_PINS_MAX_QUANTITY ? RENDERED_PINS_MAX_QUANTITY : data.length;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < takeNumber; i++) {
      if (data[i].offer) {
        var pinButton = fragment.appendChild(createPin(data[i]));
        mapPinsList.appendChild(fragment);
        addPinClickHandler(pinButton, data[i]);
      }
    }
  };

  var updatePins = function (data) {
    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    mapPins.forEach(function (it) {
      mapPinsList.removeChild(it);
    });
    if (houseType !== 'any') {
      var sameHouseTypePins = data.filter(function (it) {
        return it.offer.type === houseType;
      });
      return renderPin(sameHouseTypePins);
    }

    return renderPin(data);
  };

  var renderPinSuccessHandler = function (data) {
    pins = data;
    updatePins(pins);
  };

  var renderPinErrorHandler = function () {
    document.body.insertAdjacentElement('afterbegin', window.error);
    window.setCurrentPopup(window.error);
  };

  window.renderPins = function () {
    window.data.load(renderPinSuccessHandler, renderPinErrorHandler);
  };

})();
