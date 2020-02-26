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
  // Функция создания массива из 8 сгенерированных объектов
  var createNotices = function () {
    var similarAds = [];

    for (var i = 0; i < window.data.SIMILAR_AD_VALUE; i++) {
      similarAds.push({
        author: {
          avatar: 'img/avatars/user' + ('0' + window.data.AD_MOCKS.userPicNum[window.utils.getRandomInt(0, window.data.AD_MOCKS.userPicNum.length - 1)]) + '.png'
        },
        offer: {
          title: window.utils.getRandomProp(window.data.AD_MOCKS.adTitle),
          address: window.utils.getRandomInt(0, 1000) + ',' + window.utils.getRandomInt(0, 1000),
          price: window.utils.getRandomInt(4000, 50000),
          type: window.utils.getRandomProp(window.data.AD_MOCKS.homeType),
          rooms: window.utils.getRandomInt(1, 3),
          guests: window.utils.getRandomInt(1, 10),
          checkin: window.utils.getRandomProp(window.data.AD_MOCKS.departureTime),
          checkout: window.utils.getRandomProp(window.data.AD_MOCKS.departureTime),
          features: window.utils.shuffleArr(window.data.AD_MOCKS.features).slice(0, window.utils.getRandomInt(1, window.data.AD_MOCKS.features.length)),
          description: 'Самое уютное, и комфортное место в этой солнечной системе!',
          photos: window.utils.shuffleArr(window.data.AD_MOCKS.adPhoto).slice(0, window.utils.getRandomInt(1, window.data.AD_MOCKS.adPhoto.length))
        },
        location: {
          x: window.utils.getRandomInt(1, window.data.mapBlockElement.offsetWidth - 1),
          y: window.utils.getRandomInt(250, 630)
        }
      });
    }

    return similarAds;
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

    window.data.mapBlockElement.insertBefore(window.card.renderCard(dataCard), mapFiltersContainer);
  };

  var popupCloseLeftMouseDownHandler = function (evt) {
    if (evt.which === window.data.KEYCODES.leftclick) {
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

  window.card = {
    insertCard: insertCard,
    renderCard: renderCard,
    tryCloseCard: tryCloseCard,
    createNotices: createNotices
  };
})();
