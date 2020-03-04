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
      if (evt.buttons === window.data.KEYCODES.leftclick) {
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

  // отрисовка готовых пинов
  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    var filteringOffers = function (offers) {
      return offers.filter(function (item) {
        return item.offer;
      });
    };

    var newData = filteringOffers(data);
    var finishData = newData.slice(0, 5);

    for (var i = 0; i < finishData.length; i++) {
      fragment.appendChild(renderPin(finishData[i]));
    }

    window.data.mapPinsElement.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins
  };
})();
