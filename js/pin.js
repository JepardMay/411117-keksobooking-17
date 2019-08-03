'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var RENDERED_PINS_MAX_QUANTITY = 5;
  var Price = {
    MIDDLE: 10000,
    HIGH: 50000
  };

  var pins = [];

  var mapPinsList = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var mapFilters = document.querySelector('.map__filters-container');
  var filtersForm = mapFilters.querySelector('.map__filters');
  var houseTypeSelect = mapFilters.querySelector('#housing-type');
  var houseType = houseTypeSelect.value;
  var housePriceSelect = mapFilters.querySelector('#housing-price');
  var housePrice = housePriceSelect.value;
  var houseRoomSelect = mapFilters.querySelector('#housing-rooms');
  var houseRoom = houseRoomSelect.value;
  var houseGuestSelect = mapFilters.querySelector('#housing-guests');
  var houseGuest = houseGuestSelect.value;
  var houseFeatureSelect = mapFilters.querySelector('#housing-features');
  var houseFeatureWifi = houseFeatureSelect.querySelector('#filter-wifi');
  var houseFeatureDishwasher = houseFeatureSelect.querySelector('#filter-dishwasher');
  var houseFeatureParking = houseFeatureSelect.querySelector('#filter-parking');
  var houseFeatureWasher = houseFeatureSelect.querySelector('#filter-washer');
  var houseFeatureElevator = houseFeatureSelect.querySelector('#filter-elevator');
  var houseFeatureConditioner = houseFeatureSelect.querySelector('#filter-conditioner');

  filtersForm.addEventListener('change', function () {
    if (document.querySelector('.popup')) {
      document.querySelector('.popup').remove();
    }
    window.debounce(function () {
      updatePins(pins);
    });
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
      window.pin.active();
      pin.classList.add('.map__pin--active');
      window.card.render(data);
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

  var setPriceRange = function (price) {
    if (price < Price.MIDDLE) {
      return 'low';
    } else if (price >= Price.MIDDLE && price < Price.HIGH) {
      return 'middle';
    } else if (price >= Price.HIGH) {
      return 'high';
    }

    return 'any';
  };

  var filterPins = function (data) {
    houseType = houseTypeSelect.value;
    housePrice = housePriceSelect.value;
    houseRoom = houseRoomSelect.value;
    houseGuest = houseGuestSelect.value;

    var filterData = data;
    if (houseType !== 'any') {
      filterData = filterData.filter(function (it) {
        return it.offer.type === houseType;
      });
    }
    if (housePrice !== 'any') {
      filterData = filterData.filter(function (it) {
        return setPriceRange(it.offer.price) === housePrice;
      });
    }
    if (houseRoom !== 'any') {
      filterData = filterData.filter(function (it) {
        return it.offer.rooms === +houseRoom;
      });
    }
    if (houseGuest !== 'any') {
      filterData = filterData.filter(function (it) {
        return it.offer.guests === +houseGuest;
      });
    }
    if (houseFeatureWifi.checked) {
      filterData = filterData.filter(function (it) {
        return it.offer.features.some(function (feathure) {
          return feathure === 'wifi';
        });
      });
    }
    if (houseFeatureDishwasher.checked) {
      filterData = filterData.filter(function (it) {
        return it.offer.features.some(function (feathure) {
          return feathure === 'dishwasher';
        });
      });
    }
    if (houseFeatureParking.checked) {
      filterData = filterData.filter(function (it) {
        return it.offer.features.some(function (feathure) {
          return feathure === 'parking';
        });
      });
    }
    if (houseFeatureWasher.checked) {
      filterData = filterData.filter(function (it) {
        return it.offer.features.some(function (feathure) {
          return feathure === 'washer';
        });
      });
    }
    if (houseFeatureElevator.checked) {
      filterData = filterData.filter(function (it) {
        return it.offer.features.some(function (feathure) {
          return feathure === 'elevator';
        });
      });
    }
    if (houseFeatureConditioner.checked) {
      filterData = filterData.filter(function (it) {
        return it.offer.features.some(function (feathure) {
          return feathure === 'conditioner';
        });
      });
    }

    return renderPin(filterData);
  };

  var updatePins = function (data) {
    var mapPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    mapPins.forEach(function (it) {
      mapPinsList.removeChild(it);
    });

    return filterPins(data);
  };

  var renderPinSuccessHandler = function (data) {
    pins = data;
    updatePins(pins);
  };

  var renderPinErrorHandler = function () {
    document.body.insertAdjacentElement('afterbegin', window.error);
    window.unit.setCurrentPopup(window.error);
  };

  window.pin = {
    render: function () {
      window.data.load(renderPinSuccessHandler, renderPinErrorHandler);
    },
    active: function () {
      var activePin = document.querySelector('.map__pin--active');
      console.log(activePin);
      if (activePin) {
        activePin.classList.remove('.map__pin--active');
      }
    }
  };

})();
