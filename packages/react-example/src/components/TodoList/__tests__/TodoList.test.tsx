import { mount, ReactWrapper } from 'enzyme';
import * as React from 'react';
import * as components from '../TodoList';
import { TodoItem, AddNewTodoItem, CenteredSpinner } from '../TodoList.functional';

jest.mock('@js-demo/redux-example', () => ({
  todos: jest.fn(),
}));

jest.mock('../TodoList.functional', () => ({
  TodoItem: jest.fn(),
  AddNewTodoItem: jest.fn(),
  CenteredSpinner: jest.fn(),
}));

const createTodo = (title: string, id = '', completed = false) => ({ id, title, completed });

const TodoItemMock = TodoItem as jest.Mock;
const AddNewTodoItemMock = AddNewTodoItem as jest.Mock;
const CenteredSpinnerMock = CenteredSpinner as jest.Mock;

beforeEach(() => {
  AddNewTodoItemMock.mockReset();
  TodoItemMock.mockReset();
  TodoItemMock.mockReturnValue((<li>todo</li>));
  AddNewTodoItemMock.mockReturnValue(null);
  CenteredSpinnerMock.mockReturnValue(<p>spinner</p>);
});

const localizeMock = { translate: jest.fn() } as any;
const props = {
  todosArray: [
    createTodo('one', '1'),
    createTodo('two', '2', true),
  ],
  todosList: jest.fn(),
  todoComplete: jest.fn(),
  todoIncomplete: jest.fn(),
  todoAdd: jest.fn(),
  todoDelete: jest.fn(),
  localize: localizeMock,
  api: { pending: false },
};

describe('loading state', () => {
  // test('shows the loading spinner when api is pending and loading is false', () => {
  //   const pendingProps = { ...props, api: { pending: true } };
  //   const wrapper = mount(<components.TodoListBase { ...pendingProps }/>);
  //   expect(wrapper.html()).toBe('<p>spinner</p>');
  // });
});

