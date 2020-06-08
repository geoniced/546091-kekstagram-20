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
    avatar: 'img/avatar-' + getRandomRangeNumber(AVATAR_MIN_PIC, AVATAR_MAX_PIC),
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

var createPhotoElement = function (photo, template) {
  var pictureElement = template.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

var renderPhotos = function (template, container) {
  var photos = getPhotos();
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(createPhotoElement(photos[i], template));
  }

  container.appendChild(fragment);
};

var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
var picturesContainer = document.querySelector('.pictures');

renderPhotos(pictureTemplate, picturesContainer);
