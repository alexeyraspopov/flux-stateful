var assign = require('object-assign'),
	newsletter = require('newsletter');

function getInitialState(methods) {
	return typeof methods.getInitialState === 'function' ? methods.getInitialState() : {};
}

function identity(a) {
	return a;
}

function mutate(store, type, action) {
	switch (type) {
	case 'mutable':
		store[action.type](store.state, action);
		break;
	case 'immutable':
		store.state = store[action.type](store.state, action);
		break;
	}
}

module.exports = function(storeType) {
	return function(dispatcher, methods) {
		var store, token;

		function dispatchAction(action) {
			if(typeof methods[action.type] === 'function'){
				mutate(store, storeType, action);
				store.publish(store.serialize(store.state));
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
		}, newsletter(), methods);

		token = dispatcher.register(dispatchAction);

		return store;
	};
};
