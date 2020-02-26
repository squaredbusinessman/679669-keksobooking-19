'use strict';

(function () {
  var mapBlockElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var adFormFields = adFormElement.querySelectorAll('fieldset, select, input');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = mapBlockElement.querySelector('.map__pins');
  var priceElement = adFormElement.querySelector('#price');
  var housingTypeElement = adFormElement.querySelector('#type');
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var guestSelectElement = adFormElement.querySelector('#capacity');
  var checkinElement = adFormElement.querySelector('#timein');
  var checkoutElement = adFormElement.querySelector('#timeout');

  window.data = {
    AD_MOCKS: {
      userPicNum: ['1', '2', '3', '4', '5', '6', '7', '8'],
      departureTime: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      adTitle: ['Уютная комнатка в общежитии', 'Коробка из под холодильника', 'Бунгало на пляже', 'Пентхаус в небоскрёбе', 'Собачья будка', 'Подвальное помещение', 'Койка в доме престарелых', '2-х ярусная яхта'],
      adPhoto: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
      homeType: ['palace', 'flat', 'house', 'bungalow']
    },
    SIMILAR_AD_VALUE: 8,
    PIN: {
      height: 156,
      width: 78,
      paddingTop: 16
    },
    KEYCODES: {
      esc: 'Escape',
      enter: 'Enter',
      leftclick: 0
    },
    HOUSING_TYPES: {
      flat: {ru: 'Квартира'},
      bungalow: {ru: 'Бунгало'},
      house: {ru: 'Дом'},
      palace: {ru: 'Дворец'}
    },
    mapBlockElement: mapBlockElement,
    adFormElement: adFormElement,
    adFormFields: adFormFields,
    mapPinMainElement: mapPinMainElement,
    mapPinsElement: mapPinsElement,
    priceElement: priceElement,
    housingTypeElement: housingTypeElement,
    roomNumberElement: roomNumberElement,
    guestSelectElement: guestSelectElement,
    checkinElement: checkinElement,
    checkoutElement: checkoutElement
  };
})();
