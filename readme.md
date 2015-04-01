# flux-stateful

React-like state management in your Flux stores.

## Usage

*NOTE: example uses [computed property names](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names) which are part of ECMAScript6.*

	var FluxStore = require('flux-stateful'),
		Immutable = require('immutable'),
		AppDispatcher = require('./dispatcher'),
		ActionTypes = require('./constants');

	module.exports = FluxStore(AppDispatcher, {
		getInitialState(){
			return { todos: Immutable.List() };
		},

		[ActionTypes.TODO_CREATE](action){
			var newTodo = { text: action.text, completed: false };

			this.setState({
				todos: this.state.todos.push(newTodo)
			});
		}
	});

## License

MIT License