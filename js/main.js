'use strict';

(function () {
  // Элементы DOM
  var errorElement = document.querySelector('#error').content.querySelector('.error');

  // Успешная загрузка
  var onLoadSuccess = function (data) {
    var pictureData = data;
    window.gallery.createPicturesList(pictureData);
    window.filters.setFilter(pictureData);
  };

  // Ошибка загрузки
  var onError = function (errorMessage) {
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.backend.load(onLoadSuccess, onError);
})();
