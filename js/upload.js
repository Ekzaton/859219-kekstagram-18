'use strict';

(function () {
  // Константы
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  // Элементы DOM
  var imgUploadInputElement = document.querySelector('.img-upload__input');
  var imgUploadPreviewImgElement = document.querySelector('.img-upload__preview img');

  // Загрузка фотографии
  var uploadPicture = function () {
    var file = imgUploadInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgUploadPreviewImgElement.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  // Экспорт
  window.upload = {
    picture: uploadPicture
  };
})();
