'use strict';

(function () {
  // Константы
  var COMMENTS_LIMIT = 5;

  // Глобальныне переменные
  var hiddenComments;

  // Элементы DOM
  var socialCommentsItemElement = document.querySelector('.social__comment');
  var socialCommentsListElement = document.querySelector('.social__comments');
  var socialCommentsLoaderElement = document.querySelector('.social__comments-loader');

  // Получение комментария
  var getSocialCommentsItem = function (comment) {
    var socialCommentsItem = socialCommentsItemElement.cloneNode(true);

    socialCommentsItem.querySelector('.social__picture').src = comment.avatar;
    socialCommentsItem.querySelector('.social__picture').alt = comment.name;
    socialCommentsItem.querySelector('.social__text').textContent = comment.message;

    return socialCommentsItem;
  };

  // Создание списка комментариев
  var createSocialCommentsList = function (comments) {
    socialCommentsListElement.innerHTML = '';
    socialCommentsListElement.appendChild(splitUpComments(comments));
  };

  // Разделение комментариев
  var splitUpComments = function (comments) {
    var socialCommentsList = document.createDocumentFragment();
    if (comments.length <= COMMENTS_LIMIT) {
      comments.forEach(function (comment) {
        socialCommentsList.appendChild(getSocialCommentsItem(comment));
      });
      socialCommentsLoaderElement.classList.add('visually-hidden');
      socialCommentsLoaderElement.removeEventListener('click', onSocialCommentsLoaderClick);

    } else {
      comments.forEach(function (comment, index) {
        if (index < COMMENTS_LIMIT) {
          socialCommentsList.appendChild(getSocialCommentsItem(comment));
        }
      });
      hiddenComments = comments.slice(COMMENTS_LIMIT);
      socialCommentsLoaderElement.classList.remove('visually-hidden');
      socialCommentsLoaderElement.addEventListener('click', onSocialCommentsLoaderClick);
    }

    return socialCommentsList;
  };

  // Загрузка скрытых комментариев
  var onSocialCommentsLoaderClick = function () {
    socialCommentsListElement.appendChild(splitUpComments(hiddenComments));
  };

  // Экспорт
  window.comments = {
    createSocialCommentsList: createSocialCommentsList
  };
})();
