var assign = require('object-assign'),
	newsletter = require('newsletter');

function getInitialState(methods) {
	return typeof methods.getInitialState === 'function' ? methods.getInitialState() : {};
}

function identity(a) {
	return a;
}

module.exports = function(operations, dispatcher, methods) {
	var store, token;

	function dispatchAction(payload) {
		var actionType = payload.actionType;

		if(typeof methods[actionType] === 'function'){
			store.dispatch(actionType, payload);
		}
	}

	function serializeState() {
		if(dispatcher.isDispatching()){
			dispatcher.waitFor([token]);
		}

		return store.serialize(store.state);
	}

	store = assign({
		state: getInitialState(methods),
		getState: serializeState,
		serialize: identity,
		dispatchToken: token
	}, operations, newsletter(), methods);

	token = dispatcher.register(dispatchAction);

	return store;
};