'use strict';

(function () {
  // отрисовка карточки
  var renderCard = function (NoticeData) {
    var cardTemplate = document.querySelector('#card').content;
    var cardElement = cardTemplate.cloneNode(true);
    var popupCloseElement = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = NoticeData.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = NoticeData.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = NoticeData.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = window.data.HOUSING_TYPES[NoticeData.offer.type].ru;
    cardElement.querySelector('.popup__text--capacity').textContent = NoticeData.offer.rooms + ' комнат(а)ы для ' + NoticeData.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + NoticeData.offer.checkin + ', выезд до ' + NoticeData.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = NoticeData.offer.description;
    cardElement.querySelector('.popup__avatar').src = NoticeData.author.avatar;

    renderPhotos(cardElement, NoticeData.offer.photos);
    renderFeatures(cardElement, NoticeData.offer.features);

    // обработчики закрытия карточки объявления
    popupCloseElement.addEventListener('mousedown', popupCloseLeftMouseDownHandler);
    popupCloseElement.addEventListener('keydown', popupCloseKeydownEnterHandler);
    window.addEventListener('keydown', popupCloseKeydownEscHandler);

    return cardElement;
  };

  // функция удаления карточки из DOM
  var tryCloseCard = function () {
    var cardElement = window.data.mapBlockElement.querySelector('.popup');

    if (cardElement) {
      var popupCloseElement = cardElement.querySelector('.popup__close');

      popupCloseElement.removeEventListener('click', popupCloseLeftMouseDownHandler);
      popupCloseElement.removeEventListener('keydown', popupCloseKeydownEnterHandler);
      window.removeEventListener('keydown', popupCloseKeydownEscHandler);

      cardElement.remove();
    }
  };

  var renderPhotos = function (cardElement, photos) {
    var photoElement = cardElement.querySelector('.popup__photos');

    window.utils.deleteChildren(photoElement);

    photos.forEach(function (photoUrl) {
      var photoItemElement = window.utils.createElement({
        tagName: 'img',
        src: photoUrl,
        width: 45,
        height: 40,
        alt: 'Фотография жилья',
        className: 'popup__photo',
        isPhoto: true
      });

      photoElement.appendChild(photoItemElement);
    });
  };

  var renderFeatures = function (cardElement, features) {
    var featureElement = cardElement.querySelector('.popup__features');

    window.utils.deleteChildren(featureElement);

    features.forEach(function (feature) {
      var featureItem = window.utils.createElement({
        tagName: 'li',
        className: 'popup__feature popup__feature--' + feature,
        width: 30,
        height: 28
      });

      featureElement.appendChild(featureItem);
    });
  };

  // функции добавления в DOM попапа с карточкой
  var insertCard = function (dataCard) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');

    window.data.mapBlockElement.insertBefore(window.card.render(dataCard), mapFiltersContainer);
  };

  var popupCloseLeftMouseDownHandler = function (evt) {
    if (evt.buttons === window.data.KEYCODES.leftClick) {
      tryCloseCard();
    }
  };

  var popupCloseKeydownEnterHandler = function (evt) {
    if (evt.key === window.data.KEYCODES.enter) {
      tryCloseCard();
    }
  };

  var popupCloseKeydownEscHandler = function (evt) {
    if (evt.key === window.data.KEYCODES.esc) {
      tryCloseCard();
    }
  };

  // убираем карточки при отправке формы
  var removeCard = function () {
    var card = document.querySelector('.map__card');

    if (card) {
      card.remove();
    }
  };

  window.card = {
    insert: insertCard,
    render: renderCard,
    tryClose: tryCloseCard,
    remove: removeCard
  };
})();
