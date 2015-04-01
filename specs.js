var FluxStore = require('./index'),
	keyMirror = require('keymirror'),
	Dispatcher = require('flux').Dispatcher;

describe('Store', function(){
	var AppDispatcher, Constants, Store;

	beforeEach(function(){
		AppDispatcher = new Dispatcher();

		Constants = keyMirror({
			INCREMENT: true,
		});

		Store = FluxStore(AppDispatcher, {
			getInitialState: function(){
				return { count: 0 };
			},

			[Constants.INCREMENT](payload){
				this.setState({ count: this.state.count + payload.increment });
			}
		});
	});

	it('should have initial state', function(){
		expect(Store.getState()).toEqual({ count: 0 });
	});

	it('should update state when Dispatcher fires an event', function(){
		AppDispatcher.dispatch({ actionType: Constants.INCREMENT, increment: 13 });
		expect(Store.getState()).toEqual({ count:13 });
	});

	it('should use custom serialization function', function() {
		Store.serialize = JSON.stringify;
		expect(Store.getState()).toBe('{"count":0}');
	});
});