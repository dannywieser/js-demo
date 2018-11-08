import autobindDecorator from 'autobind-decorator';
import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { StyledComponentProps, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { styles } from './TodoList.styles';
import { connect } from 'react-redux';
import { todos, IApiState } from '@js-demo/redux-example';

// import { TodoItem, AddNewTodoItem  } from './TodoList.functional';

interface ITodoListProps extends StyledComponentProps {
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
    const { todosArray, classes } = this.props;
    const { api } = this.props;
    const { updating = '' } = api;
    return (
      <div className={classes.root}>
        <Typography variant="h6">{'Todos'}</Typography>
        <List>
          {todosArray.map(todo => (
            <ListItem button key={todo.id} onClick={() => this.toggleTodo(todo)}>
              <Checkbox
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
              />
              <ListItemText primary={todo.title} />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete"
                  onClick={() => this.deleteTodo(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
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

export const TodoList = withStyles(styles)(TodoListContainer);
