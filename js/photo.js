'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var Img = {
    WIDTH: '70',
    HEIGHT: '70'
  };

  var avatarChooser = document.querySelector('.ad-form__field #avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload #images');
  var photoContainer = document.querySelector('.ad-form__photo-container');

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
      var photoPreview = photoContainer.querySelector('.ad-form__photo');
      var img = document.createElement('img');
      img.alt = 'Фотография жилья';
      img.width = Img.WIDTH;
      img.height = Img.HEIGHT;
      img.src = reader.result;
      img.dataset.filename = photo.name;
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
    },
    getImageList: function () {
      var names = [];
      var images = Array.from(photoContainer.querySelectorAll('.ad-form__photo img'));
      images.forEach(function (it) {
        names.push(it.dataset.filename);
      });
      return names;
    }
  };
})();
