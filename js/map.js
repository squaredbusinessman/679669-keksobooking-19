'use strict';

(function () {
  // Активное состояние.
  var activateMode = function () {
    window.data.mapBlockElement.classList.remove('map--faded');
    window.data.adFormElement.classList.remove('ad-form--disabled');

    window.adForm.setAddress(true);
    window.utils.toggleDisableAttribute(window.data.adFormFields);


    window.data.mapPinMainElement.removeEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.removeEventListener('keydown', mainPinEnterKeyDownHandler);

    window.data.roomNumberElement.addEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.addEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.addEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.addEventListener('change', window.adForm.checkoutChangeHandler);
    window.data.adFormElement.addEventListener('submit', window.adForm.dataSendFormHandler);
    window.data.resetButtonElement.addEventListener('click', resetButtonLeftClickHandler);

    window.server.load(window.pin.renderPins, window.messages.errorHandler);
  };

  var mainPinEnterKeyDownHandler = function (evt) {
    if (evt.key === window.data.KEYCODES.enter) {
      activateMode();
    }
  };

  var mainPinLeftMouseDownHandler = function (evt) {
    if (evt.buttons === window.data.KEYCODES.leftClick) {
      activateMode();
    }
  };

  // сброс формы
  var resetButtonLeftClickHandler = function (evt) {
    if (evt.buttons === window.data.KEYCODES.leftClick) {
      window.adForm.resetFormHandler();
    }
  };

  // Деактивация
  var deactivateMode = function () {
    window.data.mapBlockElement.classList.add('map--faded');
    window.data.adFormElement.classList.add('ad-form--disabled');

    window.adForm.setAddress(false);
    window.utils.toggleDisableAttribute(window.data.adFormFields);
    window.dragNDrop.mainPinAddDragEvent();

    window.data.mapPinMainElement.addEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.addEventListener('keydown', mainPinEnterKeyDownHandler);

    window.data.roomNumberElement.removeEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.removeEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.removeEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.removeEventListener('change', window.adForm.checkoutChangeHandler);
    window.data.adFormElement.removeEventListener('submit', window.adForm.dataSendFormHandler);
    window.data.resetButtonElement.removeEventListener('click', resetButtonLeftClickHandler);
  };

  window.map = {
    deactivateMode: deactivateMode
  };
})();
