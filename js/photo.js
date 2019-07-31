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

  var addPhoto = function (photo, i) {
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var img = document.createElement('img');
      img.alt = 'Фотография жилья';
      img.width = '70';
      img.height = '70';
      img.src = reader.result;
      if (i === 0) {
        photoPreview.appendChild(img);
      } else {
        var photoBox = photoPreview.cloneNode();
        photoBox.appendChild(img);
        photoContainer.appendChild(photoBox);
      }
      window.sorting(photoContainer);
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
        window.photo.resetImages();
        addPhoto(photo, i);
      }
    }
  });

  window.photo = {
    resetAvatar: function () {
      avatarPreview.src = 'img/muffin-grey.svg';
    },
    resetImages: function () {
      var images = photoContainer.querySelectorAll('.ad-form__photo');
      images[0].innerHTML = '';
      for (var j = 1; j < images.length; j++) {
        photoContainer.removeChild(images[j]);
      }
    }
  };
})();
