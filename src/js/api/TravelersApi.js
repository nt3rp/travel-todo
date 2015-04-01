var Request = require('browser-request'),
    ApiConstants = require('../constants/ApiConstants'),
    TravelerConstants = require('../constants/TravelerConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

var Path = '/travelers',
    Timeout = 5000;     // 5 seconds

// TODO: Remove unecessary prefixes
var TravelersApi = {
    getTravelers: function (token) {
        var options = {
            url: ApiConstants.url + Path,
            timeout: Timeout,
            headers: {
                'Authorization': 'Token token=' + token
            }
        };

        Request(options, function (error, httpResponse, body) {
            var payload;

            if (httpResponse.status == 200) {
                payload = JSON.parse(httpResponse.response);
                AppDispatcher.handleViewAction({
                    actionType: TravelerConstants.TRAVELERS_FETCH,
                    travelers: payload
                });
            } else {
                AppDispatcher.handleViewAction({
                    actionType: TravelerConstants.TRAVELERS_ERROR,
                    travelers: payload
                });
            }
        });
    },

    updateTraveler: function (token, traveler) {
        var options = {
            url: ApiConstants.url + Path + '/' + traveler.id,
            method: 'PATCH',
            json: true,
            timeout: Timeout,
            body: JSON.stringify({'destinations': traveler.destinations}),
            headers: {
                'Authorization': 'Token token=' + token
            }
        };

        Request(options, function (error, httpResponse, body) {
            var payload;

            if (httpResponse.status == 200) {
                payload = JSON.parse(httpResponse.response);
                AppDispatcher.handleViewAction({
                    actionType: TravelerConstants.TRAVELERS_UPDATE,
                    travelers: [payload]
                });
            } else {
                AppDispatcher.handleViewAction({
                    actionType: TravelerConstants.TRAVELERS_ERROR,
                    travelers: payload
                });
            }
        });
    }
};

module.exports = TravelersApi;