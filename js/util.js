'use strict';

window.util = (function () {
  var isElementIgnored = function (evt, ignoreList) {
    var isIgnored = false;

    if (ignoreList && ignoreList.length) {
      isIgnored = ignoreList.indexOf(evt.target) !== -1;
    }
    return isIgnored;
  };

  var isEscEvent = function (evt, action, ignoreList) {
    if (evt.key === 'Escape' && !isElementIgnored(evt, ignoreList)) {
      action(evt);
    }
  };

  var getRandomIndex = function (array) {
    var length = array.length;

    return Math.round(Math.random() * (length - 1));
  };

  var getRandomItem = function (randomArray, array) {
    var randomIndex = getRandomIndex(array);
    var randomItem = array[randomIndex];

    while (randomArray.indexOf(randomItem) !== -1) {
      randomIndex = getRandomIndex(array);
      randomItem = array[randomIndex];
    }

    return randomItem;
  };

  var getRandomNotRepeatedArray = function (array, count) {
    var randomArray = [];
    for (var i = 0; i < count; i++) {
      var randomItem = getRandomItem(randomArray, array);
      randomArray.push(randomItem);
    }

    return randomArray;
  };

  return {
    isEscEvent: isEscEvent,
    getRandomIndex: getRandomIndex,
    getRandomNotRepeatedArray: getRandomNotRepeatedArray
  };
})();
