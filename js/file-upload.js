'use strict';

window.fileUpload = (function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var createUploadFileLoaderHandler = function (fileInput, previewImage) {
    var file = fileInput.files[0];
    var fileName = '';

    if (file) {
      fileName = file.name.toLowerCase();
    }

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImage.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  return {
    createUploadFileLoaderHandler: createUploadFileLoaderHandler
  };
})();
