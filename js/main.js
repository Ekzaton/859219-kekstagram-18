'use strict';

(function () {
  // Успешная загрузка данных
  var onLoadSuccess = function (data) {
    var pictureData = data;
    window.gallery.createPicturesList(pictureData);
    window.filters.setFilter(pictureData);
  };

  // Ошибка загрузки данных
  var onLoadError = function (errorMessage) {
    window.messages.showLoadErrorMessage(errorMessage);
  };

  window.backend.load(onLoadSuccess, onLoadError);
})();
