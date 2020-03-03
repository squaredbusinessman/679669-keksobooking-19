'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorElement;
  var successElement;
  var messages = {
    CONNECTION_FAILED: 'Произошла ошибка соединения! Пожалуйста, проверьте ваше подключение к интернету',
    REQUEST_FAILED: 'Запрос не успел выполниться за ',
    STATUS: 'Статус ответа: ',
    SUCCESS: 'Форма успешно отправлена!',
    MS: 'мс'
  };
  var statusCode = {
    SUCCESS: 200
  };


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

  // загрузка с сервера
  var load = function (url, successHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    console.log(xhr.responseText);

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.SUCCESS) {
        successHandler(xhr.response);
      } else {
        errorHandler('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(messages.CONNECTION_FAILED);
    });

    xhr.timeout = window.data.SERVER.TIMEOUT;

    xhr.addEventListener('timeout', function () {
      errorHandler(messages.REQUEST_FAILED + xhr.timeout + messages.MS);
    });

    xhr.open('GET', url);
    xhr.send();
  };

  // загрузка НА сервер
  var upload = function (url, data, successHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.SUCCESS) {
        successHandler(xhr.response);
        successHandler(messages.SUCCESS);
      } else {
        errorHandler(messages.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(messages.CONNECTION_FAILED);
    });

    xhr.timeout = window.data.SERVER.TIMEOUT;

    xhr.addEventListener('timeout', function () {
      errorHandler(messages.REQUEST_FAILED + xhr.timeout + messages.MS);
    });

    xhr.open('POST', url);
    xhr.send(data);
  };

  window.server = {
    errorHandler: errorHandler,
    successHandler: successHandler,
    load: load,
    upload: upload
  };
})();
