# Flux Stateful

Straightforward implementation for [Flux](https://facebook.github.io/flux/) stores. Maintain state easily.

## Install

```bash
$ npm install flux-stateful
```

Also it's available via [Bower](http://bower.io).

## Idea

[Store](https://facebook.github.io/flux/docs/overview.html#stores) accumulates your app's state. It's the only place where mutations can be described. You can imagine your store as a function which receives current state and action and returns new state based on that action:

	f(State, Action) = NewState

Just because your app will have more than one action, you need to describe different mutation logic for different types of actions. In `flux-stateful` you can describe a list of reactions based on action's type (see examples below).

## What's inside

```javascript
var {Immutable, Mutable} = require('flux-stateful');
```

## Usage

*NOTE: example uses [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) which are part of ECMAScript6.*

Here is small example of usage mutable store.

```javascript
var MutableStore = require('flux-stateful').Mutable,
	AppDispatcher = require('dispatcher'),
	ActionTypes = require('constants');

module.exports = MutableStore(AppDispatcher, {
	getInitialState() {
		return {
			todos: {}
		};
	}

	[ActionTypes.TODO_ADDED](state, action) {
		var id = uuid();

		state.todos[id] = { id, title: action.title, completed: false };
	},

	[ActionTypes.TODO_REMOVED](state, action) {
		delete state.todos[action.id];
	},

	[ActionTypes.TODO_UPDATED](state, action) {
		state.todos[action.id].title = action.title;
	},

	[ActionTypes.TODO_STATUS_CHANGED](state, action) {
		state.todos[action.id].completed = action.completed;
	}
});
```

The same example but with immutable store.

```javascript
var ImmutableStore = require('flux-stateful').Immutable,
	Immutable = require('immutable'),
	AppDispatcher = require('dispatcher'),
	ActionTypes = require('constants');

var Todo = Immutable.Record({ id: '', title: 'untitled', completed: false });

module.exports = ImmutableStore(AppDispatcher, {
	getInitialState() {
		return Immutable.OrderedMap();
	},

	// In case if you want to use POJO inside your View
	// Otherwise the store will publish Immutable's objects
	serialize(state) {
		return state.toJS();
	},

	[ActionTypes.TODO_ADDED](state, action) {
		var id = uuid();

		return state.set(id, Todo({ id, title: action.title }));
	},

	[ActionTypes.TODO_REMOVED](state, action) {
		return state.remove(action.id);
	},

	[ActionTypes.TODO_UPDATED](state, action) {
		return state.setIn([action.id, 'title'], action.title);
	},

	[ActionTypes.TODO_STATUS_CHANGED](state, action) {
		return state.setIn([action.id, 'completed'], action.completed);
	}
});
```

## Dispatcher

Currently `flux-stateful` depends on [Facebook's Dispatcher](https://facebook.github.io/flux/docs/dispatcher.html).

### Dispatcher's waitFor

You don't need to think about `waitFor`. You don't need to think about it as a good or bad design decision. Flux-stateful uses it under the hood so you just need to use `getState()` method when you need to get data from another stores.

```javascript
StoreA = Store(Dispatcher, {
	[SOMETHING_HAPPENED](state, action) {
		state.data = action.data;
	}
});
```

```javascript
StoreB = Store(Dispatcher, {
	[SOMETHING_HAPPENED](state, action) {
		// Just get some data from another store
		var derived = StoreA.getState();

		state.data = derived.data + action.data;
	}
});
```

## Store API

```javascript
Store.subscribe(callback)
Store.unsubscribe(callback)
Store.publish(data)
```

All these methods are inherited from [newsletter](https://github.com/alexeyraspopov/newsletter).

```javascript
dispatchToken
```

ID from Flux Dispatcher. Check [official Flux documentation](https://facebook.github.io/flux/docs/dispatcher.html)

```javascript
getState()
```

Just a getter which returns current store's state.

```javascript
serialize
```

Can be specified in store's description in case if you're using complex data structures (ie ImmutableJS) and you want to continue use POJO inside View.

```javascript
// Example for ImmutableJS
serialize(state) {
	return state.toJS();
}
```

```javascript
dispatchAction(action)
```

Can be used in testing purpose. Receives action object. The same as you use for Dispatcher.

## License

MIT
