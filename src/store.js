var assign = require('object-assign'),
	newsletter = require('newsletter');

function getInitialState(methods) {
	return typeof methods.getInitialState === 'function' ? methods.getInitialState() : {};
}

module.exports = function(operations, dispatcher, methods) {
	var store = assign({
		state: getInitialState(methods),

		getState: function(){
			return this.serialize(this.state);
		},

		serialize: function(state){
			return state;
		},

		dispatchToken: dispatcher.register(function(payload) {
			var actionType = payload.actionType;

			if(typeof methods[actionType] === 'function'){
				store.dispatch(actionType, payload);
			}
		})
	}, operations, newsletter(), methods);

	return store;
};