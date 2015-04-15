var store = require('./constructor');

module.exports = function ImmutableStore(dispatcher, methods) {
	return store({
		dispatch: function(actionType, payload) {
			this.state = this[actionType](this.state, payload);
			this.publish(this.getState());
		}
	}, dispatcher, methods);
};
