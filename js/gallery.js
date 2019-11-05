'use strict';

(function () {
  // Элементы DOM
  var picturesItemElement = document.querySelector('#picture').content.querySelector('.picture');
  var picturesListElement = document.querySelector('.pictures');

  // Создание фотографии
  var createPicturesItem = function (picture) {
    var picturesItem = picturesItemElement.cloneNode(true);

    picturesItem.querySelector('.picture__img').src = picture.url;
    picturesItem.querySelector('.picture__likes').textContent = picture.likes;
    picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

    picturesItem.addEventListener('click', function () {
      window.picture.onPicturesItemClick(picture);
    });

    return picturesItem;
  };

  // Создание списка фотографий
  var createPicturesList = function (pictures) {
    var picturesList = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      picturesList.appendChild(createPicturesItem(pictures[i]));
    }

    picturesListElement.appendChild(picturesList);
  };

  // Экспорт
  window.gallery = {
    createPicturesList: createPicturesList
  };
})();
