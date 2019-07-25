'use strict';
(function () {
  var MIN_MAP_WIDTH = 0;
  var MAX_MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_TAIL_HEIGHT = 22;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adInputs = adForm.querySelectorAll('input, select');
  var mapFilter = map.querySelector('.map__filters');
  var mapFiltersInputs = mapFilter.querySelectorAll('input, select');
  var mapMainPin = map.querySelector('.map__pin--main');
  var addressInput = adForm.querySelector('#address');

  var Coordinate = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coordinate.prototype.setCoords = function (x, y) {
    this.x = x;
    this.y = y;
  };

  var getElementCoords = function (elem, width, height) {
    var posX = elem.offsetLeft;
    var posY = elem.offsetTop;
    return Math.round((posX + width / 2)) + ', ' + Math.round((posY + height));
  };

  var defaultMainPin = {
    coords: getElementCoords(mapMainPin, MAIN_PIN_WIDTH, (MAIN_PIN_HEIGHT / 2)),
    top: mapMainPin.offsetTop,
    left: mapMainPin.offsetLeft
  };

  window.setDefaultMainPinPosition = function () {
    addressInput.value = defaultMainPin.coords;
    mapMainPin.style.top = defaultMainPin.top + 'px';
    mapMainPin.style.left = defaultMainPin.left + 'px';
  };

  mapMainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = new Coordinate(evt.clientX, evt.clientY);

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = new Coordinate(startCoords.x - moveEvt.clientX, startCoords.y - moveEvt.clientY);

      startCoords.setCoords(moveEvt.clientX, moveEvt.clientY);

      var mapMainPinTop = (mapMainPin.offsetTop - shift.y);
      var mapMainPinLeft = (mapMainPin.offsetLeft - shift.x);

      if (mapMainPinTop >= MIN_MAP_HEIGHT && mapMainPinTop <= (MAX_MAP_HEIGHT - MAIN_PIN_HEIGHT)) {
        mapMainPin.style.top = mapMainPinTop + 'px';
      } else if (mapMainPinTop < MIN_MAP_HEIGHT) {
        mapMainPin.style.top = MIN_MAP_HEIGHT + 'px';
      } else if (mapMainPinTop > (MAX_MAP_HEIGHT - MAIN_PIN_HEIGHT)) {
        mapMainPin.style.top = (MAX_MAP_HEIGHT - MAIN_PIN_HEIGHT) + 'px';
      }

      if (mapMainPinLeft >= MIN_MAP_WIDTH && mapMainPinLeft <= (MAX_MAP_WIDTH - MAIN_PIN_WIDTH)) {
        mapMainPin.style.left = mapMainPinLeft + 'px';
      } else if (mapMainPinLeft < MIN_MAP_WIDTH) {
        mapMainPin.style.left = MIN_MAP_WIDTH + 'px';
      } else if (mapMainPinLeft > (MAX_MAP_WIDTH - MAIN_PIN_WIDTH)) {
        mapMainPin.style.left = (MAX_MAP_WIDTH - MAIN_PIN_WIDTH) + 'px';
      }

      addressInput.value = getElementCoords(mapMainPin, MAIN_PIN_WIDTH, (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT));
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.renderPins();
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      window.setDisabled(adInputs);
      window.setDisabled(mapFiltersInputs);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      addressInput.value = getElementCoords(mapMainPin, MAIN_PIN_WIDTH, (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT));
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  addressInput.value = defaultMainPin.coords;
  window.setDisabled(mapFiltersInputs, true);
})();
