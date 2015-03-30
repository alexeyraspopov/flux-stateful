var EventEmitter = require('events').EventEmitter,
	assign = require('object-assign');

function getInitialData(methods){
	return typeof methods.getInitialData === 'function' ? methods.getInitialData() : {};
}

module.exports = function(dispatcher, methods){
	var store = assign({
		state: getInitialData(methods),

		setState: function(patch){
			assign(this.state, patch);
			this.emitChange();
		},

		getStoreData: function(){
			return this.state;
		},

		addEventListener: function(callback){
			this.addListener('change', callback);
		},

		removeEventListener: function(callback){
			this.removeListener('change', callback);
		},

		emitChange: function(){
			this.emit('change');
		},

		dispatchToken: dispatcher.register(function(action){
			if(typeof methods[action.type] === 'function'){
				store[action.type](action);
			}
		})
	}, EventEmitter.prototype, methods);

	return store;
};