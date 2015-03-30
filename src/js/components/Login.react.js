var React           = require('react'),
    AuthActions     = require('../actions/AuthenticationActions'),
    TravelerActions = require('../actions/TravelerActions'),
    AuthStore       = require('../stores/AuthenticationStore'),
    AuthConstants   = require('../constants/AuthenticationConstants');

var ENTER_KEY_CODE = 13;

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    componentDidMount: function() {
        AuthStore.addChangeListener(AuthConstants.AUTHENTICATION_CHANGE, this._onChange);
    },

    componentWillUnmount: function() {
        AuthStore.removeChangeListener(AuthConstants.AUTHENTICATION_CHANGE, this._onChange);
    },

    render: function() {
        return (
            <div className='form-inline'>
                <div className='form-group'>
                    <label
                        htmlFor='username'
                        className='label-login'
                    >
                        Username:
                    </label>
                    <input
                        id='username'
                        name='username'
                        className='form-control'
                        type='text'
                        placeholder='e.g. amos, andy, evie'
                        onKeyDown={this._onKeyDown}
                    />
                </div>
            </div>
        )
    },

    login: function(username) {
        AuthActions.login(username);
    },

    // TODO: Rename?
    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.login(event.target.value);
        }
    },

    // TODO: Rename?
    _onChange: function() {
        var user = AuthStore.getUser();
        if (user) {
            // TODO: Should find a way to wait for us to get travellers before transitioning...
            // Also, why does the login view control what happens next. That seems weird.
            TravelerActions.getTravelers(user.token);
            this.context.router.transitionTo('travelers');
        }
    }

    /*
    What we want to happen:
    - User presses login:
        - 'login' action happens
        - action is dispatched
        - store trigger 'auth change'
        - view says 'time to transition!'

    ... but now, small problem.

    Wait. No. When you visit the Travelers page, just do stuff.

    ... Unless you meant that you should set some state on the travellers page?

    Oh, I see. The problem is, the travellers store will start off empty.
    We want to go fetch travellers after we successfully login.

    So *something* needs to populate the travellersStore before we transition.

    Something something waitFor?

    (Api) <-> Action

    Action -> Dispatcher -> Store -> View -> Action ...

    I guess if the view knows we've logged in, we could trigger an action to populate the travellers list?
    That seems a bit weird...
     */
});

module.exports = Login;