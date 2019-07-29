'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('.ad-form__field #avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload #images');
  var photoPreview = document.querySelector('.ad-form__photo');

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

  photoChooser.addEventListener('change', function () {
    for (var i = 0; i < photoChooser.files.length; i++) {
      var photo = photoChooser.files[i];
      var photoName = photo.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return photoName.endsWith(it);
      });
      if (matches) {
        var img = document.createElement('img');
        img.alt = 'Фотография жилья';
        img.width = '70';
        img.height = '70';

        var reader = new FileReader();

        reader.addEventListener('load', function () {
          img.src = reader.result;
          var photoBox = photoPreview.cloneNode();
          photoBox.appendChild(img);
        });

        reader.readAsDataURL(photo);
      }
    }
  });
})();
