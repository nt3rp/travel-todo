var React              = require('react'),
    TravelersStore     = require('../stores/TravelerStore'),
    TravelersConstants = require('../constants/TravelerConstants'),
    Traveler           = require('./Traveler.react.js');

var TravelersList = React.createClass({
    getInitialState: function() {
        return {
            travelers: TravelersStore.getTravelers()
        }
    },

    componentDidMount: function() {
        TravelersStore.addChangeListener(TravelersConstants.TRAVELERS_CHANGE, this._onChange);
    },

    componentWillUnmount: function() {
        TravelersStore.removeChangeListener(TravelersConstants.TRAVELERS_CHANGE, this._onChange);
    },

    render: function() {
        var travelers = [],
            traveler,
            i;

        for (i=0; i < this.state.travelers.length; i++) {
            traveler = this.state.travelers[i];
            travelers.push(<Traveler key={traveler.id} data={traveler}/>);
        }

        return (
            <div className='panel-group'>
                {travelers}
            </div>
        )
    },

    _onChange: function () {
        this.setState({travelers: TravelersStore.getTravelers()});
    }
});

module.exports = TravelersList;