'use strict';

(function () {
  var updateAddressCoordinates = function (top, left) {
    if (left === window.data.COORDINATE_LIMITER.minX) {
      left = window.data.MAIN_PIN.width / 2;
    }
    var setAdress = function (address) {
      var adressInputElement = document.querySelector('#address');
      adressInputElement.value = address;
    };

    setAdress(Math.floor(left) + ', ' + Math.floor(top));
  };

  var mainPinMouseMovesHandler = function (evt) {
    evt.preventDefault();
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newTopCoordinate = window.data.mapPinMainElement.offsetTop - shift.y;

      if (newTopCoordinate < window.data.COORDINATE_LIMITER.minY) {
        newTopCoordinate = window.data.COORDINATE_LIMITER.minY;
      } else if (newTopCoordinate > window.data.COORDINATE_LIMITER.maxY) {
        newTopCoordinate = window.data.COORDINATE_LIMITER.maxY;
      }

      var newLeftCoordinate = window.data.mapPinMainElement.offsetLeft - shift.x;

      if (newLeftCoordinate < window.data.COORDINATE_LIMITER.minX) {
        newLeftCoordinate = window.data.COORDINATE_LIMITER.minX;
      } else if (newLeftCoordinate > (window.data.COORDINATE_LIMITER.maxX - window.data.MAIN_PIN.width)) {
        newLeftCoordinate = window.data.COORDINATE_LIMITER.maxX - window.data.MAIN_PIN.width;
      }

      window.adForm.setAdress(true, {
        top: newTopCoordinate,
        left: newLeftCoordinate
      });
    };

    var mouseUpHandler = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mainPinAddDragEvent = function () {
    window.data.mapPinMainElement.addEventListener('mousedown', mainPinMouseMovesHandler);
  };

  var mainPinRemoveDragEvent = function () {
    window.data.mapPinMainElement.removeEventListener('mousedown', mainPinMouseMovesHandler);
  };

  window.dragNDrop = {
    mainPinAddDragEvent: mainPinAddDragEvent,
    mainPinRemoveDragEvent: mainPinRemoveDragEvent
  };
})();
