# flux-stateful

## Usage

	var AppDispatcher = require('./dispatcher'),
		FluxStore = require('flux-stateful'),
		ActionTypes = require('./constants'),
		Immutable = require('immutable');

	module.exports = FluxStore(AppDispatcher, {
		getInitialData(){
			return { todos: Immutable.List() };
		},

		[ActionTypes.TODO_CREATE](action){
			var newTodo = { text: action.text, completed: false };

			this.setState({
				todos: this.state.todos.push(newTodo)
			});
		}
	});
