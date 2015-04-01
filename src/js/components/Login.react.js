var React           = require('react'),
    AuthActions     = require('../actions/AuthenticationActions');

var ENTER_KEY_CODE = 13;

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
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
    }
});

module.exports = Login;