'use strict';

(function () {
  // Константы
  var Url = {
    LOAD: 'https://21.javascript.pages.academy/kekstagram/data',
    SAVE: 'https://21.javascript.pages.academy/kekstagram'
  };

  var CONNECTION_TIMEOUT = 10000;
  var ACCEPTED = 200;

  // Создание запроса
  var makeRequest = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';
    xhr.timeout = CONNECTION_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === ACCEPTED) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  // Загрузка данных
  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    makeRequest(xhr, onSuccess, onError);

    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  // Сохранение данных
  var save = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    makeRequest(xhr, onSuccess, onError);

    xhr.open('POST', Url.SAVE);
    xhr.send(data);
  };

  // Экспорт
  window.backend = {
    load: load,
    save: save
  };
})();
