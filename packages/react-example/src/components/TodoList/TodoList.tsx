import autobindDecorator from 'autobind-decorator';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import * as styles from './TodoList.styles';
import { connect } from 'react-redux';
import { todos, IApiState } from '@js-demo/redux-example';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TodoItem, AddNewTodoItem  } from './TodoList.functional';

interface ITodoListProps {
  todosArray: todos.ITodo[];
  api: IApiState;
}

interface IDispatchProps {
  todosList: Function;
  todoComplete: Function;
  todoIncomplete: Function;
  todoAdd: Function;
  todoDelete: Function;
}

export interface ITodoListState {
  newTodoText: string;
}

export type ITodosListAllProps = ITodoListProps & IDispatchProps;

export class TodoListBase extends React.Component<ITodosListAllProps> {
  state = {
    newTodoText: '',
  };

  async componentDidMount() {
    const { todosList } = this.props;
    await todosList();
  }

  @autobindDecorator
  async toggleTodo(todo: todos.ITodo) {
    const { todoComplete, todoIncomplete } = this.props;
    if (todo) {
      todo.completed ? await todoIncomplete(todo) : await todoComplete(todo);
    }
  }

  @autobindDecorator
  async addTodo() {
    const { todoAdd } = this.props;
    const { newTodoText } = this.state;
    await todoAdd({ title: newTodoText, completed: false });
    this.setState({ newTodoText: '' });
  }

  @autobindDecorator
  async deleteTodo(id: string) {
    const { todoDelete } = this.props;
    await todoDelete(id);
  }

  @autobindDecorator
  handleFieldUpdate(value: string) {
    this.setState({ newTodoText: value });
  }

  renderList() {
    const { newTodoText } = this.state;
    const { todosArray } = this.props;
    const { api } = this.props;
    const { updating = '' } = api;
    return (
      <div>
        <h1 className={styles.centeredText}>{'Todos'}</h1>
        <ul className={styles.todoList}>
          { todosArray.map((todo: todos.ITodo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isUpdating={updating === todo.id}
              deleteTodo={() => this.deleteTodo(todo.id)}
              toggleTodo={() => this.toggleTodo(todo)}
            />))
          }
          <AddNewTodoItem
            isUpdating={updating === 'new'}
            newText={newTodoText}
            addTodo={this.addTodo}
            onChanged={this.handleFieldUpdate}
            addLabel={'Add Todo'}
          />
        </ul>
      </div>
    );
  }

  render() {
    const { api } = this.props;
    const { fetched } = api;
    return (api.pending && !fetched) ? (<CircularProgress />) : this.renderList();
  }
}

function mapStateToProps(state: todos.ITodosState) {
  return {
    todosArray: todos.select.allTodosAsArray(state),
    api: todos.select.apiState(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  const actionCreators: any = {
    todosList: todos.actions.todosList,
    todoComplete: todos.actions.todoComplete,
    todoIncomplete: todos.actions.todoIncomplete,
    todoAdd: todos.actions.todoAdd,
    todoDelete: todos.actions.todoDelete,
  };
  return bindActionCreators(actionCreators, dispatch);
}

export const TodoListContainer = connect<ITodoListProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(TodoListBase);

export const TodoList = TodoListContainer;
