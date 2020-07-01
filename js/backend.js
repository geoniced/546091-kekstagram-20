'use strict';

window.backend = (function () {
  var URL = {
    'GET': 'https://javascript.pages.academy/kekstagram/data'
  };

  var STATUS_CODES = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var addOnRequestLoad = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_CODES.OK) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
  };

  var addOnRequestError = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения!');
    });
  };

  var addOnRequestTimeout = function (xhr, onError) {
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + TIMEOUT_IN_MS + 'мс');
    });
  };

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    addOnRequestLoad(xhr, onLoad, onError);
    addOnRequestError(xhr, onError);
    addOnRequestTimeout(xhr, onError);

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL.GET);
    xhr.send();
  };

  return {
    load: load
  };
})();
