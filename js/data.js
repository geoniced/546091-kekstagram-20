'use strict';

window.data = (function () {
  var loadPhotos = function () {
    window.backend.load(window.gallery.onPhotosLoad);
  };

  return {
    loadPhotos: loadPhotos
  };
})();
