'use strict';

(function () {
  // Константы
  var ImageScale = {
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
  var getCurrentImageScale = function () {
    return Number(scaleControlValueElement.value.slice(0, -1));
  };

  // Изменение размера изображения
  var changeImageScale = function (newScaleValue) {
    scaleControlValueElement.value = newScaleValue + '%';
    imgUploadPreviewElement.style = 'transform: scale(' + (newScaleValue / 100) + ')';
    window.effects.dropEffect();
  };

  // Уменьшение размера изображения
  var downImageScale = function () {
    var newScaleValue = getCurrentImageScale() - ImageScale.STEP;
    changeImageScale(newScaleValue);
  };

  // Увеличение размера изображения
  var upImageScale = function () {
    var newScaleValue = getCurrentImageScale() + ImageScale.STEP;
    changeImageScale(newScaleValue);
  };

  // Сброс размера изображения
  var dropImageScale = function () {
    changeImageScale(ImageScale.MAX);
  };

  // Обработчики событий DOM
  scaleControlSmallerElement.addEventListener('click', function () {
    if (getCurrentImageScale() > ImageScale.MIN) {
      downImageScale();
    }
  });

  scaleControlBiggerElement.addEventListener('click', function () {
    if (getCurrentImageScale() < ImageScale.MAX) {
      upImageScale();
    }
  });

  // Экспорт
  window.scale = {
    dropImageScale: dropImageScale
  };
})();
