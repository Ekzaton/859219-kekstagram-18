'use strict';

(function () {
  // Элементы DOM
  var picturesItemElement = document.querySelector('#picture').content.querySelector('.picture');

  window.picture = {
    // Создание фотографии
    createPicturesItem: function (picture) {
      var picturesItem = picturesItemElement.cloneNode(true);

      picturesItem.querySelector('.picture__img').src = picture.url;
      picturesItem.querySelector('.picture__likes').textContent = picture.likes;
      picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

      return picturesItem;
    }
  };
})();
