var AppDispatcher = require('../dispatcher/AppDispatcher'),
    TravelerApi   = require('../api/TravelersApi'),
    AuthStore     = require('../stores/AuthenticationStore'),
    AuthHelpers   = require('../utils/AuthenticationHelpers'),
    _             = require('lodash');

var DestinationActions = {
    create          :  function(traveler, destination) {},
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
            index;

        if(!AuthHelpers.canModifyTraveler(traveler, user)) {
            return;
        }

        destination.visited = !destination.visited;

        index = _.findIndex(traveler.destinations, {'name': destination.name});
        traveler.destinations[index] = destination;

        TravelerApi.updateTraveler(user.token, traveler);
    }
};

module.exports = DestinationActions;