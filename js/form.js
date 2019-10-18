'use strict';

(function () {
  // Константы
  var ImgScale = {
    MIN: 25,
    MAX: 100,
    STEP: 25
  };

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

  var Hashtag = {
    START_POSITION: 0,
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    GAP: 1,
    MAX_COUNT: 5
  };

  var Message = {
    START_POSITION: 'Хэш-теги начинаются с символа #',
    MIN_LENGTH: 'Хеш-теги не могут состоять только из одной решётки',
    MAX_LENGTH: 'Максимальная длина одного хэш-тега - ',
    MAX_LENGTH_ENDING: ' символов, включая решётку',
    NO_REPEAT: 'Один и тот же хэш-тег не может быть использован дважды',
    GAP: 'Хэш-теги разделяются пробелами',
    MAX_COUNT: 'Нельзя указать больше ',
    MAX_COUNT_ENDING: ' хэш-тегов'
  };

  // Элементы DOM
  var imgUploadFormElement = document.querySelector('.img-upload__form');
  var imgUploadInputElement = imgUploadFormElement.querySelector('.img-upload__input');

  var imgUploadOverlayElement = imgUploadFormElement.querySelector('.img-upload__overlay');
  var imgUploadCancelElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');

  var imgUploadPreviewElement = imgUploadOverlayElement.querySelector('.img-upload__preview');
  var scaleControlValueElement = imgUploadOverlayElement.querySelector('.scale__control--value');
  var scaleControlSmallerElement = imgUploadOverlayElement.querySelector('.scale__control--smaller');
  var scaleControlBiggerElement = imgUploadOverlayElement.querySelector('.scale__control--bigger');

  var imgUploadEffectLevelElement = imgUploadOverlayElement.querySelector('.img-upload__effect-level');
  var effectLevelValueElement = imgUploadOverlayElement.querySelector('.effect-level__value');
  var effectLevelPinElement = imgUploadEffectLevelElement.querySelector('.effect-level__pin');
  var effectLevelDepthElement = imgUploadEffectLevelElement.querySelector('.effect-level__depth');
  var effectsListElement = imgUploadOverlayElement.querySelector('.effects__list');

  var textHashtagsElement = imgUploadOverlayElement.querySelector('.text__hashtags');
  var imgUploadSubmitElement = imgUploadOverlayElement.querySelector('.img-upload__submit');

  // Открытие формы редактирования изображения
  var openImgUploadOverlay = function () {
    imgUploadOverlayElement.classList.remove('hidden');
    imgUploadCancelElement.addEventListener('click', closeImgUploadOverlay);
    document.addEventListener('keydown', function (evt) {
      window.util.onOverlayEscPress(evt, closeImgUploadOverlay);
    });
    dropEffect();
  };

  // Закрытие формы редактирования изображения
  var closeImgUploadOverlay = function () {
    imgUploadOverlayElement.classList.add('hidden');
    imgUploadCancelElement.removeEventListener('click', closeImgUploadOverlay);
    document.removeEventListener('keydown', function (evt) {
      window.util.onOverlayEscPress(evt, closeImgUploadOverlay);
    });
    imgUploadFormElement.reset();
  };

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

  // Валидация хэш-тега
  var validateHashtag = function (hashtag) {
    if (hashtag[Hashtag.START_POSITION] !== '#') {
      textHashtagsElement.setCustomValidity(Message.START_POSITION);
      return false;
    } else if (hashtag.length < Hashtag.MIN_LENGTH) {
      textHashtagsElement.setCustomValidity(Message.MIN_LENGTH);
      return false;
    } else if (hashtag.length > Hashtag.MAX_LENGTH) {
      textHashtagsElement.setCustomValidity(Message.MAX_LENGTH + Hashtag.MAX_LENGTH + Message.MAX_LENGTH_ENDING);
      return false;
    } else if (hashtag.indexOf('#', Hashtag.GAP) > 0) {
      textHashtagsElement.setCustomValidity(Message.GAP);
      return false;
    }
    return true;
  };

  // Публикация изображения по клику с валидацией хэш-тегов
  var onSubmitClick = function (evt) {
    if (textHashtagsElement.value !== '') {
      var hashtags = textHashtagsElement.value.toLowerCase().split(' ');

      for (var i = 0; i < hashtags.length; i++) {
        var isValid = validateHashtag(hashtags[i]);

        if (!isValid) {
          break;
        }
        var nextHashtagSymbol = i + 1;

        if (hashtags.indexOf(hashtags[i], nextHashtagSymbol) > 0) {
          textHashtagsElement.setCustomValidity(Message.NO_REPEAT);
          break;
        }
      }

      if (hashtags.length > Hashtag.MAX_COUNT) {
        textHashtagsElement.setCustomValidity(Message.MAX_COUNT + Hashtag.MAX_COUNT + Message.MAX_COUNT_ENDING);
      }
    }

    if (!textHashtagsElement.validationMessage) {
      evt.preventDefault();
    }
  };

  // Валидация хэш-тегов при их вводе
  var onHashtagsInput = function () {
    textHashtagsElement.setCustomValidity('');
  };

  // Обработчики событий DOM
  imgUploadInputElement.addEventListener('change', openImgUploadOverlay);

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

  effectLevelPinElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var currentEffect = document.querySelector('input[type="radio"]:checked').value;
    var start = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var translation = start - moveEvt.clientX;
      var position = effectLevelPinElement.offsetLeft - translation;
      start = moveEvt.clientX;

      if (position <= PinPosition.MIN) {
        position = PinPosition.MIN;
      }

      if (position > PinPosition.MAX) {
        position = PinPosition.MAX;
      }

      setPinPosition(position);
      setEffectLevel(
          Effect[currentEffect].minValue,
          Effect[currentEffect].maxValue,
          Effect[currentEffect].cssFilter,
          Effect[currentEffect].measureUnit,
          position);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  effectsListElement.addEventListener('click', function (evt) {
    var currentEffect = evt.target.closest('input');

    if (currentEffect) {
      dropEffect();
      imgUploadPreviewElement.classList.add(Effect[currentEffect.value.toUpperCase()].htmlClass);
      hideEffectLevelElement(currentEffect);
    }
  });

  imgUploadSubmitElement.addEventListener('click', onSubmitClick);

  textHashtagsElement.addEventListener('input', onHashtagsInput);
  textHashtagsElement.addEventListener('keydown', window.util.disableEscPress);
})();
