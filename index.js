var assign = require('object-assign'),
	store = require('./src/store');

module.exports = store.bind(null, {
	dispatch: function(actionType, payload) {
		this[actionType](payload);
	},
	setState: function(patch){
		assign(this.state, patch);
		this.publish(this.getState());
	}
});