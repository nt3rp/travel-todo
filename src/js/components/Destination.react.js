var React              = require('react'),
    DestinationActions = require('../actions/DestinationActions');

var Destination = React.createClass({
    render: function() {
        var destination = this.props.destination;

        return (
            <li className='list-group-item borderless'>
                <input
                    type='checkbox'
                    checked={destination.visited}
                    onChange={this._onChange}
                />
                {destination.name}
            </li>
        )
    },

    _onChange: function() {
        DestinationActions.toggleVisited(this.props.traveler, this.props.destination);
    }
});

module.exports = Destination;