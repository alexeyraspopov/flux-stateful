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

*NOTE: ImmutableJS is not required but recommended.*

If you don't use constants or don't want to use ES6 just use plain old literal notation:

	module.exports = FluxStore(AppDispatcher, {
		// ...

		'todo:create': function(action){
			// ...
		}
	});

If you're using custom data types and want store to publish POJO then you should use `serialize` method. It will be called each time when store needs to emit new value.

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
		getInitialState(){
			return Store.getState();
		}

		...
	});

## Immutable Pure Stores

...

## Store API

	Store.subscribe(callback)
	Store.unsubscribe(callback)
	Store.publish()

All this methods are inherited from [newsletter](https://github.com/alexeyraspopov/newsletter)

	dispatchToken

ID from Flux Dispatcher. Can be used for `waitFor` method. See [official Flux documentation](https://facebook.github.io/flux/docs/dispatcher.html)

## License

MIT License
