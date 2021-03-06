'use strict';

(function () {
  // Активное состояние.
  var activateMode = function () {
    window.data.mapBlockElement.classList.remove('map--faded');
    window.data.adFormElement.classList.remove('ad-form--disabled');

    window.adForm.setAddress(true);
    window.utils.toggleDisableAttribute(window.data.adFormFields);
    window.adForm.roomGuestChangeHandler();

    window.data.mapPinMainElement.removeEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.removeEventListener('keydown', mainPinEnterKeyDownHandler);

    window.data.guestSelectElement.addEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.roomNumberElement.addEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.addEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.addEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.addEventListener('change', window.adForm.checkoutChangeHandler);
    window.data.adFormElement.addEventListener('submit', window.adForm.dataSendHandler);
    window.data.resetButtonElement.addEventListener('click', window.adForm.resetButtonClickHandler);
    window.data.formFiltersElement.addEventListener('change', window.filter.formFiltersChangeHandler);
    window.data.avatarFileChooserElement.addEventListener('change', window.imageUploader.sendAvatarHandler);
    window.data.housingPhotoFileChooserElement.addEventListener('change', window.imageUploader.sendHousingPhotoHandler);

    window.server.load(function (data) {
      window.data.cache = data;
      window.pin.render(data);
    }, window.messages.showError);
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

  // Деактивация
  var deactivateMode = function () {
    window.data.mapBlockElement.classList.add('map--faded');
    window.data.adFormElement.classList.add('ad-form--disabled');

    window.adForm.setAddress(false);
    window.utils.toggleDisableAttribute(window.data.adFormFields);
    window.dragNDrop.add();
    window.pin.setDefaultCoordinates();

    window.data.mapPinMainElement.addEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.addEventListener('keydown', mainPinEnterKeyDownHandler);

    window.data.guestSelectElement.removeEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.removeEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.removeEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.removeEventListener('change', window.adForm.checkoutChangeHandler);
    window.data.adFormElement.removeEventListener('submit', window.adForm.dataSendHandler);
    window.data.resetButtonElement.removeEventListener('click', window.adForm.resetButtonClickHandler);
    window.data.formFiltersElement.removeEventListener('change', window.filter.formFiltersChangeHandler);
    window.data.avatarFileChooserElement.removeEventListener('change', window.imageUploader.sendAvatarHandler);
    window.data.housingPhotoFileChooserElement.removeEventListener('change', window.imageUploader.sendHousingPhotoHandler);
  };

  window.map = {
    deactivate: deactivateMode
  };
})();
