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

		dispatchToken: dispatcher.register(function(action){
			if(typeof methods[action.type] === 'function'){
				store[action.type](action);
			}
		})
	}, emitter, methods);

	return store;
};