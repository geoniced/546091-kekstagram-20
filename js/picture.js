'use strict';

window.picture = (function () {
  var createPhotoElement = function (photo, template, pictureIndex) {
    var pictureElement = template.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureElement.dataset.pictureId = pictureIndex;

    return pictureElement;
  };

  return {
    createPhotoElement: createPhotoElement
  };
})();
