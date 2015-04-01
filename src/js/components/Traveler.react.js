var React       = require('react'),
    Destination = require('./Destination.react'),
    LocationBar = require('./LocationBar.react'),
    AuthHelpers = require('../utils/AuthenticationHelpers');

var Traveler = React.createClass({
    render: function() {
        var traveler = this.props.traveler,
            destinations = [],
            destination, i,
            locationBar;

        for (i = 0; i < traveler.destinations.length; i++) {
            destination = traveler.destinations[i];

            // TODO: Destination is a part of traveler... changing it should change the traveler
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
                <div class="panel-collapse collapse in">
                    <div class="panel-body">
                        <ul className='list-group marginless'>
                            {destinations}
                        </ul>
                    </div>
                </div>
                {locationBar}
            </div>
        )
    }
});

module.exports = Traveler;