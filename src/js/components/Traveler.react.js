var React       = require('react'),
    Destination = require('./Destination.react');

var Traveler = React.createClass({
    render: function() {
        var traveler = this.props.traveler,
            destinations = [],
            destination, i;

        for (i = 0; i < traveler.destinations.length; i++) {
            destination = traveler.destinations[i];

            // TODO: Destination is a part of traveler... changing it should change the traveler
            destinations.push(<Destination key={destination.name} traveler={traveler} destination={destination}/>);
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
            </div>
        )
    }
});

module.exports = Traveler;