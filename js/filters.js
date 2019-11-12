'use strict';

(function () {
  // Константы
  var RANDOM_PICTURES = 10;

  // Элементы DOM
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularElement = document.querySelector('#filter-popular');
  var filterRandomElement = document.querySelector('#filter-random');
  var filterDiscussedElement = document.querySelector('#filter-discussed');

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
    var randomPictures = window.util.getRandomShuffleArray(pictureData.slice()).slice(0, RANDOM_PICTURES);
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
  var onFilterClick = function (selectedFilter) {
    var filters = document.querySelectorAll('.img-filters__button');

    filters.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });

    dropPicturesList();
    selectedFilter.classList.add('img-filters__button--active');
  };

  // Установка выбранного фильтра
  var setFilter = function (pictureData) {
    imgFiltersElement.classList.remove('img-filters--inactive');
    filterPopularElement.addEventListener('click', window.util.debounce(function () {
      onFilterClick(filterPopularElement);
      window.gallery.createPicturesList(pictureData);
    }));
    filterRandomElement.addEventListener('click', window.util.debounce(function () {
      onFilterClick(filterRandomElement);
      window.gallery.createPicturesList(getRandomPictures(pictureData));
    }));
    filterDiscussedElement.addEventListener('click', window.util.debounce(function () {
      onFilterClick(filterDiscussedElement);
      window.gallery.createPicturesList(getDiscussedPictures(pictureData));
    }));
  };

  // Экспорт
  window.filters = {
    setFilter: setFilter
  };
})();
