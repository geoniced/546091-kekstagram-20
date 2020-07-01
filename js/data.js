'use strict';

window.data = (function () {
  var PHOTO_AMOUNT = 25;

  var getPhotos = function () {
    var photos = [];

    for (var i = 1; i <= PHOTO_AMOUNT; i++) {
      photos.push(window.mocks.getPhoto(i));
    }

    return photos;
  };

  return {
    getPhotos: getPhotos
  };
})();
