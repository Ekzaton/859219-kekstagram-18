'use strict';

(function () {
  // Константы
  var ImgScale = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

  // Элементы DOM
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
  var scaleControlValueElement = document.querySelector('.scale__control--value');
  var scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = document.querySelector('.scale__control--bigger');

  // Получение текущего размера изображения
  var getCurrentImgScale = function () {
    return Number(scaleControlValueElement.value.slice(0, -1));
  };

  // Изменение размера изображения
  var changeImgScale = function (newScaleValue) {
    scaleControlValueElement.value = newScaleValue + '%';
    imgUploadPreviewElement.style = 'transform: scale(' + (newScaleValue / 100) + ')';
  };

  // Уменьшение размера изображения
  var downImgScale = function () {
    var newScaleValue = getCurrentImgScale() - ImgScale.STEP;
    changeImgScale(newScaleValue);
  };

  // Увеличение размера изображения
  var upImgScale = function () {
    var newScaleValue = getCurrentImgScale() + ImgScale.STEP;
    changeImgScale(newScaleValue);
  };

  // Сброс размера изображения
  var dropScale = function () {
    changeImgScale(ImgScale.MAX);
  };

  // Обработчики событий DOM
  scaleControlSmallerElement.addEventListener('click', function () {
    if (getCurrentImgScale() > ImgScale.MIN) {
      downImgScale();
    }
  });

  scaleControlBiggerElement.addEventListener('click', function () {
    if (getCurrentImgScale() < ImgScale.MAX) {
      upImgScale();
    }
  });

  // Экспорт
  window.scale = {
    dropScale: dropScale
  };
})();
