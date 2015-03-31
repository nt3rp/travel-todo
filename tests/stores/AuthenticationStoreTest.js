var Root = '../../src/js';
jest.dontMock(Root + '/stores/AuthenticationStore');

describe('AuthenticationStore', function() {
    var AppDispatcher,
        AuthenticationStore,
        callback,
        exampleActions;

    exampleActions = {
        login: {
            source: 'irrelevant, for the moment',
            action: {
                actionType: 'AUTHENTICATION_LOGIN',
                user: {
                    id: 1,
                    name: 'Bob',
                    token: 'SOME_TOKEN'
                }
            }
        },
        logout: {
            source: 'irrelevant, for the moment',
            action: {
                actionType: 'AUTHENTICATION_LOGOUT'
            }
        }
    };

    beforeEach(function() {
        AppDispatcher = require(Root + '/dispatcher/AppDispatcher');
        AuthenticationStore = require(Root + '/stores/AuthenticationStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initializes with no authenticated user', function() {
        var user = AuthenticationStore.getUser();
        expect(user).toBe(null);
    });

    it('handles a user logging in', function() {
        var user;

        callback(exampleActions.login);
        user = AuthenticationStore.getUser();

        expect(user).toEqual(exampleActions.login.action.user);
    });

    it('handles a user logging out', function() {
        var user;

        callback(exampleActions.logout);
        user = AuthenticationStore.getUser();

        expect(user).toBe(null);
    });
});