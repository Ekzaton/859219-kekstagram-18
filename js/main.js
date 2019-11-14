'use strict';

(function () {
  // Успешная загрузка данных
  var onLoadSuccess = function (data) {
    var pictureData = data;
    window.gallery.createList(pictureData);
    window.filters.set(pictureData);
  };

  // Ошибка загрузки данных
  var onLoadError = function (errorMessage) {
    window.messages.showLoadError(errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);
})();
