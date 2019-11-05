'use strict';

(function () {
  // Элементы DOM
  var socialCommentsItemElement = document.querySelector('.social__comment');
  var socialCommentsListElement = document.querySelector('.social__comments');

  // Создание комментария
  var createSocialCommentsItem = function (comment) {
    var socialCommentsItem = socialCommentsItemElement.cloneNode(true);

    socialCommentsItem.querySelector('.social__picture').src = comment.avatar;
    socialCommentsItem.querySelector('.social__picture').alt = comment.name;
    socialCommentsItem.querySelector('.social__text').textContent = comment.message;

    return socialCommentsItem;
  };

  // Создание списка комментариев
  var createSocialCommentstList = function (comments) {
    var socialCommentsList = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      socialCommentsList.appendChild(createSocialCommentsItem(comments[i]));
    }

    socialCommentsListElement.innerHTML = '';
    socialCommentsListElement.appendChild(socialCommentsList);
  };

  // Экспорт
  window.comments = {
    createSocialCommentstList: createSocialCommentstList
  };
})();
