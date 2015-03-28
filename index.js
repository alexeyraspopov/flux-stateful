module.exports = function(dispatcher, store){
	// assign({}, )

	return dispatcher.register(function(action){
		if(store.hasOwnProperty(action.type)){
			store[action.type](action);
		}
	});
};