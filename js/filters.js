'use strict';

(function () {
  // Константы
  var RANDOM_PICTURES = 10;

  // Элементы DOM
  var imgFiltersElement = document.querySelector('.img-filters');
  var imgFiltersFormElement = document.querySelector('.img-filters__form');
  var imgFiltersButtonActiveElement = document.querySelector('.img-filters__button--active');

  // Сброс списка фотографий
  var dropPicturesList = function () {
    var pictures = document.querySelectorAll('.picture');

    if (pictures.length > 0) {
      pictures.forEach(function (picture) {
        picture.remove();
      });
    }
  };

  // Получение списка случайных фотографий
  var getRandomPictures = function (pictureData) {
    var randomPictures = window.util.shuffleArray(pictureData.slice()).slice(0, RANDOM_PICTURES);
    return randomPictures;
  };

  // Получение списка обсуждаемых фотографий
  var getDiscussedPictures = function (pictureData) {
    var discussedPictures = pictureData.slice().sort(function (firstPicture, secondPicture) {
      return (firstPicture.comments.length < secondPicture.comments.length) ? 1 : -1;
    });
    return discussedPictures;
  };

  // Выбор фильтра изображений
  var selectFilter = function (evt, pictureData) {
    if (evt.target.className === 'img-filters__button') {
      imgFiltersButtonActiveElement.classList.remove('img-filters__button--active');
      imgFiltersButtonActiveElement = evt.target;
      imgFiltersButtonActiveElement.classList.add('img-filters__button--active');
    }

    if (evt.target.id === 'filter-popular') {
      window.gallery.createList(pictureData);
    } else if (evt.target.id === 'filter-random') {
      window.gallery.createList(getRandomPictures(pictureData));
    } else if (evt.target.id === 'filter-discussed') {
      window.gallery.createList(getDiscussedPictures(pictureData));
    }
  };

  // Установка выбранного фильтра
  var setFilter = function (pictureData) {
    imgFiltersElement.classList.remove('img-filters--inactive');

    imgFiltersFormElement.addEventListener('click', window.util.debounce(function (evt) {
      dropPicturesList();
      selectFilter(evt, pictureData);
    }));
  };

  // Экспорт
  window.filters = {
    set: setFilter
  };
})();
