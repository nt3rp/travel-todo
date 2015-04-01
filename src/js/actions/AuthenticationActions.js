var AppDispatcher = require('../dispatcher/AppDispatcher'),
    Constants = require('../constants/AuthenticationConstants'),
    AuthenticationApi = require('../api/AuthenticationApi');

var AuthenticationActions = {
    login: function (username) {
        AuthenticationApi.login(username);
    },

    logout: function (username) {
        AppDispatcher.handleViewAction({
            actionType: Constants.AUTHENTICATION_LOGOUT,
            username: username
        });
    }
};

module.exports = AuthenticationActions;