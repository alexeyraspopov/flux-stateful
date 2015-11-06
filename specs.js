var FluxStore = require('./index').Mutable,
	Dispatcher = require('flux').Dispatcher;

describe('Store', function(){
	var InitialState, AppDispatcher, Action, Store;

	beforeEach(function() {
		InitialState = { counter: 0 };
		AppDispatcher = new Dispatcher();
		Action = { type: 'COUNTER_INCREMENTED', value: 10 };

		Store = FluxStore(AppDispatcher, {
			getInitialState: function() {
				return InitialState;
			},

			'COUNTER_INCREMENTED': function(state, action) {
				state.counter += action.value;
			}
		});
	});

	it('shoud have initial state', function() {
		expect(Store.getState()).toEqual(InitialState);
	});

	it('should have update state when dispatcher fires an action', function() {
		AppDispatcher.dispatch(Action);
		expect(Store.getState()).toEqual({ counter: 10 });
	});
});
