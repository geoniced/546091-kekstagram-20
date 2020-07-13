'use strict';

window.gallery = (function () {
  var RANDOM_PHOTOS_AMOUNT = 10;

  var setPhotoId = function (item, index) {
    item.pictureId = index;
  };

  var onPhotosLoad = function (data) {
    photos = data;
    defaultPhotos = photos;

    photos.forEach(setPhotoId);

    renderPhotos(photos);
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
    photos = newPhotos;
    clearGallery();

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPhotos.length; i++) {
      var newPhoto = newPhotos[i];
      fragment.appendChild(window.picture.createPhotoElement(newPhoto, pictureTemplate, newPhoto.pictureId));
    }

    picturesContainer.appendChild(fragment);
  };

  var getRandomPhotos = function (photos) {
    var randomPhotos = window.util.getRandomNotRepeatedArray(photos, RANDOM_PHOTOS_AMOUNT);

    return randomPhotos;
  };

  var getPhotos = function () {
    return photos;
  };

  var photos = [];
  var defaultPhotos = photos;

  var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
  var picturesContainer = document.querySelector('.pictures');

  window.filter.filters.default = window.debounce(function () {
    photos = defaultPhotos;
    renderPhotos(photos);
  });

  window.filter.filters.random = window.debounce(function () {
    var randomPhotos = getRandomPhotos(defaultPhotos);
    renderPhotos(randomPhotos);
  });

  window.filter.filters.discussed = window.debounce(function () {
    var discussedOrderPhotos = defaultPhotos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });

    renderPhotos(discussedOrderPhotos);
  });

  return {
    renderPhotos: renderPhotos,
    onPhotosLoad: onPhotosLoad,
    getPhotos: getPhotos
  };
})();
