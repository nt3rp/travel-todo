var assign     = require('object-assign'),
    Dispatcher = require('flux').Dispatcher,
    Sources    = require('../constants/DispatcherConstants.js');

var AppDispatcher = assign(new Dispatcher(), {
    handleAction: function(source, action) {
        var payload = {
            source: source,
            action: action
        };
        this.dispatch(payload);
    },

    handleServerAction: function(action) {
        this.handleAction(Sources.SERVER_ACTION, action);
    },

    handleViewAction: function(action) {
        this.handleAction(Sources.VIEW_ACTION, action);
    }
});

module.exports = AppDispatcher;