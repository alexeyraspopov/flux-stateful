# Flux Stateful

Straightforward implementation for [Flux](https://facebook.github.io/flux/) stores. Maintain state easily.

## install

```bash
$ npm install flux-stateful
```

Also it's available via [Bower](http://bower.io).

## Idea

	f(State, Action) = NewState

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

## License

MIT

