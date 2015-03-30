var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../constants/AuthenticationConstants'),
    TravelersApi  = require('../api/TravelersApi');

var TravelerActions = {
    getTravelers: function(token) {
        TravelersApi.getTravelers(token);
    }
};

module.exports = TravelerActions;