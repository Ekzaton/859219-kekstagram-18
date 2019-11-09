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
    window.effects.dropEffect();
    window.scale.dropImgScale();

    imgUploadCancelElement.addEventListener('click', onImgUploadCancelClick);
    document.addEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, onImgUploadCancelClick);
    });
  };

  // Закрытие формы
  var onImgUploadCancelClick = function () {
    imgUploadOverlayElement.classList.add('hidden');
    imgUploadFormElement.reset();

    imgUploadCancelElement.removeEventListener('click', onImgUploadCancelClick);
    document.removeEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, onImgUploadCancelClick);
    });
  };

  // Отправка формы
  var onImgUploadSubmitClick = function (evt) {
    if (textHashtagsElement.validity.valid) {
      evt.preventDefault();
      window.backend.save(new FormData(imgUploadFormElement), onSaveSuccess, onSaveError);
      onImgUploadCancelClick();
    }
  };

  // Успешная отправка
  var onSaveSuccess = function () {
    window.messages.showSuccessMessage();
  };

  // Ошибка отправки
  var onSaveError = function () {
    window.messages.showErrorMessage();
  };

  // Обработчики событий DOM
  imgUploadInputElement.addEventListener('change', onImgUploadInputClick);
  textHashtagsElement.addEventListener('keydown', window.util.disableEscPress);
  textDescriptionElement.addEventListener('keydown', window.util.disableEscPress);
  imgUploadSubmitElement.addEventListener('click', onImgUploadSubmitClick);
})();
