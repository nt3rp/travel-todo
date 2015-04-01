var React     = require('react'),
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

    hasAccess: function(user, traveler) {
        user = user || {};
        traveler = traveler || {};

        return (user.id === traveler.id)
    }
};

module.exports = AuthenticationHelpers;