'use strict';

(function () {
  // функция установки адресса в инпут
  var setAddress = function (isActive) {
    var inputAddress = window.data.adFormElement.querySelector('input[name="address"]');

    var mainPinState = {
      top: parseInt(window.data.mapPinMainElement.style.top, 10) + Math.ceil(window.data.mapPinMainElement.style.height / 2),
      left: parseInt(window.data.mapPinMainElement.style.left, 10) + Math.ceil(window.data.mapPinMainElement.style.width / 2)
    };

    if (isActive) {
      mainPinState.top += Math.round(window.data.mapPinMainElement.clientHeight / 2 + window.data.PIN.paddingTop);
    }

    inputAddress.value = mainPinState.left + ', ' + mainPinState.top;
  };

  // отрисовка готовых пинов
  var renderPins = function () {
    var similarAds = window.card.createNotices();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < similarAds.length; i++) {
      fragment.appendChild(window.pin.renderPin(similarAds[i]));
    }

    window.data.mapPinsElement.appendChild(fragment);
  };

  // функции добавления в DOM попапа с карточкой
  var insertCard = function (dataCard) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    window.data.mapBlockElement.insertBefore(window.card.renderCard(dataCard), mapFiltersContainer);
  };

  // Активное состояние.
  var activateMode = function () {
    window.data.mapBlockElement.classList.remove('map--faded');
    window.data.adFormElement.classList.remove('ad-form--disabled');

    setAddress(true);
    window.utils.toggleDisableAttribute(window.data.adFormFields);

    window.data.mapPinMainElement.removeEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.removeEventListener('keydown', mainPinEnterKeyDownHandler);
    window.data.roomNumberElement.addEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.addEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.addEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.addEventListener('change', window.adForm.checkoutChangeHandler);

    renderPins();
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

    setAddress(false);
    window.utils.toggleDisableAttribute(window.data.adFormFields);

    window.data.mapPinMainElement.addEventListener('mousedown', mainPinLeftMouseDownHandler);
    window.data.mapPinMainElement.addEventListener('keydown', mainPinEnterKeyDownHandler);

    window.data.roomNumberElement.removeEventListener('change', window.adForm.roomGuestChangeHandler);
    window.data.housingTypeElement.removeEventListener('change', window.adForm.housingTypeChangeHandler);
    window.data.checkinElement.removeEventListener('change', window.adForm.checkinChangeHandler);
    window.data.checkoutElement.removeEventListener('change', window.adForm.checkoutChangeHandler);
  };

  window.map = {
    insertCard: insertCard,
    deactivateMode: deactivateMode
  };
})();
