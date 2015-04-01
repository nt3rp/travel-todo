var React              = require('react'),
    DestinationActions = require('../actions/DestinationActions'),
    AuthHelpers = require('../utils/AuthenticationHelpers'),
    classNames  = require('classnames');

var Destination = React.createClass({
    render: function() {
        var destination = this.props.destination,
            canModifyDestination = AuthHelpers.canModifyTraveler(this.props.traveler),
            deleteButton, itemClasses, labelClasses, disabled;

        itemClasses = classNames({
            'list-group-item': true,
            'borderless': true,
            'disabled': !canModifyDestination
        });

        labelClasses = classNames({
            'checkbox-inline': true,
            'disabled': !canModifyDestination
        });

        if (canModifyDestination) {
            deleteButton = (
                <span className='pull-right'>
                    <button className="btn btn-xs btn-warning" onClick={this.destroyDestination}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </span>
            );
        } else {
            disabled = "disabled";
        }

        return (
            <li className={itemClasses}>
                <label className={labelClasses}>
                    <input
                        type='checkbox'
                        checked={destination.visited}
                        onChange={this.toggleVisited}
                        disabled={disabled}
                    />
                    {destination.name}
                </label>
                {deleteButton}
            </li>
        )
    },

    toggleVisited: function() {
        DestinationActions.toggleVisited(this.props.traveler, this.props.destination);
    },

    destroyDestination: function() {
        DestinationActions.destroy(this.props.traveler, this.props.destination);
    }
});

module.exports = Destination;