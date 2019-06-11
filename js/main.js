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
map.classList.remove('map--faded');

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

var setAttributes = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(createPin(pins[i]));
    mapPinsList.appendChild(fragment);
  }
};

setAttributes(ads);
