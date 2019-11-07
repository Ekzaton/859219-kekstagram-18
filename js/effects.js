'use strict';

(function () {
  // Константы
  var PinPosition = {
    MIN: 0,
    MAX: 453
  };

  var Effect = {
    NONE: {
      htmlClass: 'effects__preview--none'
    },
    CHROME: {
      htmlClass: 'effects__preview--chrome',
      cssFilter: 'grayscale',
      minValue: 0,
      maxValue: 1
    },
    SEPIA: {
      htmlClass: 'effects__preview--sepia',
      cssFilter: 'sepia',
      minValue: 0,
      maxValue: 1
    },
    MARVIN: {
      htmlClass: 'effects__preview--marvin',
      cssFilter: 'invert',
      minValue: 0,
      maxValue: 100,
      measureUnit: '%'
    },
    PHOBOS: {
      htmlClass: 'effects__preview--phobos',
      cssFilter: 'blur',
      minValue: 0,
      maxValue: 3,
      measureUnit: 'px'
    },
    HEAT: {
      htmlClass: 'effects__preview--heat',
      cssFilter: 'brightness',
      minValue: 1,
      maxValue: 3
    }
  };

  // Глобальные переменные
  var start;

  // Элементы DOM
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview');
  var imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
  var effectLevelValueElement = document.querySelector('.effect-level__value');
  var effectLevelPinElement = document.querySelector('.effect-level__pin');
  var effectLevelDepthElement = document.querySelector('.effect-level__depth');
  var effectsListElement = document.querySelector('.effects__list');

  // Установка положения ползунка
  var setPinPosition = function (pinPosition) {
    effectLevelPinElement.style.left = pinPosition + 'px';
    effectLevelDepthElement.style.width = pinPosition + 'px';
  };

  // Установка глубины эффекта
  var setEffectLevel = function (maxValue, minValue, cssFilter, measureUnit, pinPosition) {
    var unit = measureUnit || '';
    var value = (maxValue - minValue) * (pinPosition / PinPosition.MAX) + minValue;
    var effectLevel = cssFilter + '(' + value + unit + ')';

    imgUploadPreviewElement.style.filter = effectLevel;
    effectLevelValueElement.value = value;
  };

  // Сброс эффекта
  var dropEffect = function () {
    setPinPosition(PinPosition.MAX);
    imgUploadPreviewElement.style.removeProperty('filter');
    imgUploadPreviewElement.classList = 'img-upload__preview';
    imgUploadEffectLevelElement.classList.add('hidden');
  };

  // Скрытие ползунка для оригинала изображения
  var hideEffectLevelElement = function (currentEffect) {
    if (currentEffect.value === 'none') {
      imgUploadEffectLevelElement.classList.add('hidden');
    } else {
      imgUploadEffectLevelElement.classList.remove('hidden');
    }
  };

  // Выбор эффекта
  var onEffectsListClick = function (evt) {
    var currentEffect = evt.target.closest('input');

    if (currentEffect) {
      dropEffect();
      imgUploadPreviewElement.classList.add(
          Effect[currentEffect.value.toUpperCase()].htmlClass
      );
      hideEffectLevelElement(currentEffect);
    }
  };

  // Нажатие мыши
  var onMouseDown = function (evt) {
    evt.preventDefault();

    start = evt.clientX;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Движение мыши
  var onMouseMove = function (evt) {
    evt.preventDefault();

    var currentEffect = document.querySelector('input[type="radio"]:checked');
    var translation = start - evt.clientX;
    var position = effectLevelPinElement.offsetLeft - translation;
    start = evt.clientX;

    if (position <= PinPosition.MIN) {
      position = PinPosition.MIN;
    }

    if (position > PinPosition.MAX) {
      position = PinPosition.MAX;
    }

    setPinPosition(position);
    setEffectLevel(
        Effect[currentEffect.value.toUpperCase()].maxValue,
        Effect[currentEffect.value.toUpperCase()].minValue,
        Effect[currentEffect.value.toUpperCase()].cssFilter,
        Effect[currentEffect.value.toUpperCase()].measureUnit,
        position);
  };

  // Отпускание мыши
  var onMouseUp = function (evt) {
    evt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  // Обработчики событий DOM
  effectsListElement.addEventListener('click', function (evt) {
    onEffectsListClick(evt)
  });

  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    onMouseDown(evt);
  });

  // Экспорт
  window.effects = {
    dropEffect: dropEffect
  };
})();
