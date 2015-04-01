var React = require('react'),
    DestinationActions = require('../actions/DestinationActions');

var ENTER_KEY_CODE = 13;

var LocationBar = React.createClass({
    render: function() {
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
        DestinationActions.create(this.props.traveler, name);
    }
});

module.exports = LocationBar;