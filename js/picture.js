'use strict';

(function () {
  // Элементы DOM
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = document.querySelector('.big-picture__cancel');

  // Показать увеличенную фотографию
  var onPicturesItemClick = function (picture) {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureElement.querySelector('.big-picture__img img').src = picture.url;
    bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureElement.querySelector('.social__caption').textContent = picture.description;

    window.comments.createList(picture.comments);

    bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');

    bigPictureCancelElement.addEventListener('click', onBigPictureCancelClick);
    document.addEventListener('keydown', onEscPress);
  };

  // Скрыть увеличенную фотографию по клику
  var onBigPictureCancelClick = function () {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');

    bigPictureCancelElement.removeEventListener('click', onBigPictureCancelClick);
    document.removeEventListener('keydown', onEscPress);
  };

  // Скрыть увеличенную фотографию по ESC
  var onEscPress = function (evt) {
    window.util.onEscPress(evt, onBigPictureCancelClick);
  };

  // Экспорт
  window.picture = {
    onItemClick: onPicturesItemClick
  };
})();
