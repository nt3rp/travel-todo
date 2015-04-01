var React = require('react'),
    DestinationActions = require('../actions/DestinationActions'),
    TravelersStore     = require('../stores/TravelerStore'),
    TravelersConstants = require('../constants/TravelerConstants');

var ENTER_KEY_CODE = 13;

var LocationBar = React.createClass({
    getInitialState: function() {
        return {
            inProgress: false
        }
    },

    componentDidMount: function() {
        TravelersStore.addChangeListener(TravelersConstants.TRAVELERS_CHANGE, this.onTravelerUpdate);
    },

    componentWillUnmount: function() {
        TravelersStore.removeChangeListener(TravelersConstants.TRAVELERS_CHANGE, this.onTravelerUpdate);
    },

    render: function() {
        var disabled;

        if (this.state.inProgress) {
            disabled="disabled";
        }

        return (
            <div className='form-inline'>
                <div className='form-group'>
                    <label htmlFor='new-location'
                    >
                        New Location:
                    </label>
                    <input
                        id='new-location'
                        name='new-location'
                        className='form-control'
                        type='text'
                        onKeyDown={this._onKeyDown}
                        disabled={disabled}
                    />
                </div>
            </div>
        )
    },

    _onKeyDown: function(event) {
        if (event.keyCode === ENTER_KEY_CODE) {
            this.addLocation(event.target.value);
        }
    },

    addLocation: function(name) {
        this.setState({
            inProgress: true
        });
        DestinationActions.create(this.props.traveler, name);
    },

    onTravelerUpdate: function() {
        this.setState({
            inProgress: false
        });
    }
});

module.exports = LocationBar;