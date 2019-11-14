'use strict';

(function () {
  // Элементы DOM
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadInputElement = document.querySelector('.img-upload__input');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var textDescriptionElement = document.querySelector('.text__description');
  var imgUploadSubmitElement = document.querySelector('.img-upload__submit');
  var imgUploadCancelElement = document.querySelector('.img-upload__cancel');

  // Открытие формы
  var onImgUploadInputClick = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    window.effects.drop();
    window.scale.drop();

    imgUploadCancelElement.addEventListener('click', onImgUploadCancelClick);
    document.addEventListener('keydown', onEscPress);
  };

  // Закрытие формы по клику
  var onImgUploadCancelClick = function () {
    imgUploadOverlayElement.classList.add('hidden');
    imgUploadFormElement.reset();

    imgUploadCancelElement.removeEventListener('click', onImgUploadCancelClick);
    document.removeEventListener('keydown', onEscPress);
  };

  // Закрытие формы по ESC
  var onEscPress = function (evt) {
    window.util.onEscPress(evt, onImgUploadCancelClick);
  };

  // Отправка формы
  var onImgUploadSubmitClick = function (evt) {
    if (textHashtagsElement.validity.valid) {
      evt.preventDefault();
      window.backend.save(new FormData(imgUploadFormElement), onSaveSuccess, onSaveError);
      imgUploadOverlayElement.classList.add('hidden');

      imgUploadCancelElement.removeEventListener('click', onImgUploadCancelClick);
      document.removeEventListener('keydown', onEscPress);
    }
  };

  // Успешная отправка формы
  var onSaveSuccess = function () {
    imgUploadFormElement.reset();
    window.messages.showSuccess();
  };

  // Ошибка отправки формы
  var onSaveError = function () {
    window.messages.showError();
  };

  // Регистрация обработчиков событий DOM
  imgUploadInputElement.addEventListener('change', onImgUploadInputClick);
  textHashtagsElement.addEventListener('keydown', window.util.disableEscPress);
  textDescriptionElement.addEventListener('keydown', window.util.disableEscPress);
  imgUploadSubmitElement.addEventListener('click', onImgUploadSubmitClick);
})();
