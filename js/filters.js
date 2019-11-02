'use strict';

(function () {
  // Константы
  var RANDOM_PICTURES = 10;

  // Элементы DOM
  var imgFiltersElement = document.querySelector('.img-filters');
  var filterPopularElement = document.querySelector('#filter-popular');
  var filterRandomElement = document.querySelector('#filter-random');
  var filterDiscussedElement = document.querySelector('#filter-discussed');
  var filterElements = [filterPopularElement, filterRandomElement, filterDiscussedElement];

  // Сброс списка фотографий
  var dropPicturesList = window.util.debounce(function () {
    var allPictures = document.querySelectorAll('.picture');
    if (allPictures.length > 0) {
      for (var i = 0; i < allPictures.length; i++) {
        allPictures[i].remove();
      }
    }
  });

  // Отбор фотографий по фильтру
  var filterPictures = function (pictureData) {
    if (filterElements[0].classList.contains('img-filters__button--active')) {
      return pictureData;
    }

    if (filterElements[1].classList.contains('img-filters__button--active')) {
      var numberOfPictures = RANDOM_PICTURES;
      var randomPictures = window.util.getRandomShuffleArray(pictureData.slice()).slice(0, numberOfPictures);
      return randomPictures;
    }

    if (filterElements[2].classList.contains('img-filters__button--active')) {
      var discussedPictures = pictureData.slice().sort(function (firstPicture, secondPicture) {
        if (firstPicture.comments.length < secondPicture.comments.length) {
          return 1;
        } else if (firstPicture.comments.length > secondPicture.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });
      return discussedPictures;
    }

    return pictureData;
  };

  // Выбор фильтра изображений
  var onFilterClick = function (filters, newFilterIndex, pictureData) {
    for (var i = 0; i < filters.length; i++) {
      if (filters[i].classList.contains('img-filters__button--active')) {
        filters[i].classList.remove('img-filters__button--active');
      }
    }
    filterElements[newFilterIndex].classList.add('img-filters__button--active');
    dropPicturesList();
    window.gallery.createPicturesList(filterPictures(pictureData));
  };

  // Установка выбранного фильтра
  var setFilter = function (pictureData) {
    imgFiltersElement.classList.remove('img-filters--inactive');
    filterElements[0].addEventListener('click', function () {
      onFilterClick(filterElements, 0, pictureData);
    });
    filterElements[1].addEventListener('click', function () {
      onFilterClick(filterElements, 1, pictureData);
    });
    filterElements[2].addEventListener('click', function () {
      onFilterClick(filterElements, 2, pictureData);
    });
  };

  // Экспорт
  window.filters = {
    setFilter: setFilter
  };
})();
