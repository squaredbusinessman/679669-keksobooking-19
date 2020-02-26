'use strict';

(function () {
  var mainPinMouseMovesHandler = function (evt) {
    var startCoordinates = {
      x: evt.clientX,
      y: evt.clientY
    };

    var isDragged = false;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();
      isDragged = true;

      var shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY
      };

      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newTopCoordinate;

      if (newTopCoordinate < window.data.COORDINATE_LIMITER.minY) {
        newTopCoordinate = window.data.COORDINATE_LIMITER.minY;
      } else if (newTopCoordinate > window.data.COORDINATE_LIMITER.maxY) {
        newTopCoordinate = window.data.COORDINATE_LIMITER.maxY;
      } else {
        newTopCoordinate = window.data.mapPinMainElement.offsetTop - shift.y;
      }

      var newLeftCoordinate;

      if (newLeftCoordinate < window.data.COORDINATE_LIMITER.minX) {
        newLeftCoordinate = window.data.COORDINATE_LIMITER.minX;
      } else if (newLeftCoordinate > (window.data.COORDINATE_LIMITER.maxX - window.data.MAIN_PIN.width)) {
        newLeftCoordinate = window.data.COORDINATE_LIMITER.maxX - window.data.MAIN_PIN.width;
      } else {
        newLeftCoordinate = window.data.mapPinMainElement.offsetLeft - shift.x;
      }

      window.data.mapPinMainElement.style.top = newTopCoordinate + 'px';
      window.data.mapPinMainElement.style.left = newLeftCoordinate + 'px';
      updateAddressCoordinates(newTopCoordinate, newLeftCoordinate);
    };

    var updateAddressCoordinates = function (top, left) {
      if (left === window.data.COORDINATE_LIMITER.minX) {
        left = window.data.MAIN_PIN.width / 2;
      }
      var newAdress = function (address) {
        var adressInputElement = document.querySelector('#address');
        adressInputElement.value = address;
      };

      newAdress(Math.floor(left) + ', ' + Math.floor(top));
    };

    var mouseUpHandler = function (mouseUpEvt) {
      mouseUpEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);

      if (isDragged) {
        var preventDefaultOnClickHandler = function (isDraggedEvt) {
          isDraggedEvt.preventDefault();
          window.data.mapPinMainElement.removeEventListener('click', preventDefaultOnClickHandler);
        };
        window.data.mapPinMainElement.addEventListener('click', preventDefaultOnClickHandler);
      }

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
