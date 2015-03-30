var React = require('react'),
    Router = require('react-router');

var TravelTodoApp = React.createClass({
    render: function() {
        return (
            <section id="container">
                <section id='header'>Header</section>
                <section id='content'>
                    <Router.RouteHandler />
                </section>
                <section id='footer'>Footer</section>
            </section>
        )
    }
});

module.exports = TravelTodoApp;