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

    return picturesList;
  };

  // Отрисовка списка фотографий
  var renderPictures = function () {
    window.backend.load(onLoadSuccess, onError);
  };

  // Успешная загрузка
  var onLoadSuccess = function (pictureData) {
    picturesListElement.appendChild(createPicturesList(pictureData));
  };

  // Ошибка загрузки
  var onError = function (errorMessage) {
    errorElement.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);
  };

  renderPictures();
})();
