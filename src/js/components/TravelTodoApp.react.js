var React = require('react'),
    Router = require('react-router'),
    Header = require('./Header.react'),
    Footer = require('./Footer.react'),
    AuthStore = require('../stores/AuthenticationStore');
    AuthConstants = require('../constants/AuthenticationConstants');

var TravelTodoApp = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },

    // TODO: Is there a way to just listen to any events? Then we could just call an `onAuthChange` method instead of
    // having two silly methods (i.e. `onLogin` and `onLogout`
    componentDidMount: function() {
        AuthStore.addChangeListener(AuthConstants.AUTHENTICATION_LOGOUT, this.onLogout);
        AuthStore.addChangeListener(AuthConstants.AUTHENTICATION_LOGIN, this.onLogin);
    },

    componentWillUnmount: function() {
        AuthStore.removeChangeListener(AuthConstants.AUTHENTICATION_LOGOUT, this.onLogout);
        AuthStore.removeChangeListener(AuthConstants.AUTHENTICATION_LOGIN, this.onLogin);
    },

    render: function() {
        return (
            <section id='container'>
                <Header />
                <section id='content' className='container-fluid'>
                    <Router.RouteHandler />
                </section>
                <Footer />
            </section>
        )
    },

    onLogin: function() {
        this.transitionTo('travelers');
    },

    onLogout: function() {
        this.transitionTo('login');
    },

    transitionTo: function(pageName) {
        this.context.router.transitionTo(pageName);
    }
});

module.exports = TravelTodoApp;