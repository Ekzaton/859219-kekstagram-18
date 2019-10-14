'use strict';

// Константы
var COMMENT = {
  messages: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  names: [
    'Имечко Фамилия',
    'Пётр Николаевич',
    'Васисуалий Лоханкин',
    'Дмитрий Иванов',
    'Максим Смирнов',
    'Доктор Кто']
};
var NUMBER_OF_PICTURES = 25;

var ESC_KEYCODE = 27;

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
  none: {
    htmlClass: 'effects__preview--none'
  },
  chrome: {
    htmlClass: 'effects__preview--chrome',
    cssFilter: 'grayscale',
    minValue: 0,
    maxValue: 1
  },
  sepia: {
    htmlClass: 'effects__preview--sepia',
    cssFilter: 'sepia',
    minValue: 0,
    maxValue: 1
  },
  marvin: {
    htmlClass: 'effects__preview--marvin',
    cssFilter: 'invert',
    minValue: 0,
    maxValue: 100,
    measureUnit: '%'
  },
  phobos: {
    htmlClass: 'effects__preview--phobos',
    cssFilter: 'blur',
    minValue: 0,
    maxValue: 3,
    measureUnit: 'px'
  },
  heat: {
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

// Переменные для DOM
var picturesListElement = document.querySelector('.pictures');
var picturesItemElement = document.querySelector('#picture').content.querySelector('.picture');

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

// Генерация случайного числа из интервала
var getRandomNumber = function (minNumber, maxNumber) {
  var randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

  return randomNumber;
};

// Генерация индекса случайного элемента массива
var getRandomIndex = function (array) {
  var randomIndex = array[Math.floor((Math.random() * array.length - 1))];

  return randomIndex;
};

// Генерация комментариев пользователей
var getUserComments = function (numberOfComments) {
  var comments = [];

  for (var i = 0; i < numberOfComments; i++) {
    var avatar = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
    var message = getRandomIndex(COMMENT.messages);
    var name = getRandomIndex(COMMENT.names);

    var newComment = {
      avatar: avatar,
      message: message,
      name: name
    };

    comments.push(newComment);
  }

  return comments;
};

// Генерация данных для фотографий
var getPictureData = function (numberOfPictures) {
  var pictureData = [];

  for (var i = 0; i < numberOfPictures; i++) {
    var url = 'photos/' + (i + 1) + '.jpg';
    var likes = getRandomNumber(15, 200);
    var comments = getUserComments(getRandomNumber(1, 5));

    var newPicture = {
      url: url,
      likes: likes,
      comments: comments
    };

    pictureData.push(newPicture);
  }

  return pictureData;
};

// Создание фотографии
var createPicturesItem = function (picture) {
  var picturesItem = picturesItemElement.cloneNode(true);

  picturesItem.querySelector('.picture__img').src = picture.url;
  picturesItem.querySelector('.picture__likes').textContent = picture.likes;
  picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

  return picturesItem;
};

// Создание списка фотографий
var createPicturesList = function (pictureData) {
  var picturesList = document.createDocumentFragment();

  for (var i = 0; i < pictureData.length; i++) {
    picturesList.appendChild(createPicturesItem(pictureData[i]));
  }

  return picturesList;
};

// Отрисовка списка фотографий
var renderPictures = function (numberOfPictures) {
  picturesListElement.appendChild(createPicturesList(getPictureData(numberOfPictures)));
};

// Открытие формы редактирования изображения
var openImgUploadOverlay = function () {
  imgUploadOverlayElement.classList.remove('hidden');
  imgUploadCancelElement.addEventListener('click', closeImgUploadOverlay);
  document.addEventListener('keydown', onOverlayEscPress);
  dropEffect();
};

// Закрытие формы редактирования изображения
var closeImgUploadOverlay = function () {
  imgUploadOverlayElement.classList.add('hidden');
  imgUploadCancelElement.removeEventListener('click', closeImgUploadOverlay);
  document.removeEventListener('keydown', onOverlayEscPress);
  imgUploadFormElement.reset();
};

// Закрытие формы редактирования изображения по ESC
var onOverlayEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeImgUploadOverlay();
  }
};

// Запрет закрытия формы по ESC
var disableEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
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
        Effect[currentEffect].maxValue,
        Effect[currentEffect].minValue,
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
    imgUploadPreviewElement.classList.add(Effect[currentEffect.value].htmlClass);
    hideEffectLevelElement(currentEffect);
  }
});

imgUploadSubmitElement.addEventListener('click', onSubmitClick);

textHashtagsElement.addEventListener('input', onHashtagsInput);
textHashtagsElement.addEventListener('keydown', disableEscPress);

// Старт программы
renderPictures(NUMBER_OF_PICTURES);
