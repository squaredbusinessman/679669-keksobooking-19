'use strict';

(function () {
  var mainElement = document.querySelector('main');
  var errorElement;
  var successElement;

  // функция-обработчик сообщения об ошибке
  var showError = function (errorMessage) {
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
  var showSuccess = function (successMessage) {
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

  window.messages = {
    showError: showError,
    showSuccess: showSuccess,
    CONNECTION_FAILED: 'Произошла ошибка соединения! Пожалуйста, проверьте ваше подключение к интернету',
    REQUEST_FAILED: 'Запрос не успел выполниться за ',
    STATUS: 'Статус ответа: ',
    SUCCESS: 'Форма успешно отправлена!',
    ERROR: 'Извините, форма не может быть отправлена, проверьте правильность введённых данных.',
    MS: 'мс'
  };
})();
