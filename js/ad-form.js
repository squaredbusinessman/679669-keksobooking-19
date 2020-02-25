'use strict';

(function () {
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

    rooms.setCustomValidity(error);
  };

  window.adForm = {
    housingTypeChangeHandler: housingTypeChangeHandler(),
    checkinChangeHandler: checkinChangeHandler(),
    checkoutChangeHandler: checkoutChangeHandler(),
    roomGuestChangeHandler: roomGuestChangeHandler()
  };
})();
