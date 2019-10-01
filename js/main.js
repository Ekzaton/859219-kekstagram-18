'use strict';

// Константы
var COMMENT = {
  messages: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  names: [
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

// Генерация случайного числа из интервала
var getRandomNumber = function (minNumber, maxNumber) {
  var randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1) + minNumber);

  return randomNumber;
};

// Генерация индекса случайного элемента массива
var getRandomIndex = function (array) {
  var randomIndex = array[Math.floor((Math.random() * array.length - 1))];

  return randomIndex;
};

// Генерация аватаров пользователей
var getUserAvatars = function () {
  var userAvatars = 'img/avatar-' + getRandomNumber(1, 6) + '.svg';

  return userAvatars;
};

// Генерация комментариев пользователей
var getUserComments = function (numberOfComments) {
  var comments = [];

  for (var i = 0; i < numberOfComments; i++) {
    var avatar = getUserAvatars();
    var message = getRandomIndex(COMMENT.messages);
    var name = getRandomIndex(COMMENT.names);

    var newComment = {
      avatar: avatar,
      message: message,
      name: name
    };

    comments.push(newComment);
  }

  return comments;
};

// Генерация данных для фотографий
var getPictureData = function (numberOfPictures) {
  var pictureData = [];

  for (var i = 0; i < numberOfPictures; i++) {
    var url = 'photos/' + (i + 1) + '.jpg';
    var likes = getRandomNumber(15, 200);
    var comments = getUserComments(getRandomNumber(1, 5));

    var newPicture = {
      url: url,
      likes: likes,
      comments: comments
    };

    pictureData.push(newPicture);
  }

  return pictureData;
};

// Создание фотографии
var createPicture = function (picture) {
  var picturesItem = picturesItemElement.cloneNode(true);

  picturesItem.querySelector('.picture__img').src = picture.url;
  picturesItem.querySelector('.picture__likes').textContent = picture.likes;
  picturesItem.querySelector('.picture__comments').textContent = picture.comments.length;

  return picturesItem;
};

// Создание списка фотографий
var createPicturesList = function (pictureData) {
  var picturesList = document.createDocumentFragment();

  for (var i = 0; i < pictureData.length; i++) {
    picturesList.appendChild(createPicture(pictureData[i]));
  }

  return picturesList;
};

// Отрисовка списка фотографий
var renderPictures = function (numberOfPictures) {
  picturesListElement.appendChild(createPicturesList(getPictureData(numberOfPictures)));
};

renderPictures(NUMBER_OF_PICTURES);
