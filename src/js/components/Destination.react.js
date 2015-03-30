var React              = require('react'),
    DestinationActions = require('../actions/DestinationActions');

var Destination = React.createClass({
    render: function() {
        var name    = this.props.data.name,
            visited = this.props.data.visited;

        return (
            <li className='list-group-item borderless'>
                <input type='checkbox' checked={visited} onChange={this._onChange}/>
                {name}
            </li>
        )
    },

    _onChange: function(event) {
        // TODO: Get parent components id from props / state?
        DestinationActions.changeVisitState(event.target.value);
    }
});

module.exports = Destination;