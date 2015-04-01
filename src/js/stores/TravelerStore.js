var assign = require('object-assign'),
    EventEmitter = require('events').EventEmitter,
    Dispatcher = require('../dispatcher/AppDispatcher.js'),
    TravelerConstants = require('../constants/TravelerConstants'),
    _ = require('lodash');

var travelers = {};

var TravelerStore = assign({}, EventEmitter.prototype, {
    emitChange: function (event) {
        this.emit(event);
    },

    addChangeListener: function (event, callback) {
        this.on(event, callback);
    },

    removeChangeListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    dispatchToken: Dispatcher.register(function (payload) {
        var action = payload.action;

        switch (action.actionType) {
            case TravelerConstants.TRAVELERS_FETCH:
                travelers = _.reduce(action.travelers, function (obj, val) {
                    obj[val.id] = val;
                    return obj;
                }, {});
                TravelerStore.emitChange(TravelerConstants.TRAVELERS_CHANGE);
                break;
            case TravelerConstants.TRAVELERS_UPDATE:
                var updatedTraveler = action.travelers[0],
                    existingTraveler = travelers[updatedTraveler.id];

                // Handle bug where backend returns a set of destinations that is `null`
                updatedTraveler.destinations = updatedTraveler.destinations || [];
                travelers[updatedTraveler.id] = _.merge(existingTraveler, updatedTraveler);

                TravelerStore.emitChange(TravelerConstants.TRAVELERS_CHANGE);
                break;
        }

        return true;
    }),

    getTravelers: function () {
        return _.values(travelers);
    },

    getTraveler: function (id) {
        return travelers[id];
    }
});

module.exports = TravelerStore;