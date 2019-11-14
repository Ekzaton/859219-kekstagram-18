'use strict';

(function () {
  // Элементы DOM
  var picturesItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesListElement = document.querySelector('.pictures');

  // Получение фотографии
  var getPicturesItem = function (picture) {
    var picturesItem = picturesItemElement.cloneNode(true);

    picturesItem.querySelector('.picture__img').src = picture.url;
    picturesItem.querySelector('.picture__likes').textContent = picture.likes;
    picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesItem.addEventListener('click', function () {
      window.picture.onItemClick(picture);
    });

    return picturesItem;
  };

  // Создание списка фотографий
  var createPicturesList = function (pictures) {
    var picturesList = document.createDocumentFragment();
    pictures.forEach(function (picture) {
      picturesList.appendChild(getPicturesItem(picture));
    });

    picturesListElement.appendChild(picturesList);
  };

  // Экспорт
  window.gallery = {
    createList: createPicturesList
  };
})();
