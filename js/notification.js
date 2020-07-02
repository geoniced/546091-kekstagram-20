'use strict';

window.notification = (function () {
  var closeNotification = function () {
    var notificationContainer = document.querySelector('.notification');
    notificationContainer.parentNode.removeChild(notificationContainer);

    document.removeEventListener('keydown', onNotificationPress);
  };

  var onNotificationCloseClick = function (evt) {
    evt.preventDefault();
    closeNotification();
  };

  var onNotificationPress = function (evt) {
    window.util.isEscEvent(evt, function (escEvent) {
      escEvent.preventDefault();
      closeNotification();
    });
  };

  var onNotificationClick = function (evt) {
    if (evt.target === document.querySelector('.notification')) {
      evt.preventDefault();
      closeNotification();
    }
  };

  var showNotification = function (type) {
    var template = document.querySelector('#' + type)
        .content
        .querySelector('.' + type);

    var notification = template.cloneNode(true);
    var notificationClose = notification.querySelector('.' + type + '__button');

    notification.classList.add('notification');

    notificationClose.addEventListener('click', onNotificationCloseClick);
    document.addEventListener('keydown', onNotificationPress);
    notification.addEventListener('click', onNotificationClick);

    document.querySelector('main').insertAdjacentElement('afterbegin', notification);
  };

  var showSuccessNotification = function () {
    showNotification('success');
  };

  var showErrorNotification = function () {
    showNotification('error');
  };

  return {
    showSuccessNotification: showSuccessNotification,
    showErrorNotification: showErrorNotification
  };
})();
