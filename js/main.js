'use strict';

var PHOTO_AMOUNT = 25;
var MIN_LIKES_AMOUNT = 15;
var MAX_LIKES_AMOUNT = 200;
var MAX_COMMENTS = 2;
var AVATAR_MIN_PIC = 1;
var AVATAR_MAX_PIC = 6;
var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var NAMES = [
  'Иван',
  'Артём',
  'Александр',
  'Никита',
  'Ольга',
  'Александра',
  'Мария',
  'Людмила'
];

var DEFAULT_PIN_POSITION = 100;

var FILTER_VALUES = {
  'chrome': {
    'effect': 'grayscale',
    'range': [0, 1],
    'unit': ''
  },
  'sepia': {
    'effect': 'sepia',
    'range': [0, 1],
    'unit': ''
  },
  'marvin': {
    'effect': 'invert',
    'range': [0, 100],
    'unit': '%'
  },
  'phobos': {
    'effect': 'blur',
    'range': [0, 3],
    'unit': 'px'
  },
  'heat': {
    'effect': 'brightness',
    'range': [1, 3],
    'unit': ''
  }
};

var HASHTAG_REGEXP = /^#[a-zA-Zа-яА-Я0-9]{1,20}$/;
var HASHTAGS_MAX_AMOUNT = 5;

var getDescription = function () {
  // TODO
  return '';
};

var getRandomRangeNumber = function (from, to) {
  var rangeNumber = Math.round(Math.random() * (to - from) + from);

  return rangeNumber;
};

var getLikesCount = function () {
  // У меня есть ощущение, что потом нужно будет MIN и MAX сделать параметрами
  var likesNum = getRandomRangeNumber(MIN_LIKES_AMOUNT, MAX_LIKES_AMOUNT);

  return likesNum;
};

var getRandomIndex = function (array) {
  var length = array.length;
  var index = Math.round(Math.random() * length);

  return index;
};

var getMessage = function () {
  return MESSAGES[getRandomIndex(MESSAGES)];
};

var getName = function () {
  return NAMES[getRandomIndex(NAMES)];
};

var getComment = function () {
  var comment = {
    avatar: 'img/avatar-' + getRandomRangeNumber(AVATAR_MIN_PIC, AVATAR_MAX_PIC) + '.svg',
    message: getMessage(),
    name: getName()
  };

  return comment;
};

var getComments = function () {
  var comments = [];
  var commentsAmount = Math.round(Math.random() * MAX_COMMENTS);

  for (var i = 0; i < commentsAmount; i++) {
    comments.push(getComment());
  }

  return comments;
};

var getPhoto = function (number) {
  var photo = {
    url: 'photos/' + number + '.jpg',
    description: getDescription(),
    likes: getLikesCount(),
    comments: getComments()
  };

  return photo;
};

var getPhotos = function () {
  var photos = [];

  for (var i = 1; i <= PHOTO_AMOUNT; i++) {
    photos.push(getPhoto(i));
  }

  return photos;
};

var createPhotoElement = function (photo, template, pictureIndex) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
  pictureElement.dataset.pictureId = pictureIndex;

  return pictureElement;
};

var renderPhotos = function (template, container, photos) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoElement(photos[i], template, i));
  }

  container.appendChild(fragment);
};

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');
var photos = getPhotos();
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
  if (evt.key === 'Escape') {
    closePicture();
  }
};

var closePicture = function () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  bigPictureCancel.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPicturePress);
};

var showPicture = function (picture, photo) {
  picture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureCancel.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onBigPicturePress);

  renderPictureInformation(picture, photo);
  hideComments();
};

var hideComments = function () {
  var commentsCounter = document.querySelector('.social__comment-count');
  var commentsLoader = document.querySelector('.comments-loader');

  commentsCounter.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

var uploadFileInput = document.querySelector('#upload-file');
var uploadCancelBtn = document.querySelector('#upload-cancel');

var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');

var effectLevel = document.querySelector('.img-upload__effect-level');
var effectLevelInput = document.querySelector('.effect-level__value');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = effectLevelLine.querySelector('.effect-level__pin');
var effectLevelDepth = effectLevelLine.querySelector('.effect-level__depth');

var effectsList = document.querySelector('.effects__list');

var hashtagsInput = document.querySelector('.text__hashtags');
var hashtagsCommentInput = document.querySelector('.text__description');

var onImgEditPopupPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagsInput && evt.target !== hashtagsCommentInput) {
    closeImgEditPopup();
  }
};

