'use strict';

(function () {
  // Элементы DOM
  var mainElement = document.querySelector('main');

  var successElement = document.querySelector('#success').content.querySelector('.success');
  var successMessageElement = successElement.cloneNode(true);
  var successButtonElement = successMessageElement.querySelector('.success__button');

  var errorElement = document.querySelector('#error').content.querySelector('.error');
  var errorMessageElement = errorElement.cloneNode(true);
  var errorTitleElement = errorMessageElement.querySelector('.error__title');
  var errorButtonsElement = errorMessageElement.querySelector('.error__buttons');

  // Показать окно сообщения об успехе
  var showSuccessMessage = function () {
    mainElement.insertAdjacentElement('afterbegin', successMessageElement);

    successMessageElement.addEventListener('click', onSuccessMessageClick);
    successButtonElement.addEventListener('click', onSuccessButtonClick);
    document.addEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, closeSuccessMessage);
    });
  };

  // Закрыть окно сообщения об успехе
  var closeSuccessMessage = function () {
    successMessageElement.remove();
  };

  // Закрыть окно сообщения об успехе по клику на произвольную область экрана
  var onSuccessMessageClick = function (evt) {
    if (evt.target.className === 'success') {
      closeSuccessMessage();
    }
  };

  // Закрыть окно сообщения об успехе по клику на кнопку
  var onSuccessButtonClick = function (evt) {
    if (evt.target.className === 'success__button') {
      closeSuccessMessage();
    }
  };

  // Показать окно сообщения об ошибке
  var showErrorMessage = function () {
    mainElement.insertAdjacentElement('afterbegin', errorMessageElement);

    errorMessageElement.addEventListener('click', onErrorMessageClick);
    errorButtonsElement.addEventListener('click', onErrorButtonsClick);
    document.addEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, closeErrorMessage);
    });
  };

  // Показать окно сообщения об ошибке загрузки данных с кодом ответа
  var showLoadErrorMessage = function (errorMessage) {
    errorTitleElement.textContent = errorMessage;
    errorButtonsElement.innerHTML = '';
    mainElement.insertAdjacentElement('afterbegin', errorMessageElement);

    errorMessageElement.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, closeErrorMessage);
    });
  };

  // Закрыть окно сообщения об ошибке
  var closeErrorMessage = function () {
    errorMessageElement.remove();
  };

  // Закрыть окно сообщения об ошибке по клику на произвольную область экрана
  var onErrorMessageClick = function (evt) {
    if (evt.target.className === 'error') {
      closeErrorMessage();
    }
  };

  // Закрыть окно сообщения об ошибке по клику на кнопку
  var onErrorButtonsClick = function (evt) {
    if (evt.target.className === 'error__button') {
      closeErrorMessage();
    }
  };

  // Экспорт
  window.messages = {
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage,
    showLoadErrorMessage: showLoadErrorMessage
  };
})();
