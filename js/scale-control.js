'use strict';

window.scaleControl = (function () {
  var SCALE_STEP = 25;
  var MAX_VALUE = 100;
  var MIN_VALUE = 0;
  var DEFAULT_VALUE = 100;

  var convertToFraction = function (number) {
    return number / 100;
  };

  var getScaleValue = function () {
    return +scaleValue.dataset.value;
  };

  var setScaleValue = function (value) {
    if (value > MAX_VALUE) {
      value = MAX_VALUE;
    }

    if (value < MIN_VALUE) {
      value = MIN_VALUE;
    }

    scaleValue.dataset.value = value;
    scaleValue.value = value + '%';

    var fractionalValue = convertToFraction(value);

    if (previewImg) {
      previewImg.style.transform = 'scale(' + fractionalValue + ')';
    }
  };

  var onScaleSmallerClick = function (evt) {
    evt.preventDefault();
    setScaleValue(getScaleValue() - SCALE_STEP);
  };

  var onScaleBiggerClick = function (evt) {
    evt.preventDefault();
    setScaleValue(getScaleValue() + SCALE_STEP);
  };

  var createScaleHandlers = function (image) {
    previewImg = image;

    setScaleValue(DEFAULT_VALUE);

    scaleSmaller.addEventListener('click', onScaleSmallerClick);
    scaleBigger.addEventListener('click', onScaleBiggerClick);
  };

  var removeScaleHandlers = function () {
    scaleSmaller.removeEventListener('click', onScaleSmallerClick);
    scaleBigger.removeEventListener('click', onScaleBiggerClick);
  };

  var scale = document.querySelector('.scale');
  var scaleSmaller = scale.querySelector('.scale__control--smaller');
  var scaleBigger = scale.querySelector('.scale__control--bigger');
  var scaleValue = scale.querySelector('.scale__control--value');

  var previewImg = null;

  return {
    createScaleHandlers: createScaleHandlers,
    removeScaleHandlers: removeScaleHandlers
  };
})();
