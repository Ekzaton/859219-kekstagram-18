'use strict';

(function () {
  // Элементы DOM
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadInputElement = document.querySelector('.img-upload__input');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectsListElement = document.querySelector('.effects__list');
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var textDescriptionElement = document.querySelector('.text__description');
  var imgUploadSubmitElement = document.querySelector('.img-upload__submit');
  var imgUploadCancelElement = document.querySelector('.img-upload__cancel');

  // Открытие формы
  var onImgUploadInputChange = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    window.upload.picture();
    window.effects.drop();
    window.scale.drop();

    scaleControlSmallerElement.addEventListener('click', window.scale.onSmallerClick);
    scaleControlBiggerElement.addEventListener('click', window.scale.onBiggerClick);
    effectsListElement.addEventListener('click', window.effects.onListClick);
    effectLevelPinElement.addEventListener('mousedown', window.effects.onMouseDown);
    textHashtagsElement.addEventListener('input', window.validation.onHashtagsInput);
    textHashtagsElement.addEventListener('keydown', window.util.disableEscPress);
    textDescriptionElement.addEventListener('keydown', window.util.disableEscPress);
    imgUploadSubmitElement.addEventListener('click', onImgUploadSubmitClick);
    imgUploadCancelElement.addEventListener('click', onImgUploadCancelClick);
    document.addEventListener('keydown', onEscPress);
  };

  // Закрытие формы по клику
  var onImgUploadCancelClick = function () {
    imgUploadOverlayElement.classList.add('hidden');
    imgUploadFormElement.reset();

    removeFormListeners();
  };

  // Закрытие формы по ESC
  var onEscPress = function (evt) {
    window.util.onEscPress(evt, onImgUploadCancelClick);
  };

  // Отправка формы
  var onImgUploadSubmitClick = function (evt) {
    if (textHashtagsElement.validity.valid) {
      evt.preventDefault();
      imgUploadOverlayElement.classList.add('hidden');
      window.backend.save(new FormData(imgUploadFormElement), onSaveSuccess, onSaveError);

      removeFormListeners();
    }
  };

  // Удаление обработчиков формы
  var removeFormListeners = function () {
    scaleControlSmallerElement.removeEventListener('click', window.scale.onSmallerClick);
    scaleControlBiggerElement.removeEventListener('click', window.scale.onBiggerClick);
    effectsListElement.removeEventListener('click', window.effects.onListClick);
    effectLevelPinElement.removeEventListener('mousedown', window.effects.onMouseDown);
    textHashtagsElement.removeEventListener('input', window.validation.onHashtagsInput);
    textHashtagsElement.removeEventListener('keydown', window.util.disableEscPress);
    textDescriptionElement.removeEventListener('keydown', window.util.disableEscPress);
    imgUploadCancelElement.removeEventListener('click', onImgUploadCancelClick);
    imgUploadSubmitElement.removeEventListener('click', onImgUploadSubmitClick);
    document.removeEventListener('keydown', onEscPress);
  };

  // Успешная отправка формы
  var onSaveSuccess = function () {
    window.messages.showSuccess();
    imgUploadFormElement.reset();
  };

  // Ошибка отправки формы
  var onSaveError = function () {
    window.messages.showError();
  };

  imgUploadInputElement.addEventListener('change', onImgUploadInputChange);
})();
