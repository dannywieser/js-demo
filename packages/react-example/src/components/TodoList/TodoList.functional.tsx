import * as React from 'react';
import { Spinner, SpinnerSize } from '@bb-ui-toolkit/toolkit-react/lib/Spinner';
import { IconButton } from '@bb-ui-toolkit/toolkit-react/lib/Button';
import { TextField } from '@bb-ui-toolkit/toolkit-react/lib/TextField';
import * as styles from './TodoList.styles';
import { todos } from 'bb-js-data-service-template';

interface TodoUpdatingProps {
  isUpdating: boolean;
}
export const TodoUpdating = ({ isUpdating }: TodoUpdatingProps) =>
  isUpdating ? (<Spinner className={styles.right} size={SpinnerSize.small} />) : null;

interface TodoDeleteButtonProps {
  isUpdating: boolean;
  clickHandler: any;
}
export const TodoDeleteButton = ({ isUpdating, clickHandler }: TodoDeleteButtonProps) => {
  return isUpdating ? null :
  (<IconButton
      className={styles.right}
      iconProps={{ iconName: 'trash', iconSize: 'small' }}
      onClick={clickHandler}
    />);
};

interface TodoAddButtonProps {
  isUpdating: boolean;
  clickHandler: any;
  addLabel: string;
}
export const TodoAddButton = ({ isUpdating, clickHandler, addLabel }: TodoAddButtonProps) => {
  return isUpdating ? null :
   (<IconButton
     iconProps={{ iconName: 'add-circle', iconSize: 'small' }}
     ariaLabel={addLabel}
     onClick={clickHandler}
    />);
};

export const CenteredSpinner = () => (<div><Spinner className={styles.centered} size={SpinnerSize.xLarge}/></div>);

const getTodoClasses = (todo: todos.ITodo, updating: boolean) => {
  const { completed } = todo;
  const completedClass = completed ? styles.complete : styles.incomplete;
  const loadingClass = updating ? styles.loading : '';
  return `${completedClass} ${styles.todo} ${loadingClass}`;
};

interface TodoItemProps {
  todo: todos.ITodo;
  toggleTodo: (event: any) => void;
  deleteTodo: (todoId: string) => void;
  isUpdating: boolean;
}
export const TodoItem = ({ todo, toggleTodo, deleteTodo, isUpdating }: TodoItemProps) => {
  const { title } = todo;
  return (
    <li
      className={getTodoClasses(todo, isUpdating)}>
        <span onClick={toggleTodo}>{title}</span>
        <TodoUpdating
          isUpdating={isUpdating}
        />
        <TodoDeleteButton
          isUpdating={isUpdating}
          clickHandler={deleteTodo}
        />
    </li>);
};

interface AddNewTodoItemProps {
  newText: string;
  onChanged: (newValue: string) => void;
  addTodo: Function;
  isUpdating: boolean;
  addLabel: string;
}
export const AddNewTodoItem = ({ newText, isUpdating, onChanged, addTodo, addLabel }: AddNewTodoItemProps) => {
  return (
    <li className={styles.todo}>
      <div className={styles.inline}>
        <TextField
          value={newText}
          onChanged={onChanged}
        />
        <TodoUpdating isUpdating={isUpdating} />
        <TodoAddButton
          clickHandler={addTodo}
          isUpdating={isUpdating}
          addLabel={addLabel}
        />
      </div>
    </li>
  );
};
