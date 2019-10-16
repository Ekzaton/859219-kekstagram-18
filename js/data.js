'use strict';

(function () {
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

  var Avatar = {
    MIN_NUMBER: 1,
    MAX_NUMBER: 6
  };

  var Like = {
    MIN_COUNT: 15,
    MAX_COUNT: 200
  };

  var Comment = {
    MIN_COUNT: 1,
    MAX_COUNT: 5
  };

  // Генерация комментариев пользователей
  var getUserComments = function (numberOfComments) {
    var comments = [];

    for (var i = 0; i < numberOfComments; i++) {
      var avatar = 'img/avatar-' + window.util.getRandomNumber(Avatar.MIN_NUMBER, Avatar.MAX_NUMBER) + '.svg';
      var message = window.util.getRandomIndex(COMMENT.messages);
      var name = window.util.getRandomIndex(COMMENT.names);

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
  var getPicture = function (numberOfPictures) {
    var pictureData = [];

    for (var i = 0; i < numberOfPictures; i++) {
      var url = 'photos/' + (i + 1) + '.jpg';
      var likes = window.util.getRandomNumber(Like.MIN_COUNT, Like.MAX_COUNT);
      var comments = getUserComments(window.util.getRandomNumber(Comment.MIN_COUNT, Comment.MAX_COUNT));

      var newPicture = {
        url: url,
        likes: likes,
        comments: comments
      };

      pictureData.push(newPicture);
    }

    return pictureData;
  };

  // Экспорт
  window.data = {
    getPicture: getPicture
  };
})();
