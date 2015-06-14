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

```javascript
var StatefulStore = require('flux-stateful'),
	Immutable = require('immutable'),
	AppDispatcher = require('./dispatcher'),
	ActionTypes = require('./constants');

module.exports = StatefulStore(AppDispatcher, {
	getInitialState(){
		return { todos: Immutable.OrderedMap() };
	},

	// Method which will be called if payload.actionType === ActionTypes.TODO_CREATE
	[ActionTypes.TODO_CREATED](action){
		var id = uuid.v4(),
			newTodo = { id, text: action.text, completed: false };

		this.setState({
			todos: this.state.todos.set(id, newTodo)
		});
	},

	// You already understood how it works
	[ActionTypes.TODO_DESTROYED](action){
		this.setState({
			todos: this.state.todos.delete(action.id)
		});
	}
});
```

*NOTE: ImmutableJS is not required but recommended.*

If you don't use constants or don't want to use ES6 just use plain old literal notation:

```javascript
module.exports = FluxStore(AppDispatcher, {
	// ...

	'TODO_CREATED': function(action){
		// ...
	}
});
```

If you're using custom data types and want store to publish POJO then you should use `serialize` method. It will be called each time when store needs to emit new value.

```javascript
FluxStore(AppDispatcher, {
	getInitialState(){
		return { data: Immutable.Set() };
	},

	serialize(state){
		return { data: state.data.toArray() };
	}

	// ...
});
```

If you want to grab current state of store, use `getState` method.

```javascript
var App = React.createClass({
	getInitialState(){
		return Store.getState();
	}

	// ...
});
```

## Immutable Pure Stores

```javascript
var ImmutableStore = require('flux-stateful/immutable'),
	Immutable = require('immutable'),
	AppDispatcher = require('./dispatcher'),
	ActionTypes = require('./constants'),
	Todo = Immutable.Record({ id: '', text: '', completed: false });

module.exports = ImmutableStore(AppDispatcher, {
	getInitialState(){
		return Immutable.Map({
			todos: Immutable.OrderedMap(),
			newTodo: ''
		});
	},

	[ActionTypes.TODO_CREATED](state, payload){
		var id = uuid(),
			todo = Todo({
				id: id,
				text: payload.text
			});

		return state
			.setIn(['todos', id], todo)
			.set('newTodo', '');
	},

	[ActionTypes.TODO_DESTROYED](state, payload){
		return state.removeIn(['todos', payload.id]);
	},

	[ActionTypes.TODO_STATUS_UPDATED](state, payload){
		return state.setIn(['todos', payload.id, 'completed'], payload.completed);
	},

	// ...

	serialize(state){
		return state.toJS();
	}
});
```

## Dispatcher

Currently `flux-stateful` depends on [Facebook's Dispatcher](https://facebook.github.io/flux/docs/dispatcher.html).

### Dispatcher's waitFor

You don't need to think about `waitFor`. You don't need to think about it as a good or bad design decision. Flux-stateful use it under the hood so you just need to use `getState()` method when you need to get data from another stores.

```javascript
StoreA = Stateful(Dispatcher, {
	[SMTH_HAPPENED](state, action){
		state.data = action.data;
	}
});
```

```javascript
StoreB = Stateful(Dispatcher, {
	[SMTH_HAPPENED](state, action){
		// just get some data from another store
		var derived = StoreA.getState();

		state.data = derived.data + action.data;
	}
});
```

## Store API

```javascript
Store.subscribe(callback);
Store.unsubscribe(callback);
Store.publish(data);
```

All this methods are inherited from [newsletter](https://github.com/alexeyraspopov/newsletter).

```javascript
dispatchToken
```

ID from Flux Dispatcher. Check [official Flux documentation](https://facebook.github.io/flux/docs/dispatcher.html)

## License

MIT License
