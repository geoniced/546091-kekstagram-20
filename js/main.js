'use strict';

window.main = (function () {

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var photos = window.data.getPhotos();

  window.gallery.renderPhotos(pictureTemplate, picturesContainer, photos);
  window.preview.createPictureContainerHandler(photos);
})();
