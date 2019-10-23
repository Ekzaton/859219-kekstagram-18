'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;

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

  // Экспорт
  window.util = {
    onEscPress: onEscPress,
    disableEscPress: disableEscPress
  };
})();
