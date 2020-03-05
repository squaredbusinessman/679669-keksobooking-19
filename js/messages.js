'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorElement;
  var successElement;

  // функция-обработчик сообщения об ошибке
  var errorHandler = function (errorMessage) {
    var errorTemplateElement = document.querySelector('#error').content.querySelector('div.error');
    errorElement = errorTemplateElement.cloneNode(true);
    var errorMessageElement = errorElement.querySelector('.error__message');
    var errorButtonElement = errorElement.querySelector('.error__button');
    errorMessageElement.innerText = errorMessage;

    mainElement.insertBefore(errorElement, mainElement.firstChild);
    document.addEventListener('keydown', popupCloseEscKeydownHandler);
    errorButtonElement.addEventListener('click', popupCloseLeftMouseClickHandler);
    errorElement.addEventListener('click', popupCloseLeftMouseClickHandler);

    window.map.deactivateMode();
  };

  // функция-обработчик сообщения об успехе операции
  var successHandler = function (successMessage) {
    var successTemplateElement = document.querySelector('#success').content.querySelector('div.success');
    successElement = successTemplateElement.cloneNode(true);
    var successMessageElement = successElement.querySelector('.success__message');
    successMessageElement.innerText = successMessage;

    mainElement.insertBefore(successElement, mainElement.firstChild);
    document.addEventListener('keydown', popupCloseEscKeydownHandler);
    successElement.addEventListener('click', popupCloseLeftMouseClickHandler);
    window.adForm.resetFormHandler();
    window.pin.removeCards();
    window.pin.removePins();
  };

  // обработчики закрытия ошибок
  var popupCloseEscKeydownHandler = function (evt) {
    if (evt.key === window.data.KEYCODES.esc) {
      if (!window.utils.isUndefined(errorElement)) {
        errorElement.removeEventListener('keydown', popupCloseEscKeydownHandler);
        errorElement.remove();
      } else if (!window.utils.isUndefined(successElement)) {
        successElement.removeEventListener('keydown', popupCloseEscKeydownHandler);
        successElement.remove();
      }
    }
  };

  var popupCloseLeftMouseClickHandler = function () {
    if (!window.utils.isUndefined(errorElement)) {
      errorElement.removeEventListener('click', popupCloseLeftMouseClickHandler);
      errorElement.remove();
    } else if (!window.utils.isUndefined(successElement)) {
      successElement.removeEventListener('click', popupCloseLeftMouseClickHandler);
      successElement.remove();
    }
  };

  window.messages = {
    errorHandler: errorHandler,
    successHandler: successHandler
  };
})();
