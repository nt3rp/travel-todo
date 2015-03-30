var React = require('react');

var Header = React.createClass({
    render: function() {
        return (
            <nav id='header' className='navbar navbar-inverse navbar-fixed-top'>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Travel-ToDo</a>
                    </div>
                </div>
            </nav>
        )
    }
});

module.exports = Header;