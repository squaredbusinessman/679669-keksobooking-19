'use strict';

var AD_MOCKS = {
  userPicNum: ['1', '2', '3', '4', '5', '6', '7', '8'],
  departureTime: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  adTitle: ['Уютная комнатка в общежитии', 'Коробка из под холодильника', 'Бунгало на пляже', 'Пентхаус в небоскрёбе', 'Собачья будка', 'Подвальное помещение', 'Койка в доме престарелых', '2-х ярусная яхта'],
  adPhoto: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  homeType: ['palace', 'flat', 'house', 'bungalow']
};
var SIMILAR_AD_VALUE = 8;
var PIN = {
  height: 156,
  width: 78,
  paddingTop: 16
};
var KEYCODES = {
  esc: 'Escape',
  enter: 'Enter',
  leftclick: 1
};
var HOUSING_TYPES = {
  flat: {ru: 'Квартира'},
  bungalow: {ru: 'Бунгало'},
  house: {ru: 'Дом'},
  palace: {ru: 'Дворец'}
};

var mapBlockElement = document.querySelector('.map');
var adFormElement = document.querySelector('.ad-form');
var adFormFields = adFormElement.querySelectorAll('fieldset, select, input');
var mapPinMainElement = document.querySelector('.map__pin--main');
var mapPinsElement = mapBlockElement.querySelector('.map__pins');
var priceElement = adFormElement.querySelector('#price');
var housingTypeElement = adFormElement.querySelector('#type');
var roomNumberElement = adFormElement.querySelector('#room_number');
var guestSelectElement = adFormElement.querySelector('#capacity');
var checkinElement = adFormElement.querySelector('#timein');
var checkoutElement = adFormElement.querySelector('#timeout');

// Функция генерации случайных чисел
var getRandomInt = function (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

// Функция генерации случайного свойства объекта
var getRandomProp = function (objectPropValue) {
  return objectPropValue[getRandomInt(0, objectPropValue.length - 1)];
};

// Функция перемешивания массива
var shuffleArr = function (arr) {
  var j;
  var x;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = arr[i];
    arr[i] = arr[j];
    arr[j] = x;
  }
  return arr;
};

// Функция создания массива из 8 сгенерированных объектов
var createNotices = function () {
  var similarAds = [];

  for (var i = 0; i < SIMILAR_AD_VALUE; i++) {
    similarAds.push({
      author: {
        avatar: 'img/avatars/user' + ('0' + AD_MOCKS.userPicNum[getRandomInt(0, AD_MOCKS.userPicNum.length - 1)]) + '.png'
      },
      offer: {
        title: getRandomProp(AD_MOCKS.adTitle),
        address: getRandomInt(0, 1000) + ',' + getRandomInt(0, 1000),
        price: getRandomInt(4000, 50000),
        type: getRandomProp(AD_MOCKS.homeType),
        rooms: getRandomInt(1, 3),
        guests: getRandomInt(1, 10),
        checkin: getRandomProp(AD_MOCKS.departureTime),
        checkout: getRandomProp(AD_MOCKS.departureTime),
        features: shuffleArr(AD_MOCKS.features).slice(0, getRandomInt(1, AD_MOCKS.features.length)),
        description: 'Самое уютное, и комфортное место в этой солнечной системе!',
        photos: shuffleArr(AD_MOCKS.adPhoto).slice(0, getRandomInt(1, AD_MOCKS.adPhoto.length))
      },
      location: {
        x: getRandomInt(1, mapBlockElement.offsetWidth - 1),
        y: getRandomInt(250, 630)
      }
    });
  }

  return similarAds;
};

// функции добавления в DOM попапа с карточкой
var insertCard = function (dataCard) {
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  mapBlockElement.insertBefore(renderCard(dataCard), mapFiltersContainer);
};

// функция удаления карточки из DOM
var tryCloseCard = function () {
  var cardElement = mapBlockElement.querySelector('.popup');

  if (cardElement) {
    var popupCloseElement = cardElement.querySelector('.popup__close');

    popupCloseElement.removeEventListener('click', popupCloseLeftMouseDownHandler);
    popupCloseElement.removeEventListener('keydown', popupCloseKeydownEnterHandler);
    window.removeEventListener('keydown', popupCloseKeydownEscHandler);

    cardElement.remove();
  }
};

// Создаём DOM-элементы соответствуюшие меткам на карте
var renderPin = function (noticeData) {
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var element = pinTemplate.cloneNode(true);

  element.style.left = noticeData.location.x - PIN.width / 2 + 'px';
  element.style.top = noticeData.location.y - PIN.height + 'px';
  element.querySelector('img').src = noticeData.author.avatar;
  element.querySelector('img').alt = noticeData.offer.title;

  // обработчик событий отрисовки карточки при клике или кейдауне на пин
  element.addEventListener('mousedown', function (evt) {
    if (evt.which === KEYCODES.leftclick) {
      tryCloseCard();
      insertCard(noticeData);
    }
  });

  element.addEventListener('keydown', function (evt) {
    if (evt.key === KEYCODES.enter) {
      tryCloseCard();
      insertCard(noticeData);
    }
  });

  return element;
};


var renderPins = function () {
  var similarAds = createNotices();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(renderPin(similarAds[i]));
  }

  mapPinsElement.appendChild(fragment);
};

