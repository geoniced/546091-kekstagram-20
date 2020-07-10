'use strict';

window.filter = (function () {
  var ACTIVE_CLASS = 'img-filters__button--active';

  var filters = {
    default: function () {},
    random: function () {},
    discussed: function () {}
  };

  var FilterValuesMap = {
    'filter-default': 'default',
    'filter-random': 'random',
    'filter-discussed': 'discussed'
  };

  var updateFilter = function (filter) {
    imgFiltersForm.querySelector('.' + ACTIVE_CLASS).classList.remove(ACTIVE_CLASS);
    filter.classList.add(ACTIVE_CLASS);

    filters[FilterValuesMap[filter.id]]();
  };

  var onImgFiltersFormClick = function (evt) {
    var filter = evt.target.closest('.img-filters__button');
    if (filter && !filter.classList.contains(ACTIVE_CLASS)) {
      evt.preventDefault();
      updateFilter(filter);
    }
  };

  var showFilter = function () {
    var imgFilters = document.querySelector('.img-filters');
    imgFilters.classList.remove('img-filters--inactive');

    imgFiltersForm.addEventListener('click', onImgFiltersFormClick);
  };

  var imgFiltersForm = document.querySelector('.img-filters__form');

  return {
    showFilter: showFilter,
    filters: filters
  };
})();
