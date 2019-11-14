'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;
  var DEBOUNCE_INTERVAL = 500;

  // Закрытие формы редактирования изображения по ESC
  var onEscPress = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  // Запрет закрытия формы по ESC
  var disableEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  };

  // Перемешивание массива
  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[j];
      array[j] = array[i];
      array[i] = temp;
    }
    return array;
  };

  // Устранение дребезга
  var debounce = function (cb, interval) {
    interval = typeof interval !== 'undefined' ? interval : DEBOUNCE_INTERVAL;
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  // Экспорт
  window.util = {
    onEscPress: onEscPress,
    disableEscPress: disableEscPress,
    shuffleArray: shuffleArray,
    debounce: debounce
  };
})();
