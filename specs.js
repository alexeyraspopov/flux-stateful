var FluxStore = require('./index'),
	keyMirror = require('keymirror'),
	Dispatcher = require('flux').Dispatcher;

describe('boo', function(){
	var AppDispatcher, Constants, Store;

	beforeEach(function(){
		AppDispatcher = new Dispatcher();

		Constants = keyMirror({
			INCREMENT: true,
		});

		Store = FluxStore(AppDispatcher, {
			getInitialData: function(){
				return { count: 0 };
			},

			[Constants.INCREMENT](payload){
				this.setState({ count: this.state.count + payload.increment });
			}
		});
	});

	it('should pass', function(){
		expect(true).toBe(true);
	});
});