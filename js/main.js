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
  width: 78
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

var adFormElement = document.querySelector('.ad-form');
var adFormAvatarElement = adFormElement.querySelector('.ad-form-header__input');
var mapFiltersFormElement = document.querySelector('.map__filters');
var mapPinMainElement = document.querySelector('.map__pin--main');
var priceElement = adFormElement.querySelector('#price');
var housingTypeElement = adFormElement.querySelector('#type');
var roomNumberElement = adFormElement.querySelector('#room_number');
var guestSelectElement = adFormElement.querySelector('#capacity');

// Функция генерации случайных чисел
var getRandomInt = function (minimum, maximum) {
  return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
};

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

// Неактивное состояние.
var onMainPinEnterKeyDownHandler = function (evt) {
  if (evt.key === KEYCODES.enter) {
    activateMode();
  }
};

var onMainPinLeftMouseDownHandler = function (evt) {
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
  document.querySelector('.map').classList.add('map--faded');

  mapPinMainElement.addEventListener('mousedown', onMainPinLeftMouseDownHandler);
  mapPinMainElement.addEventListener('keydown', onMainPinEnterKeyDownHandler);

  roomNumberElement.removeEventListener('change', onRoomGuestChange);
  housingTypeElement.removeEventListener('change', onHousingTypeChange);
};

// Функция создания массива из 8 сгенерированных объектов
var createNotices = function () {
  var similarAds = [];
  var xMaxCoordinate = document.querySelector('.map');

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
        x: getRandomInt(1, xMaxCoordinate.offsetWidth - 1),
        y: getRandomInt(250, 630)
      }
    });
  }

  return similarAds;
};

// Создаём DOM-элементы соответствуюшие меткам на карте
var renderPin = function (noticeData) {
  var pinTemplate = document.querySelector('#pin').content;
  var element = pinTemplate.cloneNode(true);

  element.querySelector('.map__pin').style.left = noticeData.location.x - PIN.width / 2 + 'px';
  element.querySelector('.map__pin').style.top = noticeData.location.y - PIN.height + 'px';
  element.querySelector('.map__pin img').src = noticeData.author.avatar;
  element.querySelector('.map__pin img').alt = noticeData.offer.title;

  return element;
};

var renderPins = function () {
  var similarAds = createNotices();
  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins');

  for (var i = 0; i < similarAds.length; i++) {
    fragment.appendChild(renderPin(similarAds[i]));
  }

  mapPins.appendChild(fragment);
};

/* var createElement = function (data) {
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

var deleteChilds = function (element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};*/

/*
var renderPhotos = function (cardElement, photos) {
  var photoElement = cardElement.querySelector('.popup__photos');

  deleteChilds(photoElement);

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

  deleteChilds(featureElement);

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
*/


/* var renderCard = function (NoticeData) {
  var cardTemplate = document.querySelector('#card').content;
  var cardElement = cardTemplate.cloneNode(true);

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

  return cardElement;
};

// функция вставки карточки первого элемента массива объявлений
var insertCard = function () {
  var similarAds = createNotices();
  var mapBlock = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  mapBlock.insertBefore(renderCard(similarAds[1]), mapFiltersContainer);
};*/

// функция установки адресса в инпут
var setAddress = function (isActive) {
  var inputAddress = adFormElement.querySelector('input[name="address"]');

  var mainPinState = {
    top: parseInt(mapPinMainElement.style.top, 10) + Math.ceil(mapPinMainElement.style.height / 2),
    left: parseInt(mapPinMainElement.style.left, 10) + Math.ceil(mapPinMainElement.style.width / 2)
  };

  if (isActive) {
    mainPinState.top += Math.round(mapPinMainElement.clientHeight / 2 + 16); // откуда 16?
  }

  inputAddress.value = mainPinState.left + ', ' + mainPinState.top;
};

// Активное состояние.
var activateMode = function () {
  document.querySelector('.map').classList.remove('map--faded');

  setAddress(true);

  adFormElement.classList.remove('ad-form--disabled');

  mapPinMainElement.removeEventListener('mousedown', activateMode);
  mapPinMainElement.removeEventListener('keydown', onMainPinEnterKeyDownHandler);

  roomNumberElement.addEventListener('change', onRoomGuestChange);
  housingTypeElement.addEventListener('change', onHousingTypeChange);
  // checkinValue.addEventListener('change', onChekinChange);
  // checkoutValue.addEventListener('change', onCheckoutChange);

  renderPins();
};

// module4-task2 - "НЕПРОСТАЯ ВАЛИДАЦИЯ"
var minimumPrice = function () {
  var housingTypeOptions = housingTypeElement.querySelector('option');
  var activeOption = housingTypeElement.options[housingTypeElement.selectedIndex];

  minPriceValidation(activeOption, housingTypeOptions);
};

var minPriceValidation = function (itemOption) {
  priceElement.min = HOUSING_TYPES[itemOption.value].min;
  priceElement.placeholder = HOUSING_TYPES[itemOption.value].min;
};

var onHousingTypeChange = function () {
  housingTypeElement.addEventListener('change', function () {
    minimumPrice();
  });
};

var onRoomGuestChange = function () {
  if (guestSelectElement.options.length > 0) {
    [].forEach.call(guestSelectElement.options, function (item) {
      item.selected = (ROOMS_CAPACITY[roomsValue.value][0] === item.value) ? true : false;
      item.hidden = (ROOMS_CAPACITY[roomsValue.value].indexOf(item.value) >= 0) ? false : true;
    });
  }
};

/* var onChekinChange = function () {
  checkoutValue.value = checkinValue.value;
};

var onCheckoutChange = function () {
  checkinValue.value = checkoutValue.value;
};*/

deactivateMode();
