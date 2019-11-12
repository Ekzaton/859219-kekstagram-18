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

  // Уменьшить размер изображения, если он не минимальный
  var onScaleControlSmallerClick = function () {
    if (getCurrentImageScale() > ImageScale.MIN) {
      downImageScale();
    }
  };

  // Увеличить размер изображения, если он не максимальный
  var onScaleControlBiggerClick = function () {
    if (getCurrentImageScale() < ImageScale.MAX) {
      upImageScale();
    }
  };

  // Регистрация обработчиков событий DOM
  scaleControlSmallerElement.addEventListener('click', onScaleControlSmallerClick);
  scaleControlBiggerElement.addEventListener('click', onScaleControlBiggerClick);

  // Экспорт
  window.scale = {
    dropImageScale: dropImageScale
  };
})();
