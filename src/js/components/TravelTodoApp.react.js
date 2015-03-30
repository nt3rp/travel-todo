var React = require('react'),
    Router = require('react-router'),
    Header = require('./Header.react'),
    Footer = require('./Footer.react');

var TravelTodoApp = React.createClass({
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
    }
});

module.exports = TravelTodoApp;