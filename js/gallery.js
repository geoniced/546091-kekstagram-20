'use strict';

window.gallery = (function () {
  var RANDOM_PHOTOS_AMOUNT = 10;

  var onPhotosLoad = function (data) {
    photos = data;
    renderPhotos(data);
    window.preview.createPictureContainerHandler(data);
    window.filter.showFilter();
  };

  var clearGallery = function () {
    var pictures = picturesContainer.querySelectorAll('.picture');
    for (var i = pictures.length - 1; i >= 0; i--) {
      picturesContainer.removeChild(pictures[i]);
    }
  };

  var renderPhotos = function (newPhotos) {
    clearGallery();

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPhotos.length; i++) {
      fragment.appendChild(window.picture.createPhotoElement(newPhotos[i], pictureTemplate, i));
    }

    picturesContainer.appendChild(fragment);
  };

  var getRandomPhotos = function (photos) {
    var randomPhotos = window.util.getRandomNotRepeatedArray(photos, RANDOM_PHOTOS_AMOUNT);

    return randomPhotos;
  };

  var photos = [];

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.filter.filters.default = function () {
    renderPhotos(photos);
  };

  window.filter.filters.random = function () {
    var randomPhotos = getRandomPhotos(photos);
    renderPhotos(randomPhotos);
  };

  window.filter.filters.discussed = function () {
    var discussedOrderPhotos = photos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });

    renderPhotos(discussedOrderPhotos);
  };

  return {
    renderPhotos: renderPhotos,
    onPhotosLoad: onPhotosLoad
  };
})();
