var React = require('react');

var Alert = React.createClass({
    render: function() {
        return (
            <div className="alert alert-danger">
                <span className="glyphicon glyphicon-alert" aria-hidden="true"></span>
                &nbsp;{this.props.message}
                <button className='btn btn-default' onClick={this.dismiss}>
                    <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
                </button>
            </div>
        );
    },

    dismiss: function() {
        this.props.dismiss();
    }
});

module.exports = Alert;