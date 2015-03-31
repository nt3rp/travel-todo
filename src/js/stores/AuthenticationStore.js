var EventEmitter  = require('events').EventEmitter,
    assign        = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AuthConstants = require('../constants/AuthenticationConstants');

var user = null;

// TODO: Remove boilerplate
var AuthenticationStore = assign({}, EventEmitter.prototype, {
    emitChange: function(event) {
        this.emit(event);
    },

    addChangeListener: function(event, callback) {
        this.on(event, callback);
    },

    removeChangeListener: function(event, callback) {
        this.removeListener(event, callback);
    },

    getUser: function() {
        return user;
    },

    dispatchToken: AppDispatcher.register(function(payload) {
        var action = payload.action;

        switch (action.actionType) {
            case AuthConstants.AUTHENTICATION_LOGIN:
                user = action.user;
                AuthenticationStore.emitChange(AuthConstants.AUTHENTICATION_CHANGE);
                break;
            case AuthConstants.AUTHENTICATION_LOGOUT:
                user = null;
                AuthenticationStore.emitChange(AuthConstants.AUTHENTICATION_CHANGE);
                break;
        }

        return true;
    })
});

module.exports = AuthenticationStore;