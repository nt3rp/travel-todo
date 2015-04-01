var EventEmitter = require('events').EventEmitter,
    assign = require('object-assign'),
    AppDispatcher = require('../dispatcher/AppDispatcher'),
    AuthConstants = require('../constants/AuthenticationConstants');

var user = null;

var AuthenticationStore = assign({}, EventEmitter.prototype, {
    emitChange: function (event) {
        this.emit(event);
    },

    addChangeListener: function (event, callback) {
        this.on(event, callback);
    },

    removeChangeListener: function (event, callback) {
        this.removeListener(event, callback);
    },

    getUser: function () {
        return user;
    },

    dispatchToken: AppDispatcher.register(function (payload) {
        var action = payload.action;

        switch (action.actionType) {
            case AuthConstants.AUTHENTICATION_LOGIN:
                user = action.user;
                AuthenticationStore.emitChange(action.actionType);
                break;
            case AuthConstants.AUTHENTICATION_LOGOUT:
                user = null;
                AuthenticationStore.emitChange(action.actionType);
                break;
            case AuthConstants.AUTHENTICATION_ERROR:
                user = null;
                AuthenticationStore.emitChange(action.actionType);
                break;
        }

        return true;
    })
});

module.exports = AuthenticationStore;