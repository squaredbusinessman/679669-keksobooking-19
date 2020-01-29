'use strict';

var AD_MOCKS = {
  userPicNum: ['1', '2', '3', '4', '5', '6', '7', '8'],
  departureTime: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  adTitle: ['Уютная комнатка в общежитии', 'Коробка из под холодильника', 'Бунгало на пляже', 'Пентхаус в небоскрёбе', 'Собачья будка', 'Подвальное помещение', 'Койка в доме престарелых', '2-х ярусная яхта'],
  adPhoto: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
  homeType: ['palace', 'flat', 'house', 'bungalo']
};
var SIMILAR_AD_VALUE = 8;
var PIN = {
  height: 156,
  width: 78
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

showMapActive();

renderPins();
