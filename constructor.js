var assign = require('object-assign');

function getInitialData(methods){
	return typeof methods.getInitialData === 'function' ? methods.getInitialData() : {};
}

module.exports = function(emitter, dispatcher, methods){
	var store = assign({
		state: getInitialData(methods),

		setState: function(patch){
			assign(this.state, patch);
			this.emitChange();
		},

		getStoreData: function(){
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