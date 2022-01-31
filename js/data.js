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
  var avatarFileChooserElement = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewElement = document.querySelector('.ad-form-header__preview');
  var housingPhotoFileChooserElement = document.querySelector('.ad-form__upload input[type=file]');
  var housingPhotoPreviewElement = document.querySelector('.ad-form__photo');

  window.data = {
    MAX_RENDER_PIN_QUANTITY: 5,

    KEYCODES: {
      esc: 'Escape',
      enter: 'Enter',
      leftClick: 1
    },

    HOUSING_TYPES: {
      flat: {
        ru: 'Квартира',
        minPrice: 1000
      },
      bungalo: {
        ru: 'Бунгало',
        minPrice: 0
      },
      house: {
        ru: 'Дом',
        minPrice: 5000
      },
      palace: {
        ru: 'Дворец',
        minPrice: 10000}
    },

    ROOMS_GUESTS: {
      maxRooms: 100,
      minGuests: 0
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
      maxY: 630
    },

    IMAGE_FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    UPLOAD_IMAGE: {
      avatar: {
        width: 40,
        height: 44
      },
      housingPhoto: {
        width: 70,
        height: 70
      }
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
    cache: cacheOffers,
    avatarFileChooserElement: avatarFileChooserElement,
    avatarPreviewElement: avatarPreviewElement,
    housingPhotoFileChooserElement: housingPhotoFileChooserElement,
    housingPhotoPreviewElement: housingPhotoPreviewElement
  };
})();
