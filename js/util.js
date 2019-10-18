'use strict';

(function () {
  // Константы
  var ESC_KEYCODE = 27;

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

  // Закрытие формы редактирования изображения по ESC
  var onOverlayEscPress = function (evt, action) {
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
    getRandomNumber: getRandomNumber,
    getRandomIndex: getRandomIndex,
    onOverlayEscPress: onOverlayEscPress,
    disableEscPress: disableEscPress
  };
})();