var getPinPosition = function (levelLine, eventX) {
  var lineOffsetX = Math.round(levelLine.getBoundingClientRect().left);
  var lineWidth = levelLine.offsetWidth;
  var pixelsPinPositionX = eventX - lineOffsetX;
  var pinPosition;

  if (eventX < lineOffsetX) {
    pinPosition = 0;
  } else if (eventX > lineOffsetX + lineWidth) {
    pinPosition = 100;
  } else {
    pinPosition = (pixelsPinPositionX * 100) / lineWidth;
  }

  return pinPosition;
};

var onLevelPinMouseUp = function (evt) {
  var currentFilter = imgUploadPreview.dataset.currentFilter;

  // Походу это в этом задании делать не нужно было :P Сложное описание
  var linePinPosition = getPinPosition(effectLevelLine, evt.x);

  changeFilter(linePinPosition, currentFilter);
};

var onEffectsChange = function (evt) {
  if (evt.target.matches('.effects__radio')) {
    changeFilter(DEFAULT_PIN_POSITION, evt.target.value);
  }
};

var onUploadCancelBtnClick = function () {
  closeImgEditPopup();
};

var onHashtagsInput = function () {
  var validityMessage = validateHashtagInput();
  hashtagsInput.setCustomValidity(validityMessage);
};

var openImgEditPopup = function () {
  imgUploadOverlay.classList.remove('hidden');

  changeFilter(effectLevelInput.value, 'none');

  document.addEventListener('keydown', onImgEditPopupPress);
  effectLevelPin.addEventListener('mouseup', onLevelPinMouseUp);
  effectsList.addEventListener('change', onEffectsChange);
  uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
  hashtagsInput.addEventListener('input', onHashtagsInput);
};

var closeImgEditPopup = function () {
  imgUploadOverlay.classList.add('hidden');

  document.removeEventListener('keydown', onImgEditPopupPress);
  effectLevelPin.removeEventListener('mouseup', onLevelPinMouseUp);
  effectsList.removeEventListener('change', onEffectsChange);
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);
  hashtagsInput.removeEventListener('input', onHashtagsInput);

  uploadFileInput.value = '';
  hashtagsInput.value = '';
};

var getFilterData = function (filterType) {
  return FILTER_VALUES[filterType];
};

var getRangeValue = function (range, percent) {
  var firstRangeItem = range[0];
  var secondRangeItem = range[1];

  var rangeLength = secondRangeItem - firstRangeItem;

  var decimalPercentValue = percent / 100;

  var rangeNumber = (decimalPercentValue * rangeLength) + firstRangeItem;

  return rangeNumber;
};

var getFilterValue = function (filterData, percent) {
  var filterRangedValue = getRangeValue(filterData.range, percent);
  var filterValue = filterRangedValue + filterData.unit;

  return filterData.effect + '(' + filterValue + ')';
};

var setFilterSettings = function (percent, filterType) {
  var filterData = getFilterData(filterType);

  imgUploadPreview.style.filter = filterData ? getFilterValue(filterData, percent) : '';
};

// Пока мне кажется, что это достаточно удобно
var setFilterLevel = function (percent) {
  effectLevelInput.value = percent;
  effectLevelPin.style.left = percent + '%';
  effectLevelDepth.style.width = percent + '%';
};

var changeFilter = function (percent, filterType) {
  if (filterType === 'none') {
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
  }
  effectLevelInput.value = percent;

  imgUploadPreview.className = '';
  imgUploadPreview.classList.add('effects__preview--' + filterType);
  imgUploadPreview.dataset.currentFilter = filterType;
  setFilterSettings(percent, filterType);
  setFilterLevel(percent);
};

var isValidHashtag = function (hashtag) {
  return HASHTAG_REGEXP.test(hashtag);
};

var validateHashtagInput = function () {
  var hashtags = hashtagsInput.value.split(' ');
  var usedHashtags = {};
  var isEmptyField = hashtags.length === 1 && hashtags[0] === '';
  var validityMessage = '';

  if (isEmptyField) {
    return validityMessage;
  }

  if (hashtags.length > HASHTAGS_MAX_AMOUNT) {
    return 'Количество хэш-тегов не должно быть больше пяти!';
  }

  for (var i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (isValidHashtag(hashtag) && !usedHashtags[hashtag.toLowerCase()]) {
      usedHashtags[hashtag.toLowerCase()] = true;
    } else {
      validityMessage = 'Ошибка написания хэш-тегов';
      break;
    }
  }

  return validityMessage;
};

uploadFileInput.addEventListener('change', function () {
  openImgEditPopup();
});

picturesContainer.addEventListener('click', function (evt) {
  var picture = evt.target.closest('.picture');
  if (picture) {
    evt.preventDefault();
    showPicture(bigPicture, photos[picture.dataset.pictureId]);
  }
});

renderPhotos(pictureTemplate, picturesContainer, photos);
