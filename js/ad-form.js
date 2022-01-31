'use strict';

(function () {
  // функция установки адресса в инпут
  var setAddress = function (isActive, newMainPinState) {
    var inputAddress = window.data.adFormElement.querySelector('input[name="address"]');

    var mainPinState = {
      top: parseInt(window.data.mapPinMainElement.style.top, 10) + Math.ceil(window.data.mapPinMainElement.style.height / 2),
      left: parseInt(window.data.mapPinMainElement.style.left, 10) + Math.ceil(window.data.mapPinMainElement.style.width / 2)
    };

    if (newMainPinState) {
      mainPinState = newMainPinState;
    }

    if (isActive) {
      mainPinState.top += Math.round(window.data.mapPinMainElement.clientHeight / 2 + window.data.PIN.paddingTop);
    }

    if (!isActive) {
      mainPinState.left = window.data.MAIN_PIN.centerX;
      mainPinState.top = window.data.MAIN_PIN.centerY;
    }

    inputAddress.value = mainPinState.left + ', ' + mainPinState.top;
  };

  // module4-task2 - "НЕПРОСТАЯ ВАЛИДАЦИЯ"
  var housingTypeChangeHandler = function () {
    switch (window.data.housingTypeElement.value) {
      case 'bungalo':
        window.data.priceElement.placeholder = window.data.HOUSING_TYPES.bungalo.minPrice;
        return;
      case 'flat':
        window.data.priceElement.placeholder = window.data.HOUSING_TYPES.flat.minPrice;
        return;
      case 'house':
        window.data.priceElement.placeholder = window.data.HOUSING_TYPES.house.minPrice;
        return;
      case 'palace':
        window.data.priceElement.placeholder = window.data.HOUSING_TYPES.palace.minPrice;
        return;
    }

    window.data.priceElement.min = window.data.priceElement.placeholder;
  };

  var checkinChangeHandler = function () {
    window.data.checkoutElement.value = window.data.checkinElement.value;
  };

  var checkoutChangeHandler = function () {
    window.data.checkinElement.value = window.data.checkoutElement.value;
  };


  // валидация комнат-гостей
  var roomGuestChangeHandler = function () {
    var rooms = window.data.roomNumberElement.value;
    var guests = window.data.guestSelectElement.value;
    var error = '';

    if (rooms === window.data.ROOMS_GUESTS.maxRooms && guests > window.data.ROOMS_GUESTS.minGuests) {
      error = 'Для выбранного количества гостей размещение невозможно';
    } else if (guests > rooms || guests === window.data.ROOMS_GUESTS.minGuests) {
      error = 'Количество гостей больше или меньше чем комнат';
    }

    window.data.roomNumberElement.setCustomValidity(error);
  };

  // дополнительные действия при удачной отправке формы
  var resetFormHandler = function () {
    window.data.adFormElement.reset();
    window.card.remove();
    window.pin.remove();
    window.filter.reset();
  };

  // УСПЕХ отправки
  var successUpload = function () {
    window.messages.showSuccess(window.messages.SUCCESS);
    resetFormHandler();
    window.map.deactivate();
  };

  // ПРОВАЛ отправки
  var errorUpload = function () {
    window.messages.showError(window.messages.ERROR);
    resetFormHandler();
    window.map.deactivate();
  };

  // отправка формы
  var dataSendFormHandler = function (evt) {
    evt.preventDefault();

    window.server.upload(new FormData(window.data.adFormElement), successUpload, errorUpload);
  };

  // сброс формы
  var resetButtonClickHandler = function (evt) {
    evt.preventDefault();

    resetFormHandler();
    window.map.deactivate();
  };

  window.adForm = {
    setAddress: setAddress,
    housingTypeChangeHandler: housingTypeChangeHandler,
    checkinChangeHandler: checkinChangeHandler,
    checkoutChangeHandler: checkoutChangeHandler,
    roomGuestChangeHandler: roomGuestChangeHandler,
    dataSendHandler: dataSendFormHandler,
    resetButtonClickHandler: resetButtonClickHandler
  };
})();
