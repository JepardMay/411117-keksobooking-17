'use strict';
(function () {
  var adForm = document.querySelector('.ad-form');
  var adInputs = adForm.querySelectorAll('input, select');

  var pricePerNight = adForm.querySelector('#price');
  var houseTypeInput = adForm.querySelector('#type');
  var timeinInput = adForm.querySelector('#timein');
  var timeoutInput = adForm.querySelector('#timeout');

  window.setDisabled = function (arr, disabled) {
    for (var i = 0; i < arr.length; i++) {
      if (disabled) {
        arr[i].setAttribute('disabled', 'disabled');
      } else {
        arr[i].removeAttribute('disabled');
      }
    }
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

  window.setDisabled(adInputs, true);
})();
