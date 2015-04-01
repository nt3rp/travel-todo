var React = require('react'),
    AuthStore = require('../stores/AuthenticationStore'),
    AuthActions = require('../actions/AuthenticationActions');

var Header = React.createClass({
    render: function () {
        var button;

        if (AuthStore.getUser()) {
            button = (
                <button
                    className='btn btn-default navbar-btn margin-right-small'
                    onClick={this.logout}>
                    Logout
                </button>
            );
        }

        return (
            <nav id='header' className='navbar navbar-inverse navbar-fixed-top'>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Travel-ToDo</a>
                    </div>
                    <div className="navbar-right">
                        {button}
                    </div>
                </div>
            </nav>
        )
    },

    logout: function () {
        AuthActions.logout();
    }
});

module.exports = Header;