'use strict';

(function () {
  // Константы
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
  var textHashtagsElement = document.querySelector('.text__hashtags');
  var textDescriptionElement = document.querySelector('.text__description');
  var imgUploadSubmitElement = document.querySelector('.img-upload__submit');

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
  var onSubmitClick = function () {
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
  };

  // Валидация хэш-тегов при их вводе
  var onHashtagsInput = function () {
    textHashtagsElement.setCustomValidity('');
  };

  // Обработчики событий DOM
  imgUploadSubmitElement.addEventListener('click', onSubmitClick);
  textHashtagsElement.addEventListener('input', onHashtagsInput);
  textHashtagsElement.addEventListener('keydown', window.util.disableEscPress);
  textDescriptionElement.addEventListener('keydown', window.util.disableEscPress);
})();
