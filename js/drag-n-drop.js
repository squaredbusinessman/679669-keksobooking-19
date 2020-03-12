'use strict';

(function () {
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

      window.data.mapPinMainElement.style.top = newTopCoordinate + 'px';
      window.data.mapPinMainElement.style.left = newLeftCoordinate + 'px';
      window.adForm.setAddress(true, {
        top: newTopCoordinate - Math.round(window.data.mapPinMainElement.clientHeight / 2 + window.data.PIN.paddingTop),
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

  window.dragNDrop = {
    add: mainPinAddDragEvent
  };
})();
