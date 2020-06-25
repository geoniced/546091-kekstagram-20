'use strict';

window.gallery = (function () {
  var renderPhotos = function (template, container, photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(window.picture.createPhotoElement(photos[i], template, i));
    }

    container.appendChild(fragment);
  };

  return {
    renderPhotos: renderPhotos
  };
})();
