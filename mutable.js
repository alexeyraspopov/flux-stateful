var store = require('./src/store');

module.exports = store.bind(null, {
	dispatch: function(actionType, payload) {
		this[actionType](this.state, payload);
		this.publish(this.getState());
	}
});