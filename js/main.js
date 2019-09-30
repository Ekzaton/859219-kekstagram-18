'use strict';

// Константы
var COMMENT = {
  message: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  name: [
    'Имечко Фамилия',
    'Пётр Николаевич',
    'Васисуалий Лоханкин',
    'Дмитрий Иванов',
    'Максим Смирнов',
    'Доктор Кто']
};
var NUMBER_OF_PICTURES = 25;

// Переменные для DOM
var picturesListElement = document.querySelector('.pictures');
var picturesItemElement = document.querySelector('#picture').content.querySelector('.picture');

// Генерация случайного числа из интервала (minNumber - начало интервала, maxNumber - конец интервала)
var getRandomNumber = function (minNumber, maxNumber) {
  var randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

  return randomNumber;
};

// Генерация индекса случайного элемента массива (array - массив)
var getRandomIndex = function (array) {
  var randomIndex = array[Math.floor((Math.random() * array.length - 1))];

  return randomIndex;
};

// Генерация индекса уникального случайного элемента массива (array - массив)
var getRandomUniqueIndex = function (array) {
  var randomUniqueIndex = array[Math.floor((Math.random() * array.length - 1))];

  return array.splice(randomUniqueIndex, 1);
};

// Генерация URL фотографий (number - количество фотографий)
var getUrls = function (number) {
  var urls = [];

  for (var i = 0; i < number; i++) {
    var newUrl = 'photos/' + (i + 1) + '.jpg';
    urls.push(newUrl);
  }

  return urls;
};

// Генерация комментариев (number - количество комментариев)
var getComments = function (number) {
  var comments = [];

  for (var i = 0; i < number; i++) {
    var avatar = getAvatars();
    var message = getRandomIndex(COMMENT.message);
    var name = getRandomIndex(COMMENT.name);

    var newComment = {
      avatar: avatar,
      message: message,
      name: name
    };

    comments.push(newComment);
  }

  return comments;
};

// Генерация аватаров ()
var getAvatars = function () {
  var avatars = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';

  return avatars;
};

// Генерация данных для фотографий (number - количество фотографий)
var getPictureData = function (number) {
  var pictureData = [];
  var urls = getUrls(number).slice();

  for (var i = 0; i < number; i++) {
    var url = getRandomUniqueIndex(urls);
    var likes = getRandomNumber(15, 200);
    var comments = getComments(getRandomNumber(1, 5));

    var newPicture = {
      url: url,
      likes: likes,
      comments: comments
    };

    pictureData.push(newPicture);
  }

  return pictureData;
};

// Создание фотографии (picture - фотография)
var createPicture = function (picture) {
  var picturesItem = picturesItemElement.cloneNode(true);

  picturesItem.querySelector('.picture__img').src = picture.url;
  picturesItem.querySelector('.picture__likes').textContent = picture.likes;
  picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

  return picturesItem;
};

// Создание списка фотографий (pictureData - данные фотографии)
var createPicturesList = function (pictureData) {
  var picturesList = document.createDocumentFragment();

  for (var i = 0; i < pictureData.length; i++) {
    picturesList.appendChild(createPicture(pictureData[i]));
  }

  return picturesListElement.appendChild(picturesList);
};

// Отрисовка списка фотографий (items - фотографии)
var renderPictures = function (items) {
  createPicturesList(getPictureData(items));
};

renderPictures(NUMBER_OF_PICTURES);
