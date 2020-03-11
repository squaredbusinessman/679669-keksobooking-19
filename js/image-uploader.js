'use strict';

(function () {
  var avatarFileLoadHandler = function () {
    var file = window.data.avatarFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.data.IMAGE_FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var avatarImg = window.data.avatarPreviewElement.querySelector('img');
        avatarImg.src = reader.result;
        avatarImg.width = window.data.UPLOAD_IMAGE.avatar.width;
        avatarImg.height = window.data.UPLOAD_IMAGE.avatar.height;
        avatarImg.alt = 'Ваш аватар';
      });

      reader.readAsDataURL(file);
    }
  };

  var housingPhotoFileLoadHandler = function () {
    var file = window.data.housingPhotoFileChooserElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.data.IMAGE_FILE_TYPES.some(function (extension) {
      return fileName.endsWith(extension);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var housingImg = document.createElement('img');
        housingImg.src = reader.result;
        housingImg.width = window.data.UPLOAD_IMAGE.housingPhoto.width;
        housingImg.height = window.data.UPLOAD_IMAGE.housingPhoto.height;
        housingImg.alt = 'Фотография жилья';
        window.data.housingPhotoPreviewElement.appendChild(housingImg);
      });

      reader.readAsDataURL(file);
    }
  };

  window.imageUploader = {
    sendAvatarHandler: avatarFileLoadHandler,
    sendHousingPhotoHandler: housingPhotoFileLoadHandler
  };
})();
