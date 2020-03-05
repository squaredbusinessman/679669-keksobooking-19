'use strict';

(function () {
  var SERVER = {
    LOAD_URL: 'https://js.dump.academy/keksobooking/data',
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',
    TIMEOUT: 10000
  };

  var MESSAGES = {
    CONNECTION_FAILED: 'Произошла ошибка соединения! Пожалуйста, проверьте ваше подключение к интернету',
    REQUEST_FAILED: 'Запрос не успел выполниться за ',
    STATUS: 'Статус ответа: ',
    SUCCESS: 'Форма успешно отправлена!',
    MS: 'мс'
  };
  var statusCode = {
    SUCCESS: 200
  };


  // загрузка с сервера
  var load = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = SERVER.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.SUCCESS) {
        successHandler(xhr.response);
      } else {
        errorHandler(MESSAGES.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(MESSAGES.CONNECTION_FAILED);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(MESSAGES.REQUEST_FAILED + xhr.timeout + MESSAGES.MS);
    });

    xhr.open('GET', SERVER.LOAD_URL);
    xhr.send();
  };

  // загрузка НА сервер
  var upload = function (data, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = SERVER.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.SUCCESS) {
        window.messages.successHandler(xhr.response);
        window.messages.successHandler(MESSAGES.SUCCESS);
      } else {
        errorHandler(MESSAGES.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(MESSAGES.CONNECTION_FAILED);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(MESSAGES.REQUEST_FAILED + xhr.timeout + MESSAGES.MS);
    });

    xhr.open('POST', SERVER.UPLOAD_URL);
    xhr.send(data);
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
