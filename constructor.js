var assign = require('object-assign');

function getInitialState(methods){
	return typeof methods.getInitialState === 'function' ? methods.getInitialState() : {};
}

module.exports = function(emitter, dispatcher, methods){
	var store = assign({
		state: getInitialState(methods),

		setState: function(patch){
			assign(this.state, patch);
			this.emitChange();
		},

		getState: function(){
			return this.state;
		},

		dispatchToken: dispatcher.register(function(payload){
			var actionType = payload.actionType;

			if(typeof store[actionType] === 'function'){
				store[actionType](payload);
			}
		})
	}, emitter, methods);

	return store;
};