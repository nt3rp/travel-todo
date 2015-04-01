var React = require('react'),
    DestinationActions = require('../actions/DestinationActions'),
    AuthHelpers = require('../utils/AuthenticationHelpers'),
    TravelersStore = require('../stores/TravelerStore'),
    TravelersConstants = require('../constants/TravelerConstants'),
    classNames = require('classnames');

var Destination = React.createClass({
    getInitialState: function () {
        return {
            inProgress: false
        }
    },

    componentDidMount: function () {
        TravelersStore.addChangeListener(TravelersConstants.TRAVELERS_CHANGE, this.onTravelerUpdate);
        TravelersStore.addChangeListener(TravelersConstants.TRAVELERS_ERROR, this.onTravelerUpdate);
    },

    componentWillUnmount: function () {
        TravelersStore.removeChangeListener(TravelersConstants.TRAVELERS_CHANGE, this.onTravelerUpdate);
        TravelersStore.removeChangeListener(TravelersConstants.TRAVELERS_ERROR, this.onTravelerUpdate);
    },

    render: function () {
        var destination = this.props.destination,
            canModifyDestination = AuthHelpers.canModifyTraveler(this.props.traveler),
            deleteButton, itemClasses, labelClasses, disabled;

        itemClasses = classNames({
            'list-group-item': true,
            'borderless': true,
            'disabled': !canModifyDestination || this.state.inProgress
        });

        labelClasses = classNames({
            'checkbox-inline': true,
            'disabled': !canModifyDestination || this.state.inProgress
        });

        if (canModifyDestination) {
            deleteButton = (
                <span className='pull-right'>
                    <button className="btn btn-xs btn-warning" onClick={this.destroyDestination}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </span>
            );
        }

        if (!canModifyDestination || this.state.inProgress) {
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

    toggleVisited: function () {
        this.setState({
            inProgress: true
        });
        DestinationActions.toggleVisited(this.props.traveler, this.props.destination);
    },

    destroyDestination: function () {
        // No need to change state to indicate this is no longer in progress; it won't exist anymore!
        DestinationActions.destroy(this.props.traveler, this.props.destination);
    },

    onTravelerUpdate: function () {
        this.setState({
            inProgress: false
        });
    }
});

module.exports = Destination;