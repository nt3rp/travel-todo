var assign            = require('object-assign'),
    EventEmitter      = require('events').EventEmitter,
    Dispatcher        = require('../dispatcher/AppDispatcher.js'),
    TravelerConstants = require('../constants/TravelerConstants'),
    _                 = require('lodash');

/*
 Seems like there are going to be some weird dependencies between TravellerStore and Destinations...
 ... The user is not really able to take actions on a user, but they can take actions on a destination

 ... But destinations are attached to travellers :/

 ... I guess editing a destination (in the view) will...
 - Trigger an action that...
 - Is dispatched to the TravellerStore, which...
 - Fires an action to the DestinationStore? That doesn't sound right... Try again

 When a destination is edited:
 - Action is triggered, which goes out to the API to patch
 - ... Oh, maybe we don't need a destination store. Maybe we just need destination actions.
 */

var travelers = {};

// TODO: How to do away with the boilerplate here?
var TravelerStore = assign({}, EventEmitter.prototype, {
    emitChange: function(event) {
        this.emit(event);
    },

    addChangeListener: function(event, callback) {
        this.on(event, callback);
    },

    removeChangeListener: function(event, callback) {
        this.removeListener(event, callback);
    },

    // TODO: Check if we have a user before taking any actions
    dispatchToken: Dispatcher.register(function(payload) {
        var action = payload.action;

        switch (action.actionType) {
            case TravelerConstants.TRAVELERS_FETCH:
                travelers = _.reduce(action.travelers, function(obj, val) {
                    obj[val.id] = val;
                    return obj;
                }, {});
                TravelerStore.emitChange(TravelerConstants.TRAVELERS_CHANGE);
                break;
            case TravelerConstants.TRAVELERS_UPDATE:
                var updatedTraveler  = action.travelers[0],
                    existingTraveler = travelers[updatedTraveler.id],
                    destinations;

                // Handle bug where backend returns a set of destinations that is `null`
                updatedTraveler.destinations = updatedTraveler.destinations || [];
                travelers[updatedTraveler.id] = _.merge(existingTraveler, updatedTraveler);

                TravelerStore.emitChange(TravelerConstants.TRAVELERS_CHANGE);
                break;
        }

        return true;
    }),

    getTravelers: function() {
        return _.values(travelers);
    },

    getTraveler: function(id) {
        return travelers[id];
    }
});

module.exports = TravelerStore;