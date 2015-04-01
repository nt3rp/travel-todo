var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants     = require('../constants/AuthenticationConstants'),
    TravelersApi  = require('../api/TravelersApi'),
    AuthStore     = require('../stores/AuthenticationStore');

var TravelerActions = {
    getTravelers: function() {
        var user = AuthStore.getUser();
        TravelersApi.getTravelers(user.token);
    }
};

module.exports = TravelerActions;