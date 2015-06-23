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

function createStore(storeType) {
	return function(dispatcher, methods) {
		var store;

		function dispatchAction(action) {
			if (typeof methods[action.type] === 'function') {
				mutate(store, storeType, action);
				store.publish(store.serialize(store.state));
			}
		}

		function serializeState() {
			if (dispatcher.isDispatching()) {
				dispatcher.waitFor([store.dispatchToken]);
			}

			return store.serialize(store.state);
		}

		store = assign({
			state: getInitialState(methods),
			getState: serializeState,
			serialize: identity,
			dispatchAction: dispatchAction,
			dispatchToken: dispatcher.register(dispatchAction)
		}, newsletter(), methods);

		return store;
	};
}


exports.Immutable = createStore('immutable');
exports.Mutable = createStore('mutable');
