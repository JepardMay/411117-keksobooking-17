'use strict';
(function () {
  var HOUSES_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_MAP_WIDTH = 0;
  var MAX_MAP_WIDTH = document.querySelector('.map').offsetWidth;
  var MIN_MAP_HEIGHT = 130;
  var MAX_MAP_HEIGHT = 630;

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

  window.ads = getMockData(8);
})();
