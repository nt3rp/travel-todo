var React = require('react'),
    AuthStore = require('../stores/AuthenticationStore');

var AuthenticationHelpers = {
    requiresAuthentication: {
        statics: {
            willTransitionTo: function (transition) {
                if (!AuthStore.getUser()) {
                    transition.redirect('/');
                }
            }
        }
    },

    canModifyTraveler: function (traveler, user) {
        user = user || AuthStore.getUser() || {};
        traveler = traveler || {};

        return (user.id === traveler.id)
    }
};

module.exports = AuthenticationHelpers;