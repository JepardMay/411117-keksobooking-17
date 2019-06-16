'use strict';

var HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = document.querySelector('.map').offsetWidth;

var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNumber = function (min, max, include) {
  if (include) {
    return (Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return (Math.floor(Math.random() * (max - min)) + min);
};

var getMockData = function (quantity) {
  var arr = [];
  for (var i = 1; i <= quantity; i++) {
    arr.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        type: getRandomElement(HOUSES_TYPES)
      },
      location: {
        x: getRandomNumber(1, MAP_WIDTH),
        y: getRandomNumber(130, 630, true)
      }
    });
  }

  return arr;
};

var ads = getMockData(8);

var map = document.querySelector('.map');

var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;


var createPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var renderPin = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
    mapPinsList.appendChild(fragment);
  }
};

var adForm = document.querySelector('.ad-form');
var adInputs = adForm.querySelectorAll('input, select');
var mapFilters = map.querySelector('.map__filters');
var mapFiltersInputs = mapFilters.querySelectorAll('input, select');

var setDisabled = function (arr, set) {
  for (var i = 0; i < arr.length; i++) {
    if (set) {
      arr[i].setAttribute('disabled', 'disabled');
    } else {
      arr[i].removeAttribute('disabled');
    }
  }
};

setDisabled(adInputs, true);
setDisabled(mapFiltersInputs, true);

var mapMainPin = map.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');

var getElementCoords = function (elem, width, height) {
  var box = elem.getBoundingClientRect();
  addressInput.value = (box.left + pageXOffset - width / 2) + ', ' + (box.top + pageYOffset - height);
};

getElementCoords(mapMainPin, 0, 0);

mapMainPin.addEventListener('click', function () {
  renderPin(ads);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setDisabled(adInputs);
  setDisabled(mapFiltersInputs);
});

mapMainPin.addEventListener('mouseup', function () {
  getElementCoords(mapMainPin, PIN_WIDTH, PIN_HEIGHT);
});

