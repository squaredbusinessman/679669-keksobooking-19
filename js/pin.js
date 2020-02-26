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
      if (evt.which === window.data.KEYCODES.leftclick) {
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
  var renderPins = function () {
    var similarAds = window.card.createNotices();
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < similarAds.length; i++) {
      fragment.appendChild(renderPin(similarAds[i]));
    }

    window.data.mapPinsElement.appendChild(fragment);
  };

  window.pin = {
    renderPin: renderPin,
    renderPins: renderPins
  };
})();
