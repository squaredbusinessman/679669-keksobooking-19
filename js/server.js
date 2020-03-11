'use strict';

(function () {
  var SERVER = {
    LOAD_URL: 'https://js.dump.academy/keksobooking/data',
    UPLOAD_URL: 'https://js.dump.academy/keksobooking',
    TIMEOUT: 10000
  };

  var statusCode = {
    SUCCESS: 200
  };

  // загрузка с сервера
  var load = function (successHandler, errorHandler) {
    var xhr = createRequest(successHandler, errorHandler, 'GET', SERVER.LOAD_URL);

    xhr.send();
  };

  // загрузка НА сервер
  var upload = function (data, successHandler, errorHandler) {
    var xhr = createRequest(successHandler, errorHandler, 'POST', SERVER.UPLOAD_URL);

    xhr.send(data);
  };

  var createRequest = function (successHandler, errorHandler, method, url) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = SERVER.TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.SUCCESS) {
        successHandler(xhr.response);
      } else {
        errorHandler(window.messages.STATUS + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler(window.messages.CONNECTION_FAILED);
    });

    xhr.addEventListener('timeout', function () {
      errorHandler(window.messages.REQUEST_FAILED + xhr.timeout + window.messages.MS);
    });

    xhr.open(method, url);
    return xhr;
  };

  window.server = {
    load: load,
    upload: upload
  };
})();
