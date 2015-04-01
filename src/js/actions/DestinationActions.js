var AppDispatcher = require('../dispatcher/AppDispatcher'),
    TravelerApi   = require('../api/TravelersApi'),
    AuthStore     = require('../stores/AuthenticationStore'),
    AuthHelpers   = require('../utils/AuthenticationHelpers'),
    _             = require('lodash');

var DestinationActions = {
    create          :  function(traveler, destinationName) {
        var user = AuthStore.getUser(),
            existingDestination;

        if(!AuthHelpers.canModifyTraveler(traveler, user)) {
            return;
        }

        existingDestination = _.find(traveler.destinations, {'name': destinationName});
        if (existingDestination) {
            return;
        }

        traveler.destinations.push({'name': destinationName, visited: false});

        TravelerApi.updateTraveler(user.token, traveler);
    },
    destroy         : function(traveler, destination) {
        var user = AuthStore.getUser();

        if(!AuthHelpers.canModifyTraveler(traveler, user)) {
            return;
        }

        _.remove(traveler.destinations, {'name': destination.name});

        TravelerApi.updateTraveler(user.token, traveler);
    },
    toggleVisited: function(traveler, destination) {
        // Cross cutting concern / mixin: current user?
        var user = AuthStore.getUser(),
            existingDestination;

        if(!AuthHelpers.canModifyTraveler(traveler, user)) {
            return;
        }

        existingDestination = _.find(traveler.destinations, {'name': destination.name});
        if (!existingDestination) {
            return;
        }

        existingDestination.visited = !destination.visited;

        TravelerApi.updateTraveler(user.token, traveler);
    }
};

module.exports = DestinationActions;