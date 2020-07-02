'use strict';

window.main = (function () {
  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.data.loadPhotos(pictureTemplate, picturesContainer);
})();
