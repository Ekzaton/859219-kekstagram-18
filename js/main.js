'use strict';

(function () {
  // Успешная загрузка
  var onLoadSuccess = function (data) {
    var pictureData = data;
    window.gallery.createPicturesList(pictureData);
    window.filters.setFilter(pictureData);
  };

  // Ошибка загрузки
  var onLoadError = function (errorMessage) {
    window.messages.showLoadErrorMessage(errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);
})();
