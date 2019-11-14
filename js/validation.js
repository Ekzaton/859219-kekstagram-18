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

  // Валидация хэш-тега
  var validateHashtag = function (hashtag) {
    if (hashtag[Hashtag.START_POSITION] !== '#') {
      textHashtagsElement.setCustomValidity(Message.START_POSITION);
      return false;
    }

    if (hashtag.length < Hashtag.MIN_LENGTH) {
      textHashtagsElement.setCustomValidity(Message.MIN_LENGTH);
      return false;
    }

    if (hashtag.length > Hashtag.MAX_LENGTH) {
      textHashtagsElement.setCustomValidity(Message.MAX_LENGTH + Hashtag.MAX_LENGTH + Message.MAX_LENGTH_ENDING);
      return false;
    }

    if (hashtag.indexOf('#', Hashtag.GAP) > 0) {
      textHashtagsElement.setCustomValidity(Message.GAP);
      return false;
    }

    return true;
  };

  // Валидация хэш-тегов при их вводе
  var onHashtagsInput = function () {
    textHashtagsElement.setCustomValidity('');

    if (textHashtagsElement.value !== '') {
      var hashtags = textHashtagsElement.value.toLowerCase().split(' ');

      hashtags.forEach(function (hashtag, index) {
        validateHashtag(hashtag);

        var nextHashtagSymbol = index + 1;
        if (hashtags.indexOf(hashtag, nextHashtagSymbol) > 0) {
          textHashtagsElement.setCustomValidity(Message.NO_REPEAT);
        }
      });

      if (hashtags.length > Hashtag.MAX_COUNT) {
        textHashtagsElement.setCustomValidity(Message.MAX_COUNT + Hashtag.MAX_COUNT + Message.MAX_COUNT_ENDING);
      }

      if (textHashtagsElement.validity.valid) {
        textHashtagsElement.removeAttribute('style');
      } else {
        textHashtagsElement.style.border = '3px solid red';
      }
    }
  };

  // Экспорт
  window.validation = {
    onHashtagsInput: onHashtagsInput
  };
})();
