var assign = require('object-assign'),
	newsletter = require('newsletter');

function getInitialState(methods) {
	return 'getInitialState' in methods ? methods.getInitialState() : {};
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

function createStore(stateMutation) {
	function nextState(store, action) {
		return store.serialize(stateMutation(store, action));
	}

	return function(dispatcher, methods) {
		var store = assign({
				state: getInitialState(methods),
				getState: serializeState,
				serialize: identity,
				dispatchAction: dispatchAction,
				dispatchToken: dispatcher.register(dispatchAction)
			}, newsletter(), methods);

		function dispatchAction(action) {
			if (action.type in methods) {
				store.publish(nextState(store, action));
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
