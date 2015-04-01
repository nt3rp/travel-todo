var Root   = '../../src/js',
    assign = require('object-assign');

jest.dontMock(Root + '/stores/TravelerStore');

describe('TravelerStore', function() {
    var AppDispatcher,
        TravelerStore,
        callback,
        exampleActions;

    exampleActions = {
        fetch: {
            source: 'irrelevant, for the moment',
            action: {
                actionType: 'TRAVELERS_FETCH',
                travelers: [{
                    id: 1,
                    name: 'Bob',
                    destinations: [{name: 'Anywhere USA', visited: true}]
                }, {
                    id: 2,
                    name: 'Alice',
                    destinations: [{name: 'Nowhere', visited: false}]
                }]
            }
        },
        update: {
            source: 'irrelevant, for the moment',
            action: {
                actionType: 'TRAVELERS_UPDATE',
                travelers: [{
                    id: 1,
                    destinations: [{name: 'Anywhere USA', visited: false}]
                }]
            }
        }
    };

    beforeEach(function() {
        AppDispatcher = require(Root + '/dispatcher/AppDispatcher');
        TravelerStore = require(Root + '/stores/TravelerStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('initializes with no travelers', function() {
        var travelers = TravelerStore.getTravelers();
        expect(travelers).toEqual([]);
    });

    it('will not retrieve travelers who are not in the system', function() {
        var travelers = TravelerStore.getTraveler(1);
        expect(travelers).toBeUndefined();
    });

    it('will retrieve travelers who are in the system', function() {
        var traveler;

        callback(exampleActions.fetch);
        traveler = TravelerStore.getTraveler(exampleActions.fetch.action.travelers[0].id);

        expect(traveler).toEqual(exampleActions.fetch.action.travelers[0]);
    });

    it('handles the list of travelers updating', function() {
        var travelers;

        callback(exampleActions.fetch);
        travelers = TravelerStore.getTravelers();

        expect(travelers).toEqual(exampleActions.fetch.action.travelers);
    });

    it('handles a single traveler updating', function() {
        var traveler, mergedTraveler;

        callback(exampleActions.fetch);
        callback(exampleActions.update);
        traveler = TravelerStore.getTraveler(exampleActions.update.action.travelers[0].id);

        mergedTraveler = assign(
            exampleActions.fetch.action.travelers[0],
            exampleActions.update.action.travelers[0]
        );
        expect(traveler).toEqual(mergedTraveler);
    });
});