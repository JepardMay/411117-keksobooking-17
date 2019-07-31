'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adInputs = adForm.querySelectorAll('input, select');
  // var adImagesInput = adForm.querySelectorAll('.ad-form__input');
  var submitButton = adForm.querySelector('.ad-form__submit');

  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successPopup = successTemplate.cloneNode(true);

  var pricePerNight = adForm.querySelector('#price');
  var houseTypeInput = adForm.querySelector('#type');
  var timeinInput = adForm.querySelector('#timein');
  var timeoutInput = adForm.querySelector('#timeout');
  var houseRoomNumber = adForm.querySelector('#room_number');
  var houseCapacity = adForm.querySelector('#capacity');
  var houseCapacityOptions = Array.from(houseCapacity.options);

  var setDisabled = function (arr, disabled) {
    for (var i = 0; i < arr.length; i++) {
      if (disabled) {
        arr[i].setAttribute('disabled', 'disabled');
      } else {
        arr[i].removeAttribute('disabled');
      }
    }
  };

  var setCapacityDisabledOption = function (value) {
    houseCapacityOptions.forEach(function (it) {
      if ((value !== '100' && +it.value <= +value && it.value !== '0') || (value === '100' && it.value === '0')) {
        it.disabled = false;
      } else {
        it.disabled = true;
      }
    });
  };

  var renderFormSuccessHandler = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', successPopup);
    window.unit.setCurrentPopup(successPopup);
    submitButton.removeAttribute('disabled');
    resetPage();
  };

  var renderFormErrorHandler = function () {
    document.querySelector('main').insertAdjacentElement('afterbegin', window.error);
    submitButton.removeAttribute('disabled');
  };

  var resetPage = function () {
    adForm.reset();
    window.photo.resetAvatar();
    window.photo.resetImages();
    var adsPins = Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)'));
    adsPins.forEach(function (it) {
      it.remove();
    });
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    window.map.setDefaultMainPinPosition();
  };

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

  houseRoomNumber.addEventListener('change', function () {
    setCapacityDisabledOption(houseRoomNumber.value);
    var selectedOptions = houseCapacityOptions.filter(function (it) {
      return it.selected === true && !it.disabled;
    });
    if (selectedOptions.length === 0) {
      houseCapacity.value = houseCapacity.querySelector(':enabled').value;
    }
  });

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    submitButton.setAttribute('disabled', 'disabled');
    var data = new FormData(adForm);

    window.data.save(data, renderFormSuccessHandler, renderFormErrorHandler);
  });

  adForm.addEventListener('reset', function () {
    resetPage();
  });

  successPopup.addEventListener('click', function () {
    successPopup.remove();
  });

  setDisabled(adInputs, true);
  setCapacityDisabledOption(houseRoomNumber.value);
  window.form = {
    setDisabled: setDisabled
  };
})();
