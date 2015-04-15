var assign = require('object-assign'),
	store = require('./src/store');

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