describe('the TodoList component', () => {
  let wrapper: ReactWrapper;
  const props = {
    todosArray: [
      createTodo('one', '1'),
      createTodo('two', '2', true),
    ],
    todosList: jest.fn(),
    todoComplete: jest.fn(),
    todoIncomplete: jest.fn(),
    todoAdd: jest.fn(),
    todoDelete: jest.fn(),
    localize: localizeMock,
    api: {
      pending: false,
    },
  };

  beforeEach(() => {
    wrapper = mount(<components.TodoListBase { ...props }/>);
  });

  test('renders a list item for each todo item', () => {
    expect(wrapper.find('li')).toHaveLength(2);
  });

  describe('TodoItem props mapping', () => {
    test('correctly sets up props for TodoItem One', () => {
      const { todo, isUpdating } = TodoItemMock.mock.calls[0][0];
      expect(todo).toEqual(props.todosArray[0]);
      expect(isUpdating).toBe(false);
    });

    test('correctly sets up props for TodoItem Two', () => {
      const { todo, isUpdating } = TodoItemMock.mock.calls[1][0];
      expect(todo).toEqual(props.todosArray[1]);
      expect(isUpdating).toBe(false);
    });

    test('correctly maps toggleTodo function for TodoItem One', () => {
      const { toggleTodo } = TodoItemMock.mock.calls[0][0];
      toggleTodo();
      expect(props.todoComplete.mock.calls).toHaveLength(1);
      expect(props.todoComplete.mock.calls[0][0]).toBe(props.todosArray[0]);
    });

    test('correctly maps toggleTodo function for TodoItem Two', () => {
      const { toggleTodo } = TodoItemMock.mock.calls[1][0];
      toggleTodo();
      expect(props.todoIncomplete.mock.calls).toHaveLength(1);
      expect(props.todoIncomplete.mock.calls[0][0]).toBe(props.todosArray[1]);
    });

    test('correctly maps deleteTodo function for TodoItem One', () => {
      const { deleteTodo } = TodoItemMock.mock.calls[0][0];
      deleteTodo();
      expect(props.todoDelete.mock.calls).toHaveLength(1);
      expect(props.todoDelete.mock.calls[0][0]).toBe('1');
    });

    test('correctly maps deleteTodo function for TodoItem Two', () => {
      const { deleteTodo } = TodoItemMock.mock.calls[1][0];
      deleteTodo();
      expect(props.todoDelete.mock.calls).toHaveLength(1);
      expect(props.todoDelete.mock.calls[0][0]).toBe('2');
    });

    test('correctly sets isUpdating to true if state updating = "todoId"', () => {
      TodoItemMock.mockClear();
      wrapper.setProps({ api: { updating: '2' } });
      const { isUpdating } = TodoItemMock.mock.calls[1][0];
      expect(isUpdating).toBe(true);
    });
  });

  describe('AddNewTodoItem props mapping', () => {
    const newTodoText = 'a new todo';
    test('correctly sets up props for AddNewTodoItem element', () => {
      AddNewTodoItemMock.mockClear();
      wrapper.setState({ newTodoText });
      const { newText, isUpdating } = AddNewTodoItemMock.mock.calls[0][0];
      expect(newText).toEqual(newTodoText);
      expect(isUpdating).toBe(false);
    });

    test('correctly sets up addTodo callback for AddNewTodoItem element', () => {
      wrapper.setState({ newTodoText });
      const { addTodo } = AddNewTodoItemMock.mock.calls[0][0];
      addTodo();
      expect(props.todoAdd.mock.calls).toHaveLength(1);
      expect(props.todoAdd.mock.calls[0][0]).toEqual({
        title: newTodoText,
        completed: false,
      });
    });

    test('correctly sets up onChanged callback for AddNewTodoItem element', () => {
      wrapper.setState({ newTodoText });
      const { onChanged } = AddNewTodoItemMock.mock.calls[0][0];
      onChanged('updated text value');
      const state = wrapper.state() as components.ITodoListState;
      expect(state.newTodoText).toBe('updated text value');
    });

    test('correctly sets isUpdating to true if state updating = "new"', () => {
      AddNewTodoItemMock.mockClear();
      wrapper.setProps({ api: { updating: 'new' } });
      const { isUpdating } = AddNewTodoItemMock.mock.calls[0][0];
      expect(isUpdating).toBe(true);
    });
  });

  test('retrieves the todoList on componentDidMount', () => {
    expect(props.todosList.mock.calls).toHaveLength(1);
  });

  describe('the toggleTodo function', () => {
    test('invokes the todoComplete action if todo is completed: false', async () => {
      const instance = wrapper.instance() as components.TodoListBase;
      await instance.toggleTodo(props.todosArray[0]);
      expect(props.todoComplete.mock.calls).toHaveLength(1);
      expect(props.todoIncomplete.mock.calls).toHaveLength(0);
      expect(props.todoComplete.mock.calls[0][0]).toEqual(props.todosArray[0]);
    });

    test('invokes the todoIncomplete action if todo is completed: true', async () => {
      const instance = wrapper.instance() as components.TodoListBase;
      await instance.toggleTodo(props.todosArray[1]);
      expect(props.todoIncomplete.mock.calls).toHaveLength(1);
      expect(props.todoComplete.mock.calls).toHaveLength(0);
      expect(props.todoIncomplete.mock.calls[0][0]).toEqual(props.todosArray[1]);
    });

    test('ignores toggle if the todo is invalid', () => {
      const instance = wrapper.instance() as components.TodoListBase;
      instance.toggleTodo(null);
      expect(props.todoComplete.mock.calls).toHaveLength(0);
    });
  });

  describe('the addTodo function', () => {
    const newTodoText = 'a new todo';

    test('newTodoText updates the newTodoText state value', () => {
      const instance = wrapper.instance() as components.TodoListBase;
      instance.handleFieldUpdate('a new value');
      const state = wrapper.state() as components.ITodoListState;
      expect(state.newTodoText).toBe('a new value');
    });

    test('invokes the todoAdd action', async () => {
      const instance = wrapper.instance() as components.TodoListBase;
      instance.setState({ newTodoText });
      await instance.addTodo();
      expect(props.todoAdd.mock.calls).toHaveLength(1);
      expect(props.todoAdd.mock.calls[0][0]).toEqual({
        title: newTodoText,
        completed: false,
      });
    });
  });

  describe('the deleteTodo function', () => {
    const deleteId = 'todelete';
    test('invokes the todoDelete action', async () => {
      const instance = wrapper.instance() as components.TodoListBase;
      await instance.deleteTodo(deleteId);
      expect(props.todoDelete.mock.calls).toHaveLength(1);
      expect(props.todoDelete.mock.calls[0][0]).toEqual(deleteId);
    });
  });
});
