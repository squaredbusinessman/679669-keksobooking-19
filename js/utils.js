'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

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

  // функция создания элемента
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

  // функция удаления ребёнка
  var deleteChildren = function (element) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }
  };

  // дизейблим элементы на странице
  var toggleDisableAttribute = function (elements) {
    elements.forEach(function (element) {
      element.disabled = !element.disabled;
    });
  };

  // дебаунс
  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var isUndefined = function (element) {
    return typeof element === 'undefined';
  };

  window.utils = {
    debounce: debounce,
    getRandomInt: getRandomInt,
    getRandomProp: getRandomProp,
    shuffleArr: shuffleArr,
    createElement: createElement,
    deleteChildren: deleteChildren,
    toggleDisableAttribute: toggleDisableAttribute,
    isUndefined: isUndefined,
  };
})();
