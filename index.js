var EventEmitter = require('events').EventEmitter,
	assign = require('object-assign');

module.exports = function(dispatcher, methods){
	var store = assign({
		state: {},

		setState: function(patch){
			assign(this.state, patch);
			this.emit('change');
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

		dispatchToken: dispatcher.register(function(action){
			if(methods.hasOwnProperty(action.type)){
				store[action.type](action);
			}
		})
	}, EventEmitter.prototype, methods);

	return store;
};