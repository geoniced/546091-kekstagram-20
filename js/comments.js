'use strict';

window.comments = (function () {
  var VISIBLE_COMMENTS = 5;

  var showCommentsLoader = function () {
    commentsCounter.classList.remove('hidden');
    commentsLoader.classList.remove('hidden');
  };

  var hideCommentsLoader = function () {
    commentsCounter.classList.add('hidden');
    commentsLoader.classList.add('hidden');
  };

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

  var updateCommentsCount = function (count) {
    commentsContainer.dataset.commentsRendered = count || 0;
  };

  var populateComments = function (commentsFragment, item) {
    commentsFragment.appendChild(createPhotoComment(item));
    return commentsFragment;
  };

  var renderComments = function (commentsToRender) {
    var fragment = document.createDocumentFragment();
    commentsToRender.reduce(populateComments, fragment);
    commentsContainer.appendChild(fragment);
  };

  var renderMoreComments = function (renderedCount) {
    var commentsLeft = comments.length - renderedCount;
    var commentsCount = commentsLeft < VISIBLE_COMMENTS ? commentsLeft : VISIBLE_COMMENTS;

    var commentsToRender = comments.slice(renderedCount, renderedCount + commentsCount);
    renderComments(commentsToRender);

    renderedCount += commentsCount;

    updateCommentsCount(renderedCount);

    if (comments.length === renderedCount) {
      hideCommentsLoader();
    }
  };

  var onCommentsLoaderClick = function (evt) {
    evt.preventDefault();
    var renderedCount = +commentsContainer.dataset.commentsRendered;

    renderMoreComments(renderedCount);
  };

  var createMoreCommentsHandler = function () {
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  };

  var renderPhotoComments = function (newComments, container) {
    commentsContainer = container;
    comments = newComments;
    pictureCommentsCounter.textContent = comments.length;

    updateCommentsCount();
    showCommentsLoader();

    renderMoreComments(0);

    createMoreCommentsHandler();
  };

  var destroyPhotoComments = function () {
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  var commentsContainer = null;
  var comments = [];

  var pictureCommentsCounter = document.querySelector('.comments-count');
  var commentsCounter = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  return {
    renderPhotoComments: renderPhotoComments,
    destroyPhotoComments: destroyPhotoComments
  };
})();
