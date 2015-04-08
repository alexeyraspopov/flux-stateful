# flux-stateful

React-like state management in your Flux stores.

## Install

```bash
$ npm install flux-stateful --save
```

```bash
$ bower install flux-stateful --save
```

## Usage

*NOTE: example uses [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) which are part of ECMAScript6.*

The main concept is really easy:

	var FluxStore = require('flux-stateful'),
		Immutable = require('immutable'),
		AppDispatcher = require('./dispatcher'),
		ActionTypes = require('./constants');

	module.exports = FluxStore(AppDispatcher, {
		getInitialState(){
			return { todos: Immutable.OrderedMap() };
		},

		// Method which will be called if payload.actionType === ActionTypes.TODO_CREATE
		[ActionTypes.TODO_CREATE](action){
			var id = uuid.v4(),
				newTodo = { id, text: action.text, completed: false };

			this.setState({
				todos: this.state.todos.set(id, newTodo)
			});
		},

		// You already understood how it works
		[ActionTypes.TODO_DESTROY](action){
			this.setState({
				todos: this.state.todos.delete(action.id)
			});
		}		
	});

*NOTE: ImmutableJS is not required.*

If you're using custom data types and want store to publish POJO then you can use `serialize` method. It will be called each time when store needs to emit new value.

	FluxStore(AppDispatcher, {
		getInitialState(){
			return { data: Immutable.Set() };
		},

		serialize(state){
			return { data: state.data.toArray() };
		}

		...
	});

If you want to grab current state of store, use `getState` method.

	var App = React.createClass({
		getInitialState: function(){
			return Store.getState();
		}

		...
	});

## Store API

If you're familiar with basic concepts of Flux you already know main API of this stores:

 * `addEventListener(callback)`
 * `removeEventListener(callback)`
 * `emitChange()`
 * `dispatchToken`

And it will works in the same way: change store's state and emit changes.

## Custom Event Emitter

By default, this stores are using [Node's EventEmitter](https://nodejs.org/api/events.html). If you want to use different EE or pub/sub implementation you have to use store's constructor and describe new API for working with listeners.

	var StoreConstructor = require('flux-stateful/constructor'),
		EventEmitter = require('some-event-emitter-implementation'),
		assign = require('object-assign');

	module.exports = StoreConstructor.bind(null, assign({
		subscribe: function(callback){
			// add new listener
		},

		unsubscribe: function(callback){
			// remove listener
		},

		// required method
		emitChange: function(){
			this.emit('change');
		}
	}, EventEmitter.prototype));

Then you can use this module for describing your stores.

## License

MIT License
