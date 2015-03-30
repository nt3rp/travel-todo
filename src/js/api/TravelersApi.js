var Request           = require('browser-request'),
    ApiConstants      = require('../constants/ApiConstants'),
    TravelerConstants = require('../constants/TravelerConstants'),
    AppDispatcher     = require('../dispatcher/AppDispatcher');

var Path    = '/travelers',
    Timeout = 5000;     // 5 seconds

var onSuccess = function(travelers) {
    AppDispatcher.handleViewAction({
        actionType: TravelerConstants.TRAVELERS_FETCH,
        travelers: travelers
    });
};

var onError = function() {

};

// TODO: Remove unecessary prefixes
var TravelersApi = {
    getTravelers: function(token) {
        var options = {
            url:     ApiConstants.url + Path,
            timeout: Timeout,
            headers: {
                'Authorization': 'Token token=' + token
            }
        };

        Request(options, function(error, httpResponse, body) {
            var payload;

            if (error) {
                onError();
            } else if (httpResponse.status == 401) {
                onError();
            } else if (httpResponse.status == 200) {
                payload = JSON.parse(httpResponse.response);
                onSuccess(payload);
            }
        });
    },
    updateTraveler: function(traveler) {
        var options = {
            url:     ApiConstants.url + Path + '/' + traveler.id,
            method:  'POST',
            json:    true,
            timeout: Timeout,
            body:    JSON.stringify({'destinations': traveler.destinations}),
            headers: {
                'Authorization': 'Token token=' + traveler.token
            }
        };

        Request(options, function(error, httpResponse, body) {
            var payload;

            if (error) {
                onError();
            } else if (httpResponse.status == 401) {
                onError();
            } else if (httpResponse.status == 200) {
                payload = JSON.parse(httpResponse.response);
                onSuccess(payload);
            }
        });
    }
};

module.exports = TravelersApi;