var React              = require('react'),
    DestinationActions = require('../actions/DestinationActions');

var Destination = React.createClass({
    render: function() {
        var destination = this.props.destination;

        return (
            <li className='list-group-item borderless'>
                <label className='checkbox-inline'>
                    <input
                        type='checkbox'
                        checked={destination.visited}
                        onChange={this.toggleVisited}
                    />
                    {destination.name}
                </label>
                <span className='pull-right'>
                    <button className="btn btn-xs btn-warning" onClick={this.destroyDestination}>
                        <span className="glyphicon glyphicon-trash"></span>
                    </button>
                </span>
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