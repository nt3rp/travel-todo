var React = require('react'),
    Destination = require('./Destination.react'),
    LocationBar = require('./LocationBar.react'),
    AuthHelpers = require('../utils/AuthenticationHelpers');

var Traveler = React.createClass({
    render: function () {
        var traveler = this.props.traveler,
            destinations = [],
            destination, i,
            locationBar;

        for (i = 0; i < traveler.destinations.length; i++) {
            destination = traveler.destinations[i];
            destinations.push(<Destination key={destination.name} traveler={traveler} destination={destination}/>);
        }

        if (AuthHelpers.canModifyTraveler(traveler)) {
            locationBar = (
                <div className="panel-footer">
                    <LocationBar traveler={traveler}/>
                </div>
            );
        }

        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <h4 className='panel-title uppercase'>
                        {traveler.name}
                    </h4>
                </div>
                <ul className='list-group marginless'>
                    {destinations}
                </ul>
                {locationBar}
            </div>
        )
    }
});

module.exports = Traveler;