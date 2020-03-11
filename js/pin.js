'use strict';

(function () {
  // Создаём DOM-элементы соответствуюшие меткам на карте
  var renderPin = function (noticeData) {
    var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = pinTemplate.cloneNode(true);

    element.style.left = noticeData.location.x - window.data.PIN.width / 2 + 'px';
    element.style.top = noticeData.location.y - window.data.PIN.height + 'px';
    element.querySelector('img').src = noticeData.author.avatar;
    element.querySelector('img').alt = noticeData.offer.title;

    // обработчик событий отрисовки карточки при клике или кейдауне на пин
    element.addEventListener('mousedown', function (evt) {
      if (evt.buttons === window.data.KEYCODES.leftClick) {
        window.card.tryClose();
        window.card.insert(noticeData);
      }
    });

    element.addEventListener('keydown', function (evt) {
      if (evt.key === window.data.KEYCODES.enter) {
        window.card.tryClose();
        window.card.insert(noticeData);
      }
    });

    return element;
  };

  // убираем пины при отправке формы
  var removePins = function () {
    var pins = document.querySelectorAll('.map__pin');

    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var setMainPinDefaultCoordinates = function () {
    window.data.mapPinMainElement.style.left = window.data.MAIN_PIN.centerX + 'px';
    window.data.mapPinMainElement.style.top = window.data.MAIN_PIN.centerY + 'px';
  };

  // отрисовка готовых пинов
  var renderPins = window.utils.debounce(function (data) {
    var fragment = document.createDocumentFragment();

    var newData = data.filter(function (item) {
      return item.offer;
    }).slice(0, window.data.MAX_RENDER_PIN_QUANTITY);

    newData.forEach(function (element) {
      fragment.appendChild(renderPin(element));
    });

    window.data.mapPinsElement.appendChild(fragment);
  });

  window.pin = {
    remove: removePins,
    render: renderPins,
    setDefaultCoordinates: setMainPinDefaultCoordinates
  };
})();
