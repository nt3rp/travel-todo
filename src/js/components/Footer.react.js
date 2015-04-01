var React = require('react');

var Footer = React.createClass({
    render: function () {
        return (
            <footer id='footer'>
                <div className='container-fluid'>
                    <p className='pull-right'>&copy; Nicholas Terwoord</p>
                </div>
            </footer>
        )
    }
});

module.exports = Footer;