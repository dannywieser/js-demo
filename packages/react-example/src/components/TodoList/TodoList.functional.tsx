import * as React from 'react';
import * as styles from './TodoList.styles';
import { todos } from '@js-demo/redux-example';

interface TodoUpdatingProps {
  isUpdating: boolean;
}
export const TodoUpdating = ({ isUpdating }: TodoUpdatingProps) =>
  isUpdating ? (<span className={styles.right} />) : null;

interface TodoDeleteButtonProps {
  isUpdating: boolean;
  clickHandler: any;
}
export const TodoDeleteButton = ({ isUpdating, clickHandler }: TodoDeleteButtonProps) => {
  return isUpdating ? null :
  (<button
      className={styles.right}
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
   (<button
     onClick={clickHandler}
    />);
};

export const CenteredSpinner = () => (<div><span className={styles.centered} /></div>);

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
