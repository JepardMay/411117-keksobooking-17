'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field #avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload #images');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoPreview = photoContainer.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var avatar = avatarChooser.files[0];
    var avatarName = avatar.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return avatarName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(avatar);
    }
  });

  var addPhoto = function (photo) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var img = document.createElement('img');
      img.alt = 'Фотография жилья';
      img.width = '70';
      img.height = '70';
      img.src = reader.result;
      var photoBox = photoPreview.cloneNode();
      photoBox.appendChild(img);
      photoContainer.appendChild(photoBox);
    });

    reader.readAsDataURL(photo);
  };

  photoChooser.addEventListener('change', function () {
    for (var i = 0; i < photoChooser.files.length; i++) {
      var photo = photoChooser.files[i];
      var photoName = photo.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return photoName.endsWith(it);
      });
      if (matches) {
        addPhoto(photo);
      }
    }
  });

  window.photo = {
    resetPhoto: function () {
      avatarPreview.src = '';
      var images = photoContainer.querySelectorAll('.ad-form__photo');
      for (var j = 1; j < images.length; j++) {
        images[j].remove();
      }
      photoPreview.innerHTML = '';
    }
  };
})();
