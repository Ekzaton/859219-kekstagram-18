'use strict';

(function () {
  // Элементы DOM
  var socialCommentsItemElement = document.querySelector('.social__comment');
  var socialCommentsListElement = document.querySelector('.social__comments');

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
    var socialCommentsList = document.createDocumentFragment();
    
    comments.forEach(function (comment) {
      socialCommentsList.appendChild(getSocialCommentsItem(comment));
    });

    socialCommentsListElement.innerHTML = '';
    socialCommentsListElement.appendChild(socialCommentsList);
  };

  // Экспорт
  window.comments = {
    createSocialCommentsList: createSocialCommentsList
  };
})();
