var React = require('react'),
    TravelersStore = require('../stores/TravelerStore'),
    TravelersConstants = require('../constants/TravelerConstants'),
    AuthHelpers = require('../utils/AuthenticationHelpers'),
    Traveler = require('./Traveler.react.js'),
    TravelerActions = require('../actions/TravelerActions');

var TravelersList = React.createClass({
    mixins: [AuthHelpers.requiresAuthentication],

    getInitialState: function () {
        return {
            travelers: TravelersStore.getTravelers()
        }
    },

    componentDidMount: function () {
        TravelerActions.getTravelers();
        TravelersStore.addChangeListener(TravelersConstants.TRAVELERS_CHANGE, this.onTravelersChange);
    },

    componentWillUnmount: function () {
        TravelersStore.removeChangeListener(TravelersConstants.TRAVELERS_CHANGE, this.onTravelersChange);
    },

    render: function () {
        var travelers = [],
            traveler,
            i;

        for (i = 0; i < this.state.travelers.length; i++) {
            traveler = this.state.travelers[i];
            travelers.push(<Traveler key={traveler.id} traveler={traveler}/>);
        }

        return (
            <div className='panel-group'>
                {travelers}
            </div>
        )
    },

    onTravelersChange: function () {
        this.setState({travelers: TravelersStore.getTravelers()});
    }
});

module.exports = TravelersList;