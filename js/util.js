'use strict';

window.util = (function () {
  var isElementIgnored = function (evt, ignoreList) {
    var isIgnored = false;

    if (ignoreList && ignoreList.length) {
      isIgnored = ignoreList.indexOf(evt.target) !== -1;
    }
    return isIgnored;
  };

  return {
    isEscEvent: function (evt, action, ignoreList) {
      if (evt.key === 'Escape' && !isElementIgnored(evt, ignoreList)) {
        action(evt);
      }
    }
  };
})();
