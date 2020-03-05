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

    inputAddress.value = mainPinState.left + ', ' + mainPinState.top;
  };

  // module4-task2 - "НЕПРОСТАЯ ВАЛИДАЦИЯ"
  var housingTypeChangeHandler = function () {
    switch (window.data.housingTypeElement.value) {
      case 'bungalo':
        window.data.priceElement.placeholder = 0;
        return;
      case 'flat':
        window.data.priceElement.placeholder = 1000;
        return;
      case 'house':
        window.data.priceElement.placeholder = 5000;
        return;
      case 'palace':
        window.data.priceElement.placeholder = 10000;
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


  // 1-1 2-2 or 1 3 - 3 or 2 or 1 100 - none
  var roomGuestChangeHandler = function () {
    var rooms = window.data.roomNumberElement.value;
    var guests = window.data.guestSelectElement.value;
    var error = '';

    if (rooms === 100 && guests > 0) {
      error = 'Для выбранного количества гостей размещение невозможно';
    } else if (guests > rooms || guests === 0) {
      error = 'Количество гостей больше или меньше чем комнат';
    }

    window.data.roomNumberElement.setCustomValidity(error);
  };

  // дополнительные действия при удачной отправке формы
  var resetFormHandler = function () {
    window.data.adFormElement.reset();
    window.pin.removeCards();
    window.pin.renderPins();
  };

  // отправка формы
  var dataSendFormHandler = function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(window.data.adFormElement, window.messages.successHandler, window.messages.errorHandler));
    window.map.deactivateMode();
  };


  window.adForm = {
    setAddress: setAddress,
    housingTypeChangeHandler: housingTypeChangeHandler,
    checkinChangeHandler: checkinChangeHandler,
    checkoutChangeHandler: checkoutChangeHandler,
    roomGuestChangeHandler: roomGuestChangeHandler,
    dataSendFormHandler: dataSendFormHandler,
    resetFormHandler: resetFormHandler
  };
})();