var createElement = function (data) {
  var element = document.createElement(data.tagName);
  element.setAttribute('width', data.width);
  element.setAttribute('height', data.height);
  element.className = data.className;

  if (data.isPhoto) {
    element.setAttribute('src', data.src);
    element.setAttribute('alt', data.alt);
  }

  return element;
};

var deleteChildren = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};


var renderPhotos = function (cardElement, photos) {
  var photoElement = cardElement.querySelector('.popup__photos');

  deleteChildren(photoElement);

  photos.forEach(function (photoUrl) {
    var photoItemElement = createElement({
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

  deleteChildren(featureElement);

  features.forEach(function (feature) {
    var featureItem = createElement({
      tagName: 'li',
      className: 'popup__feature popup__feature--' + feature,
      width: 30,
      height: 28
    });

    featureElement.appendChild(featureItem);
  });
};

var renderCard = function (NoticeData) {
  var cardTemplate = document.querySelector('#card').content;
  var cardElement = cardTemplate.cloneNode(true);
  var popupCloseElement = cardElement.querySelector('.popup__close');

  cardElement.querySelector('.popup__title').textContent = NoticeData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = NoticeData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = NoticeData.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = HOUSING_TYPES[NoticeData.offer.type].ru;
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

var popupCloseLeftMouseDownHandler = function (evt) {
  if (evt.which === KEYCODES.leftclick) {
    tryCloseCard();
  }
};

var popupCloseKeydownEnterHandler = function (evt) {
  if (evt.key === KEYCODES.enter) {
    tryCloseCard();
  }
};

var popupCloseKeydownEscHandler = function (evt) {
  if (evt.key === KEYCODES.esc) {
    tryCloseCard();
  }
};

// функция установки адресса в инпут
var setAddress = function (isActive) {
  var inputAddress = adFormElement.querySelector('input[name="address"]');

  var mainPinState = {
    top: parseInt(mapPinMainElement.style.top, 10) + Math.ceil(mapPinMainElement.style.height / 2),
    left: parseInt(mapPinMainElement.style.left, 10) + Math.ceil(mapPinMainElement.style.width / 2)
  };

  if (isActive) {
    mainPinState.top += Math.round(mapPinMainElement.clientHeight / 2 + PIN.paddingTop);
  }

  inputAddress.value = mainPinState.left + ', ' + mainPinState.top;
};

// Активное состояние.
var activateMode = function () {
  mapBlockElement.classList.remove('map--faded');
  adFormElement.classList.remove('ad-form--disabled');

  setAddress(true);
  toggleDisableAttribute(adFormFields);

  mapPinMainElement.removeEventListener('mousedown', mainPinLeftMouseDownHandler);
  mapPinMainElement.removeEventListener('keydown', mainPinEnterKeyDownHandler);
  roomNumberElement.addEventListener('change', roomGuestChangeHandler);
  housingTypeElement.addEventListener('change', housingTypeChangeHandler);
  checkinElement.addEventListener('change', chekinChangeHandler);
  checkoutElement.addEventListener('change', checkoutChangeHandler);

  renderPins();
};

// module4-task2 - "НЕПРОСТАЯ ВАЛИДАЦИЯ"
var housingTypeChangeHandler = function () {
  switch (housingTypeElement.value) {
    case 'bungalo':
      priceElement.placeholder = 0;
      return;
    case 'flat':
      priceElement.placeholder = 1000;
      return;
    case 'house':
      priceElement.placeholder = 5000;
      return;
    case 'palace':
      priceElement.placeholder = 10000;
      return;
  }

  priceElement.min = priceElement.placeholder;
};

var chekinChangeHandler = function () {
  checkoutElement.value = checkinElement.value;
};

var checkoutChangeHandler = function () {
  checkinElement.value = checkoutElement.value;
};


// 1-1 2-2 or 1 3 - 3 or 2 or 1 100 - none
var roomGuestChangeHandler = function () {
  var rooms = roomNumberElement.value;
  var guests = guestSelectElement.value;
  var error = '';

  if (rooms === 100 && guests > 0) {
    error = 'Для выбранного количества гостей размещение невозможно';
  } else if (guests > rooms || guests === 0) {
    error = 'Количество гостей больше или меньше чем комнат';
  }

  rooms.setCustomValidity(error);
};

var mainPinEnterKeyDownHandler = function (evt) {
  if (evt.key === KEYCODES.enter) {
    activateMode();
  }
};

var mainPinLeftMouseDownHandler = function (evt) {
  if (evt.which === KEYCODES.leftclick) {
    activateMode();
  }
};

var toggleDisableAttribute = function (elements) {
  elements.forEach(function (element) {
    element.disabled = !element.disabled;
  });
};

var deactivateMode = function () {
  mapBlockElement.classList.add('map--faded');
  adFormElement.classList.add('ad-form--disabled');

  setAddress(false);
  toggleDisableAttribute(adFormFields);

  mapPinMainElement.addEventListener('mousedown', mainPinLeftMouseDownHandler);
  mapPinMainElement.addEventListener('keydown', mainPinEnterKeyDownHandler);

  roomNumberElement.removeEventListener('change', roomGuestChangeHandler);
  housingTypeElement.removeEventListener('change', housingTypeChangeHandler);
  checkinElement.removeEventListener('change', chekinChangeHandler);
  checkoutElement.removeEventListener('change', checkoutChangeHandler);
};

deactivateMode();
