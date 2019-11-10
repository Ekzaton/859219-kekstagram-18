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
    socialCommentsLoaderElement.classList.remove('visually-hidden');

    var socialCommentsList = document.createDocumentFragment();
    if (comments.length <= COMMENTS_LIMIT) {
      comments.forEach(function (comment) {
        socialCommentsList.appendChild(getSocialCommentsItem(comment));
      });
      socialCommentsLoaderElement.classList.add('visually-hidden');
    } else {
      for (var i = 0; i < COMMENTS_LIMIT; i++) {
        socialCommentsList.appendChild(getSocialCommentsItem(comments[i]));
      }
      hiddenComments = comments.slice(COMMENTS_LIMIT);
      socialCommentsLoaderElement.addEventListener('click', onSocialCommentsLoaderClick);
    }

    socialCommentsListElement.innerHTML = '';
    socialCommentsListElement.appendChild(socialCommentsList);
  };

  // Загрузка скрытых комментариев
  var onSocialCommentsLoaderClick = function () {
    var socialCommentsList = document.createDocumentFragment();
    if (hiddenComments.length <= COMMENTS_LIMIT) {
      hiddenComments.forEach(function (comment) {
        socialCommentsList.appendChild(getSocialCommentsItem(comment));
      });
      socialCommentsLoaderElement.classList.add('visually-hidden');
      socialCommentsLoaderElement.removeEventListener('click', onSocialCommentsLoaderClick);
    } else {
      for (var i = 0; i < COMMENTS_LIMIT; i++) {
        socialCommentsList.appendChild(getSocialCommentsItem(hiddenComments[i]));
      }
      hiddenComments = hiddenComments.slice(COMMENTS_LIMIT);
    }

    socialCommentsListElement.appendChild(socialCommentsList);
  };

  // Экспорт
  window.comments = {
    createSocialCommentsList: createSocialCommentsList
  };
})();
