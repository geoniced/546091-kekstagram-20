'use strict';

window.main = (function () {

  var pictureTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');
  var photos = window.data.getPhotos();
  var bigPicture = document.querySelector('.big-picture');

  window.gallery.renderPhotos(pictureTemplate, picturesContainer, photos);

  picturesContainer.addEventListener('click', function (evt) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      window.preview.showPicture(bigPicture, photos[picture.dataset.pictureId]);
    }
  });

  return;
})();
