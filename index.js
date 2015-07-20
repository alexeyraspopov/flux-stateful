var assign = require('object-assign'),
	newsletter = require('newsletter');

function getInitialState(methods) {
	return typeof methods.getInitialState === 'function' ? methods.getInitialState() : {};
}

function identity(a) {
	return a;
}

function mutable(store, action) {
	store[action.type](store.state, action);

	return store.state;
}

function immutable(store, action) {
	store.state = store[action.type](store.state, action);

	return store.state;
}

function createStore(nextState) {
	return function(dispatcher, methods) {
		var store = assign({
				state: getInitialState(methods),
				getState: serializeState,
				serialize: identity,
				dispatchAction: dispatchAction,
				dispatchToken: dispatcher.register(dispatchAction)
			}, newsletter(), methods);

		function dispatchAction(action) {
			if (typeof methods[action.type] === 'function') {
				store.publish(store.serialize(nextState(store, action)));
			}
		}

		function serializeState() {
			if (dispatcher.isDispatching()) {
				dispatcher.waitFor([store.dispatchToken]);
			}

			return store.serialize(store.state);
		}

		return store;
	};
}


exports.Immutable = createStore(immutable);
exports.Mutable = createStore(mutable);
