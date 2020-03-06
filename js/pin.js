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
        window.card.tryCloseCard();
        window.card.insertCard(noticeData);
      }
    });

    element.addEventListener('keydown', function (evt) {
      if (evt.key === window.data.KEYCODES.enter) {
        window.card.tryCloseCard();
        window.card.insertCard(noticeData);
      }
    });

    return element;
  };

  // убираем карточки при отправке формы
  var removeCards = function () {
    var card = document.querySelectorAll('.map__card');

    card.forEach(function (cardPopup) {
      cardPopup.remove();
    });
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

  // отрисовка готовых пинов
  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();

    var newData = data.filter(function (item) {
      return item.offer;
    }).slice(0, 5);

    for (var i = 0; i < newData.length; i++) {
      fragment.appendChild(renderPin(newData[i]));
    }

    window.data.mapPinsElement.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins,
    removeCards: removeCards,
    removePins: removePins
  };
})();
