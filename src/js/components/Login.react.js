var React = require('react'),
    AuthActions = require('../actions/AuthenticationActions'),
    AuthStore = require('../stores/AuthenticationStore'),
    AuthConstants = require('../constants/AuthenticationConstants');

var ENTER_KEY_CODE = 13;

var Login = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    getInitialState: function () {
        return {
            inProgress: false
        }
    },

    componentDidMount: function () {
        AuthStore.addChangeListener(AuthConstants.AUTHENTICATION_ERROR, this.onError);
    },

    componentWillUnmount: function () {
        AuthStore.removeChangeListener(AuthConstants.AUTHENTICATION_ERROR, this.onError);
    },

    render: function () {
        var disabled;

        if (this.state.inProgress) {
            disabled = "disabled";
        }

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
                        disabled={disabled}
                        onKeyDown={this.onKeyDown}
                    />
                </div>
            </div>
        )
    },

    onError: function () {
        this.setState({
            inProgress: false
        })
    },

    login: function (username) {
        this.setState({
            inProgress: true
        });
        AuthActions.login(username);
    },

    onKeyDown: function (event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.login(event.target.value);
        }
    }
});

module.exports = Login;