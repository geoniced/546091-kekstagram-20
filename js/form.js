'use strict';

window.form = (function () {
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

  var onLevelPinMouseDown = function (evt) {
    evt.preventDefault();

    var currentFilter = imgUploadPreview.dataset.currentFilter;

    var onLevelPinMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var linePinPosition = getPinPosition(effectLevelLine, moveEvt.x);
      changeFilter(linePinPosition, currentFilter);
    };

    var onLevelPinMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onLevelPinMouseMove);
      document.removeEventListener('mouseup', onLevelPinMouseUp);
    };

    document.addEventListener('mousemove', onLevelPinMouseMove);
    document.addEventListener('mouseup', onLevelPinMouseUp);
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
    effectLevelPin.addEventListener('mousedown', onLevelPinMouseDown);
    effectsList.addEventListener('change', onEffectsChange);
    uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
    hashtagsInput.addEventListener('input', onHashtagsInput);
  };

  var closeImgEditPopup = function () {
    imgUploadOverlay.classList.add('hidden');

    document.removeEventListener('keydown', onImgEditPopupPress);
    effectLevelPin.removeEventListener('mousedown', onLevelPinMouseDown);
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
    effectLevelInput.value = Math.round(percent);
    effectLevelPin.style.left = percent + '%';
    effectLevelDepth.style.width = percent + '%';
  };

  var changeFilter = function (percent, filterType) {
    if (filterType === 'none') {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }

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

  uploadFileInput.addEventListener('change', function () {
    openImgEditPopup();
  });
})();
