'use strict';

(function () {
  // Элементы DOM
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = document.querySelector('.big-picture__cancel');

  // Показать увеличенную фотографию
  var onPicturesItemClick = function (picture) {
    bigPictureElement.classList.remove('hidden');

    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    window.comments.createSocialCommentsList(picture.comments);

    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPictureElement.querySelector('.social__comments-loader').classList.add('visually-hidden');

    bigPictureCancelElement.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, onBigPictureCancelClick);
    });
  };

  // Скрыть увеличенную фотографию
  var onBigPictureCancelClick = function () {
    bigPictureElement.classList.add('hidden');

    bigPictureCancelElement.removeEventListener('click', onBigPictureCancelClick);
    document.removeEventListener('keydown', function (evt) {
      window.util.onEscPress(evt, onBigPictureCancelClick);
    });
  };

  // Экспорт
  window.picture = {
    onPicturesItemClick: onPicturesItemClick
  };
})();
