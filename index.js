var store = require('./constructor'),
	assign = require('object-assign');

module.exports = function Store(dispatcher, methods) {
	return store({
		dispatch: function(actionType, payload) {
			this[actionType](payload);
		},
		setState: function(patch){
			assign(this.state, patch);
			this.publish(this.getState());
		}
	}, dispatcher, methods);
};
