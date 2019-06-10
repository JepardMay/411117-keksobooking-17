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

var ads = [
  {
    author: {
      avatar: 'img/avatars/user01.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user02.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user03.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user04.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user05.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user06.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user07.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user08.png'
    },
    offer: {
      type: getRandomElement(HOUSES_TYPES)
    },
    location: {
      x: getRandomNumber(1, MAP_WIDTH),
      y: getRandomNumber(130, 630, true)
    }
  }
];

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinsList = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = mapPinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pin.location.x + 'px; top: ' + pin.location.y + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.type;

  return pinElement;
};

var createPin = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
    mapPinsList.appendChild(fragment);
  }
};

createPin(ads);

