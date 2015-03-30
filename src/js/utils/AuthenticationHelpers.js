var React     = require('react'),
    AuthStore = require('../stores/AuthenticationStore');

var AuthenticationHelpers = {
    requiresAuthentication: {
        statics: {
            willTransitionTo: function (transition) {
                var nextPath = transition.path;
                if (!AuthStore.getUser()) {
                    transition.redirect('/');
                }
            }
        }
    }
};

module.exports = AuthenticationHelpers;