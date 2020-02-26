'use strict';

(function () {


  // Активное состояние.
  var activateMode = function () {
    window.data.mapBlockElement.classList.remove('map--faded');
    window.data.adFormElement.classList.remove('ad-form--disabled');

    window.adForm.setAdress(true);
    window.utils.toggleDisableAttribute(window.data.adFormFields);

    window.data.mapPinMainElement.removeEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.removeEventListener('keydown', mainPinEnterKeyDownHandler);
    window.data.roomNumberElement.addEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.addEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.addEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.addEventListener('change', window.adForm.checkoutChangeHandler);

    window.dragNDrop.mainPinRemoveDragEvent();
    window.pin.renderPins();
  };

  var mainPinEnterKeyDownHandler = function (evt) {
    if (evt.key === window.data.KEYCODES.enter) {
      activateMode();
    }
  };

  var mainPinLeftMouseDownHandler = function (evt) {
    if (evt.which === window.data.KEYCODES.leftclick) {
      activateMode();
    }
  };

  // Деактивация
  var deactivateMode = function () {
    window.data.mapBlockElement.classList.add('map--faded');
    window.data.adFormElement.classList.add('ad-form--disabled');

    window.adForm.setAdress(false);
    window.utils.toggleDisableAttribute(window.data.adFormFields);

    window.data.mapPinMainElement.addEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.addEventListener('keydown', mainPinEnterKeyDownHandler);

    window.data.roomNumberElement.removeEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.removeEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.removeEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.removeEventListener('change', window.adForm.checkoutChangeHandler);

    window.dragNDrop.mainPinAddDragEvent();
  };

  window.map = {
    deactivateMode: deactivateMode
  };
})();
