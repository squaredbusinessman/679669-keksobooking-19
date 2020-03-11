'use strict';

(function () {
  var priceMap = {
    'low': {
      start: 0,
      end: 1000
    },
    'middle': {
      start: 10000,
      end: 50000
    },
    'high': {
      start: 50000,
      end: Infinity
    }
  };

  var filterRules = {
    'housing-type': function (data, filter) {
      return data.offer.type === filter.value;
    },
    'housing-price': function (data, filter) {
      return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
    },
    'housing-rooms': function (data, filter) {
      return filter.value === data.offer.rooms.toString();
    },
    'housing-guests': function (data, filter) {
      return filter.value === data.offer.guests.toString();
    },
    'housing-features': function (data, filter) {
      var checkedElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));

      return checkedElements.every(function (it) {
        return data.offer.features.some(function (feature) {
          return feature === it.value;
        });
      });
    }
  };

  var getFilterData = function (data, elements) {
    return data.filter(function (item) {
      return elements.every(function (filter) {
        return filter.value === 'any' ? true : filterRules[filter.id](item, filter);
      });
    });
  };

  var resetFilter = function () {
    window.data.formFiltersElement.reset();
  };

  var formFiltersChangeHandler = function () {
    var filterElements = [];
    filterElements = Array.from(window.data.formFiltersElement.children);
    window.card.remove();
    window.pin.remove();
    var filteredData = getFilterData(window.data.cache, filterElements);
    window.pin.render(filteredData);
  };

  window.filter = {
    formFiltersChangeHandler: formFiltersChangeHandler,
    reset: resetFilter
  };
})();
