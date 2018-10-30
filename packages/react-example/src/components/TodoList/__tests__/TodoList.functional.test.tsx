import { shallow, mount } from 'enzyme';
import * as React from 'react';
import { todos } from 'bb-js-data-service-template';
import * as styles from '../TodoList.styles';
import * as functions from '../TodoList.functional';

describe('TodoUpdating', () => {
  test('TodoUpdating renders spinner if isUpdating is true', () => {
    const wrapper = shallow(<functions.TodoUpdating isUpdating={true} />);
    expect(wrapper.find('Spinner')).toHaveLength(1);
  });
  test('TodoUpdating renders nothing if isUpdating is false', () => {
    const wrapper = shallow(<functions.TodoUpdating isUpdating={false} />);
    expect(wrapper.find('Spinner')).toHaveLength(0);
  });
});

describe('TodoDeleteButton', () => {
  test('TodoDeleteButton renders button if isUpdating is false', () => {
    const wrapper = mount(<functions.TodoDeleteButton isUpdating={false} clickHandler={jest.fn()} />);
    expect(wrapper.find('button')).toHaveLength(1);
  });
  test('TodoDeleteButton renders nothing if isUpdating is true', () => {
    const wrapper = mount(<functions.TodoDeleteButton isUpdating={true} clickHandler={jest.fn()} />);
    expect(wrapper.find('button')).toHaveLength(0);
  });
  test('TodoDeleteButton click triggers clickHandler function', () => {
    const clickHandlerMock = jest.fn();
    const wrapper = mount(<functions.TodoDeleteButton isUpdating={false} clickHandler={clickHandlerMock} />);
    wrapper.find('button').simulate('click');
    expect(clickHandlerMock.mock.calls).toHaveLength(1);
  });
});

describe('TodoAddButton', () => {
  test('TodoAddButton renders button if isUpdating is false', () => {
    const wrapper = mount(<functions.TodoAddButton
      isUpdating={false}
      clickHandler={jest.fn()}
      addLabel={'add new'} />);
    expect(wrapper.find('button')).toHaveLength(1);
  });
  test('TodoAddButton renders nothing if isUpdating is true', () => {
    const wrapper = mount(<functions.TodoAddButton
      isUpdating={true}
      clickHandler={jest.fn()}
      addLabel={'add new'} />);
    expect(wrapper.find('button')).toHaveLength(0);
  });
  test('TodoAddButton click triggers clickHandler function', () => {
    const clickHandlerMock = jest.fn();
    const wrapper = mount(<functions.TodoAddButton
      isUpdating={false}
      clickHandler={clickHandlerMock}
      addLabel={'add new'} />);
    wrapper.find('button').simulate('click');
    expect(clickHandlerMock.mock.calls).toHaveLength(1);
  });
});

function mountTodoItem(todo: todos.ITodo, toggleTodo: jest.Mock, deleteTodo: jest.Mock, isUpdating: boolean) {
  return mount(
    <functions.TodoItem
      isUpdating={isUpdating}
      toggleTodo={toggleTodo}
      deleteTodo={deleteTodo}
      todo={todo}
    />,
  );
}

const createTodo = (completed: boolean = false) => ({ completed, id: 'abc123', title: 'a todo' });

describe('TodoItem', () => {
  let toggleTodoMock: jest.Mock;
  let deleteTodoMock: jest.Mock;
  beforeEach(() => {
    toggleTodoMock = jest.fn();
    deleteTodoMock = jest.fn();
  });
  test('renders the todo title', () => {
    const wrapper = mountTodoItem(createTodo(), toggleTodoMock, deleteTodoMock, false);
    expect(wrapper.find('span').text()).toBe('a todo');
  });
  test('adds the loading class if isUpdating is true', () => {
    const wrapper = mountTodoItem(createTodo(), toggleTodoMock, deleteTodoMock, true);
    expect(wrapper.find('li').hasClass(styles.loading)).toBe(true);
  });
  test('does not add the loading class if isUpdating is false', () => {
    const wrapper = mountTodoItem(createTodo(), toggleTodoMock, deleteTodoMock, false);
    expect(wrapper.find('li').hasClass(styles.loading)).toBe(false);
  });
  test('adds the complete class if todo is completed', () => {
    const wrapper = mountTodoItem(createTodo(true), toggleTodoMock, deleteTodoMock, true);
    expect(wrapper.find('li').hasClass(styles.complete)).toBe(true);
    expect(wrapper.find('li').hasClass(styles.incomplete)).toBe(false);
  });
  test('adds the incomplete class if todo is not completed', () => {
    const wrapper = mountTodoItem(createTodo(), toggleTodoMock, deleteTodoMock, true);
    expect(wrapper.find('li').hasClass(styles.complete)).toBe(false);
    expect(wrapper.find('li').hasClass(styles.incomplete)).toBe(true);
  });
});

function mountAddNewTodoItem(newText: string, onChanged: jest.Mock, addTodo: jest.Mock, isUpdating: boolean) {
  return mount(
    <functions.AddNewTodoItem
      isUpdating={isUpdating}
      addTodo={addTodo}
      newText={newText}
      onChanged={onChanged}
      addLabel={'add new'}
    />,
  );
}

describe('AddNewTodoItem', () => {
  let addTodoMock: jest.Mock;
  let onChangeMock: jest.Mock;
  beforeEach(() => {
    addTodoMock = jest.fn();
    onChangeMock = jest.fn();
  });
  test('links the newText prop to the input field value', () => {
    const wrapper = mountAddNewTodoItem('new text', onChangeMock, addTodoMock, false);
    expect(wrapper.find('input').props().value).toBe('new text');
  });
  test('triggers the onChange handler on a text field change', () => {
    const wrapper = mountAddNewTodoItem('new text', onChangeMock, addTodoMock, false);
    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'Hello' } });
    expect(onChangeMock.mock.calls).toHaveLength(1);
  });
  test('triggers the addTodo handler on a button click', () => {
    const wrapper = mountAddNewTodoItem('new text', onChangeMock, addTodoMock, false);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(addTodoMock.mock.calls).toHaveLength(1);
  });
});

test('CenteredSpinner: renders the spinner component', () => {
  const wrapper = shallow(<functions.CenteredSpinner />);
  expect(wrapper.find('Spinner')).toHaveLength(1);
});
