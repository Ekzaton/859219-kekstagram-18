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

  // Отбор случайных фотографий
  var selectRandomPictures = function (pictureData) {
    var numberOfPictures = RANDOM_PICTURES;
    var randomPictures = window.util.getRandomShuffleArray(pictureData.slice()).slice(0, numberOfPictures);
    return randomPictures;
  };

  // Отбор обсуждаемых фотографий
  var selectDiscussedPictures = function (pictureData) {
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
      window.gallery.createPicturesList(selectRandomPictures(pictureData));
    }));
    filterDiscussedElement.addEventListener('click', window.util.debounce(function () {
      onFilterClick(filterDiscussedElement);
      window.gallery.createPicturesList(selectDiscussedPictures(pictureData));
    }));
  };

  // Экспорт
  window.filters = {
    setFilter: setFilter
  };
})();
