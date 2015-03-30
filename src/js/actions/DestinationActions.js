var AppDispatcher = require('../dispatcher/AppDispatcher'),
    TravelerApi   = require('../api/TravelersApi'),
    AuthStore     = require('../stores/AuthenticationStore'),
    _             = require('lodash');

var DestinationActions = {
    create          :  function(traveler, destination) {},
    destroy         : function(traveler, destination) {},
    toggleVisited: function(traveler, destination) {
        // Cross cutting concern / mixin: current user?
        var user = AuthStore.getUser(),
            token, index;

        if(user.id !== traveler.id) {
            return;
        }

        token = user.token;
        destination.visited = !destination.visited;

        index = _.findIndex(traveler.destinations, {'name': destination.name});
        traveler.destinations[index] = destination;

        TravelerApi.updateTraveler(token, traveler);
    }
};

module.exports = DestinationActions;