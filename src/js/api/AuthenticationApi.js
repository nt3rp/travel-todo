var Request       = require('browser-request'),
    ApiConstants  = require('../constants/ApiConstants'),
    AuthConstants = require('../constants/AuthenticationConstants'),
    AppDispatcher = require('../dispatcher/AppDispatcher');

var Path    = '/auth',
    Timeout = 5000;     // 5 seconds

var onSuccess = function(user) {
    AppDispatcher.handleViewAction({
        actionType: AuthConstants.AUTHENTICATION_LOGIN,
        user: user
    });
};

var onError = function() {

};

var AuthenticationApi = {
    login: function(username) {
        var options = {
            url:     ApiConstants.url + Path,
            method:  'POST',
            json:    true,
            timeout: Timeout,
            body:    JSON.stringify({'name': username})
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

module.exports = AuthenticationApi;