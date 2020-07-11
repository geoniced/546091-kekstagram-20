'use strict';

window.preview = (function () {
  var picturesContainer = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

  var createCommentPicture = function (comment) {
    var commentPicture = document.createElement('img');
    commentPicture.classList.add('social__picture');
    commentPicture.src = comment.avatar;
    commentPicture.alt = comment.name;
    commentPicture.width = 35;
    commentPicture.height = 35;

    return commentPicture;
  };

  var createCommentText = function (message) {
    var commentText = document.createElement('p');
    commentText.classList.add('social__text');
    commentText.textContent = message;

    return commentText;
  };

  var createPhotoComment = function (comment) {
    var commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');

    var commentPictureElement = createCommentPicture(comment);
    var commentTextElement = createCommentText(comment.message);

    commentElement.appendChild(commentPictureElement);
    commentElement.appendChild(commentTextElement);

    return commentElement;
  };

  var removeParentChildren = function (parent) {
    var children = parent.children;

    while (children.length > 0) {
      parent.removeChild(children[0]);
    }
  };

  var renderPhotoComments = function (comments, container) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(createPhotoComment(comments[i]));
    }

    removeParentChildren(container);
    container.appendChild(fragment);
  };

  var renderPictureInformation = function (picture, photo) {
    var pictureImg = picture.querySelector('.big-picture__img > img');
    var pictureLikes = picture.querySelector('.likes-count');
    var pictureCommentsCounter = picture.querySelector('.comments-count');
    var pictureComments = picture.querySelector('.social__comments');
    var pictureDescription = picture.querySelector('.social__caption');

    pictureImg.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureCommentsCounter.textContent = photo.comments.length;
    pictureDescription.textContent = photo.description;

    renderPhotoComments(photo.comments, pictureComments);
  };

  var onBigPictureCloseClick = function () {
    closePicture();
  };

  var onBigPicturePress = function (evt) {
    window.util.isEscEvent(evt, function (escEvent) {
      escEvent.preventDefault();
      closePicture();
    });
  };

  var closePicture = function () {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    bigPictureCancel.removeEventListener('click', onBigPictureCloseClick);
    document.removeEventListener('keydown', onBigPicturePress);
  };

  var hideComments = function () {
    var commentsCounter = document.querySelector('.social__comment-count');
    var commentsLoader = document.querySelector('.comments-loader');

    commentsCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

  var showPicture = function (picture, photo) {
    picture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    bigPictureCancel.addEventListener('click', onBigPictureCloseClick);
    document.addEventListener('keydown', onBigPicturePress);

    renderPictureInformation(picture, photo);
    hideComments();
  };

  var onPreviewClick = function (evt) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      evt.preventDefault();
      var photos = window.gallery.getPhotos();
      var photo = photos.find(function (item) {
        return item.pictureId === +picture.dataset.pictureId;
      });

      showPicture(bigPicture, photo);
    }
  };

  var createPictureContainerHandler = function () {
    picturesContainer.removeEventListener('click', onPreviewClick);
    picturesContainer.addEventListener('click', onPreviewClick);
  };

  return {
    createPictureContainerHandler: createPictureContainerHandler
  };
})();
