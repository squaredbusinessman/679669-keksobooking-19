'use strict';

(function () {
  var mapBlockElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var resetButtonElement = adFormElement.querySelector('.ad-form__reset');
  var adFormFields = adFormElement.querySelectorAll('fieldset, select, input');
  var mapPinMainElement = document.querySelector('.map__pin--main');
  var mapPinsElement = mapBlockElement.querySelector('.map__pins');
  var priceElement = adFormElement.querySelector('#price');
  var housingTypeElement = adFormElement.querySelector('#type');
  var roomNumberElement = adFormElement.querySelector('#room_number');
  var guestSelectElement = adFormElement.querySelector('#capacity');
  var checkinElement = adFormElement.querySelector('#timein');
  var checkoutElement = adFormElement.querySelector('#timeout');
  var formFiltersElement = document.querySelector('.map__filters');
  var cacheOffers = [];

  window.data = {
    KEYCODES: {
      esc: 'Escape',
      enter: 'Enter',
      leftClick: 1
    },

    HOUSING_TYPES: {
      flat: {ru: 'Квартира'},
      bungalo: {ru: 'Бунгало'},
      house: {ru: 'Дом'},
      palace: {ru: 'Дворец'}
    },

    PIN: {
      height: 156,
      width: 78,
      paddingTop: 16
    },

    MAIN_PIN: {
      width: 65,
      height: 80,
      centerX: 570,
      centerY: 375
    },

    COORDINATE_LIMITER: {
      minX: 0,
      maxX: 1200,
      minY: 130,
      maxY: 600
    },

    mapBlockElement: mapBlockElement,
    adFormElement: adFormElement,
    resetButtonElement: resetButtonElement,
    adFormFields: adFormFields,
    mapPinMainElement: mapPinMainElement,
    mapPinsElement: mapPinsElement,
    priceElement: priceElement,
    housingTypeElement: housingTypeElement,
    roomNumberElement: roomNumberElement,
    guestSelectElement: guestSelectElement,
    checkinElement: checkinElement,
    checkoutElement: checkoutElement,
    formFiltersElement: formFiltersElement,
    cache: cacheOffers
  };
})();
