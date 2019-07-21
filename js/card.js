'use strict';
(function () {
  var map = document.querySelector('.map');
  var mapFilters = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var setHouseType = function (type) {
    switch (type) {
      case 'flat': return 'Квартира';
      case 'bungalo': return 'Бунгало';
      case 'house': return 'Дом';
      case 'palace': return 'Дворец';
      default: return 'Квартира';
    }
  };

  var createCard = function (card) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь.';
    cardElement.querySelector('.popup__type').textContent = setHouseType(card.offer.type);
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей.';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout + '.';

    var setFeatures = function () {
      var listFeatures = cardElement.querySelector('.popup__features');
      listFeatures.innerHTML = '';
      card.offer.features.forEach(function (it) {
        var listElement = document.createElement('li');
        listElement.classList.add('popup__feature', 'popup__feature--' + it);
        listFeatures.appendChild(listElement);
      });
    };
    setFeatures();

    cardElement.querySelector('.popup__description').textContent = card.offer.description;


    return cardElement;
  };

  window.renderCard = function (data) {
    var popup = createCard(data);

    mapFilters.insertAdjacentElement('beforebegin', popup);

    var popupClose = popup.querySelector('.popup__close');
    popupClose.addEventListener('click', function () {
      popup.remove();
    });
  };

// В список .popup__features выведите все доступные удобства в объявлении.
// В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
})();
