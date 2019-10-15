'use strict';

(function () {
  // Константы
  var NUMBER_OF_PICTURES = 25;

  // Элементы DOM
  var picturesListElement = document.querySelector('.pictures');

  // Создание списка фотографий
  var createPicturesList = function (pictureData) {
    var picturesList = document.createDocumentFragment();

    for (var i = 0; i < pictureData.length; i++) {
      picturesList.appendChild(window.picture.createPicturesItem(pictureData[i]));
    }

    return picturesList;
  };

  // Отрисовка списка фотографий
  var renderPictures = function (numberOfComments) {
    picturesListElement.appendChild(createPicturesList(window.data.getPictureData(numberOfComments)));
  };

  renderPictures(NUMBER_OF_PICTURES);
})();
