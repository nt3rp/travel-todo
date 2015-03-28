var React         = require('react'),
    Router        = require('react-router'),
    Route         = Router.Route,
    DefaultRoute  = Router.DefaultRoute,
    TravelTodoApp = require('./components/TravelTodoApp.react'),
    Login         = require('./components/Login.react'),
    Travelers     = require('./components/TravelersList.react.js');

var routes = (
    <Route name='home' path='/' handler={TravelTodoApp}>
        <DefaultRoute name='login' handler={Login} />
        <Route name='travellers' handler={Travelers} />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler />, document.body);
});