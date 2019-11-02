'use strict';

(function () {
  // Элементы DOM
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadInputElement = document.querySelector('.img-upload__input');
  var imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
  var imgUploadCancelElement = document.querySelector('.img-upload__cancel');

  // Открытие формы редактирования изображения
  var onImgUploadInputClick = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    imgUploadCancelElement.addEventListener('click', onImgUploadCancelClick);
    document.addEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, onImgUploadCancelClick);
    });
    window.effects.dropEffect();
  };

  // Закрытие формы редактирования изображения
  var onImgUploadCancelClick = function () {
    imgUploadOverlayElement.classList.add('hidden');
    imgUploadCancelElement.removeEventListener('click', onImgUploadCancelClick);
    document.removeEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, onImgUploadCancelClick);
    });
    imgUploadFormElement.reset();
  };

  // Обработчики событий DOM
  imgUploadInputElement.addEventListener('change', onImgUploadInputClick);
})();
