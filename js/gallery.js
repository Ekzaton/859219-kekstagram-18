'use strict';

(function () {
  // Элементы DOM
  var picturesListElement = document.querySelector('.pictures');
  var errorElement = document.querySelector('#error').content.querySelector('.error');

  // Создание списка фотографий
  var createPicturesList = function (pictureData) {
    var picturesList = document.createDocumentFragment();

    for (var i = 0; i < pictureData.length; i++) {
      picturesList.appendChild(window.picture.createPicturesItem(pictureData[i]));
    }

    picturesListElement.appendChild(picturesList);
  };

  // Успешная загрузка
  var onLoadSuccess = function (data) {
    var pictureData = data;
    createPicturesList(pictureData);
    window.filters.setFilter(pictureData);
  };

  // Ошибка загрузки
  var onError = function (errorMessage) {
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  window.backend.load(onLoadSuccess, onError);

  // Экспорт
  window.gallery = {
    createPicturesList: createPicturesList,
  };
})();
