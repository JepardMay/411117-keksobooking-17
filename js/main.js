'use strict';

// Константы
var HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MAP_WIDTH = document.querySelector('.map').offsetWidth;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_TAIL_HEIGHT = 22;

// Переменные
var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var adForm = document.querySelector('.ad-form');
var adInputs = adForm.querySelectorAll('input, select');
var mapFilter = map.querySelector('.map__filters');
var mapFiltersInputs = mapFilter.querySelectorAll('input, select');

var mapMainPin = map.querySelector('.map__pin--main');
var addressInput = adForm.querySelector('#address');

var pricePerNight = adForm.querySelector('#price');
var houseTypeInput = adForm.querySelector('#type');
var timeinInput = adForm.querySelector('#timein');
var timeoutInput = adForm.querySelector('#timeout');

// Функции
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

var setDisabled = function (arr, disabled) {
  for (var i = 0; i < arr.length; i++) {
    if (disabled) {
      arr[i].setAttribute('disabled', 'disabled');
    } else {
      arr[i].removeAttribute('disabled');
    }
  }
};

var getElementCoords = function (elem, width, height) {
  var posY = elem.offsetLeft;
  var posX = elem.offsetTop;
  return (posY - width / 2) + ', ' + (posX - height);
};

// Обработчики событий
mapMainPin.addEventListener('click', function () {
  renderPin(ads);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setDisabled(adInputs);
  setDisabled(mapFiltersInputs);
});

mapMainPin.addEventListener('mouseup', function () {
  addressInput.value = getElementCoords(mapMainPin, MAIN_PIN_WIDTH, (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT));
});

houseTypeInput.addEventListener('change', function () {
  if (houseTypeInput.value === 'bungalo') {
    pricePerNight.min = 0;
    pricePerNight.placeholder = '0';
  } else if (houseTypeInput.value === 'flat') {
    pricePerNight.min = 1000;
    pricePerNight.placeholder = '1000';
  } else if (houseTypeInput.value === 'house') {
    pricePerNight.min = 5000;
    pricePerNight.placeholder = '5000';
  } else if (houseTypeInput.value === 'palace') {
    pricePerNight.min = 10000;
    pricePerNight.placeholder = '10000';
  }
});

timeinInput.addEventListener('change', function () {
  if (timeinInput.value !== timeoutInput.value) {
    timeoutInput.value = timeinInput.value;
  }
});

timeoutInput.addEventListener('change', function () {
  if (timeoutInput.value !== timeinInput.value) {
    timeinInput.value = timeoutInput.value;
  }
});

// Вызовы
var ads = getMockData(8);

addressInput.value = getElementCoords(mapMainPin, MAIN_PIN_WIDTH, (MAIN_PIN_HEIGHT / 2));

setDisabled(adInputs, true);
setDisabled(mapFiltersInputs, true);
