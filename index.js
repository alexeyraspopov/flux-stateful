var EventEmitter = require('events').EventEmitter,
	assign = require('object-assign'),
	store = require('./constructor');

module.exports = store.bind(null, assing({
	addEventListener: function(callback){
		this.addListener('change', callback);
	},

	removeEventListener: function(callback){
		this.removeListener('change', callback);
	},

	emitChange: function(){
		this.emit('change');
	}
}, EventEmitter.prototype));