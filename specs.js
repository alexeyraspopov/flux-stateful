var FluxStore = require('./index'),
	keyMirror = require('keymirror');

var DummyConstants = keyMirror({
	SOME_ACTION: true,
});

var DummyStore = FluxStore({ register: function(){} }, {
	[DummyConstants.SOME_ACTION](payload){
		return 13;
	}
});

describe('boo', function() {
	it('should pass', function() {
		expect(true).toBe(true);
	});
});