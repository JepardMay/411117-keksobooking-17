'use strict';

// Константы
var HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_MAP_WIDTH = 0;
var MAX_MAP_WIDTH = document.querySelector('.map').offsetWidth;
var MIN_MAP_HEIGHT = 130;
var MAX_MAP_HEIGHT = 630;
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
        x: getRandomNumber(MIN_MAP_WIDTH, MAX_MAP_WIDTH),
        y: getRandomNumber(MIN_MAP_HEIGHT, MAX_MAP_HEIGHT, true)
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
mapMainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

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
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    addressInput.value = getElementCoords(mapMainPin, MAIN_PIN_WIDTH, (MAIN_PIN_HEIGHT + MAIN_PIN_TAIL_HEIGHT));

    renderPin(ads);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setDisabled(adInputs);
    setDisabled(mapFiltersInputs);

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
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
