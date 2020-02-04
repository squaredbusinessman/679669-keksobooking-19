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
  esc: 27,
  enter: 13,
  leftclick: 0
};
var HOUSING_TYPES = {
  flat: {ru: 'Квартира'},
  bungalow: {ru: 'Бунгало'},
  house: {ru: 'Дом'},
  palace: {ru: 'Дворец'}
};
var ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
};

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

// Неактивное состояние
/* Неактивное состояние. При первом открытии, страница находится в неактивном состоянии:
  блок с картой находится в неактивном состоянии, форма подачи заявления заблокирована.
  Блок с картой .map содержит класс map--faded;
Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
Все <input> и <select> формы .ad-form заблокированы с помощью атрибута disabled,
  добавленного на них или на их родительские блоки fieldset;
Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form;
Единственное доступное действие в неактивном состоянии — перемещение метки .map__pin--main,
  являющейся контролом указания адреса объявления.
  Первое взаимодействие с меткой (mousedown) переводит страницу в активное состояние.*/
/* var nonActiveState = function () {
  var mapSection = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelector('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var mapFiltersSelect = mapFilters.querySelectorAll('select');
  var mapFiltersFieldset = mapFilters.querySelectorAll('fieldset');

  var toggleDisable = function () {
    adFormFieldset.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
    mapFiltersFieldset.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
    mapFiltersSelect.forEach(function (select) {
      select.disabled = !select.disabled;
    });
  };

  if (mapSection.classList.contains('map--faded')) {
    toggleDisable();
  }
};

nonActiveState();*/

// Функция создания массива из 8 сгенерированных объектов
var createNotices = function () {
  // Массив с похожими объявами
  var similarAds = [];
  // Ограничение размеров размерами блока
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

// Убрать класс map--faded  у блока map
var showMapActive = function () {
  document.querySelector('.map').classList.remove('map--faded');
};

// Создаём DOM-элементы соответствуюшие меткам на карте
var renderPin = function (noticeData) {
  // Шаблон #pin
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
  // Отрисуем сгенерированные DOM-элементы в блок .map__pins
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

showMapActive();
// renderPins();
// insertCard();

// ---------------------------- module4-task2


document.querySelector('.map').classList.add('map--faded');

var adForm = document.querySelector('.ad-form');

adForm.classList.add('ad-form--disabled');

var toggleFieldset = function () {
  var fieldsets = adForm.querySelectorAll('fieldset.ad-form__element');

  fieldsets.forEach(function (fieldset) {
    fieldset.disabled = !fieldset.disabled;
  });
};

toggleFieldset();

var mapFiltersForm = document.querySelector('.map__filters');

mapFiltersForm.disabled = true;

var setAddress = function (isActive) {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mainPinDeactiveState = {
    top: parseInt(mapPinMain.style.top, 10) + Math.ceil(mapPinMain.style.height / 2),
    left: parseInt(mapPinMain.style.left, 10) + Math.ceil(mapPinMain.style.width / 2)
  };
  var mainPinActiveState = {
    top: parseInt(mapPinMain.style.top, 10) + Math.ceil(mapPinMain.style.height / 2),
    left: parseInt(mapPinMain.style.left, 10) + PIN.height
  };

  address.value = (isActive) ? mainPinActiveState.left + ', ' + mainPinActiveState.top : mainPinDeactiveState.left + ', ' + mainPinDeactiveState.top;
};

setAddress();

// --------------------------------- Активное состояние -------------------------------------------
var mapPinMain = document.querySelector('.map__pin--main');

var modeActiveOn = function () {
  document.querySelector('.map').classList.remove('map--faded');

  setAddress(true);
  renderPins();

  mapFiltersForm.classList.remove('ad-form--disabled');

  toggleFieldset();

  mapPinMain.removeEventListener('mousedown', modeActiveOn);
  mapPinMain.removeEventListener('keydown', onMainPinKeyDown);
};

var onMainPinMouseDown = function (evt) {
  if (evt.button === KEYCODES.leftclick) {
    modeActiveOn();
  }
};

mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

var onMainPinKeyDown = function (evt) {
  if (evt.key === KEYCODES.enter) {
    modeActiveOn();
  }
};

mapPinMain.addEventListener('keydown', onMainPinKeyDown);

// module4-task2 третья часть задания - "НЕПРОСТАЯ ВАЛИДАЦИЯ"
var address = adForm.querySelector('#address');
var price = adForm.querySelector('#price');
var housingType = adForm.querySelector('#type');
var roomsValue = adForm.querySelector('#room_number');
var guestsValue = adForm.querySelector('#capacity');
var checkinValue = adForm.querySelector('#timein');
var checkoutValue = adForm.querySelector('#timeout');

var minimumPrice = function () {
  var housingTypeOptions = housingType.querySelector('option');
  var activeOption = housingType.options[housingType.selectedIndex];

  minPriceValidation(activeOption, housingTypeOptions);
};

var minPriceValidation = function (itemOption) {
  price.min = HOUSING_TYPES[itemOption.value].min;
  price.placeholder = HOUSING_TYPES[itemOption.value].min;

};

var onHousingTypeChange = function () {
  housingType.addEventListener('change', function () {
    minimumPrice();
  });
};

onHousingTypeChange();

checkinValue.addEventListener('change', onChekinChange);
checkoutValue.addEventListener('change', onCheckoutChange);

var onRoomGuestChange = function () {
  if (guestsValue.options.length > 0) {
    [].forEach.call(guestsValue.options, function (item) {
      item.selected = (ROOMS_CAPACITY[roomsValue.value][0] === item.value) ? true : false;
      item.hidden = (ROOMS_CAPACITY[roomsValue.value].indexOf(item.value) >= 0) ? false : true;
    });
  }
};

onRoomGuestChange();

roomsValue.addEventListener('change', onRoomGuestChange);

var onChekinChange = function () {
  checkoutValue.value = checkinValue.value;
};

var onCheckoutChange = function () {
  checkinValue.value = checkoutValue.value;
};
