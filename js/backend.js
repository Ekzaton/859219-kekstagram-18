'use strict';

(function () {
  // Константы
  var LOAD_URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;
  var OK_STATUS = 200;

  // Создание запроса
  var makeRequest = function (xhr, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === OK_STATUS) {
        onLoad(xhr.response);
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
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();

    makeRequest(xhr, onLoad, onError);

    xhr.open('GET', LOAD_URL);
    xhr.send();
  };

  // Экспорт
  window.backend = {
    load: load
  };
})();
