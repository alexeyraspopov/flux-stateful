(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.ImmutableStore = require("./immutable");
},{"./immutable":2}],2:[function(require,module,exports){
var store = require('./src/store');

module.exports = function ImmutableStore(dispatcher, methods) {
	return store({
		dispatch: function(actionType, payload) {
			this.state = this[actionType](this.state, payload);
			this.publish(this.getState());
		}
	}, dispatcher, methods);
};

},{"./src/store":5}],3:[function(require,module,exports){
'use strict';

module.exports = function newsletter() {
	var subscribers = [];

	return {
		subscribe: function(callback) {
			return subscribe(subscribers, callback);
		},
		unsubscribe: function(callback) {
			unsubscribe(subscribers, callback);
		},
		publish: function(data) {
			publish(subscribers, data);
		}
	};
};

function unsubscribe(subscribers, callback) {
	var index = subscribers.indexOf(callback);

	if (index > -1) {
		subscribers.splice(index, 1);
	}
}

function publish(subscribers, data) {
	var index = subscribers.length;

	while (--index >= 0) {
		subscribers[index](data);
	}
}

function subscribe(subscribers, callback) {
	if (subscribers.indexOf(callback) < 0) {
		subscribers.unshift(callback);

		return function() { unsubscribe(subscribers, callback); };
	}

	return noop;
}

function noop() {}

},{}],4:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],5:[function(require,module,exports){
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
},{"newsletter":3,"object-assign":4}]},{},[1])