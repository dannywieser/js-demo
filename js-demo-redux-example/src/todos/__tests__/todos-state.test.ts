import * as util from 'redux-service-util';
import * as todos from '../';
import * as service from '../todos-service';

function createTodo(id = 'abc123') {
  return {
    id,
    title: `a testing todo: ${id}`,
    completed: false,
  };
}

jest.mock('redux-service-util', () => ({
  actionAsync: jest.fn(),
  reducerAsyncActions: jest.fn(),
  reducerPending: jest.fn(),
  reducerFail: jest.fn(),
  typePending: jest.fn().mockImplementation(value => `${value}.pending`),
  typeFail: jest.fn().mockImplementation(value => `${value}.fail`),
  typeOK: jest.fn().mockImplementation(value => `${value}.ok`),
  createReducer: jest.fn(),
  apiStateOK: jest.fn(),
  withoutApi: jest.fn(),
  asValues: jest.fn(),
  apiOnly: jest.fn(),
}));

const actionAsyncMock = util.actionAsync as jest.Mock;
const asValuesMock = util.asValues as jest.Mock;
const withoutApiMock = util.withoutApi as jest.Mock;
const apiOnlyMock = util.apiOnly as jest.Mock;
const apiStateOK = util.apiStateOK as jest.Mock;

describe('todo actions', () => {
  const todo = createTodo('abc123');
  const params: any = {
    [todos.types.todoAdd]: todo,
    [todos.types.todoDelete]: 'abc123',
    [todos.types.todoComplete]: todo,
    [todos.types.todoIncomplete]: todo,
  };
  const asyncOpts: any = {
    [todos.types.todoAdd]: { updating: 'new' },
    [todos.types.todosList]: { fetched: true },
    [todos.types.todoDelete]: { updating: 'abc123' },
    [todos.types.todoComplete]: { updating: 'abc123' },
    [todos.types.todoIncomplete]: { updating: 'abc123' },
  };

  // if actions are very templated invocations of ActionAsync, tests can be done using an iteration over the action types
  Object.entries(todos.types).forEach(([key]) => {
    test(`${key}: invokes actionAsync with the correct parameters`, () => {
      const param = params[key];
      const opt = asyncOpts[key];
      todos.actions[key](param);
      expect(actionAsyncMock.mock.calls).toHaveLength(1);

      const serviceHandlers = service as any;
      const opts = {
        type: key,
        handler: serviceHandlers[key] as Function,
        ...opt,
      };
      expect(actionAsyncMock.mock.calls[0][0]).toEqual(opts);
      expect(actionAsyncMock.mock.calls[0][1]).toBe(param);
    });
  });
});

describe('reducer map special case handling', () => {
  const state = {
    abc123: createTodo('abc123'),
    def456: createTodo('def456'),
    hij678: createTodo('hij678'),
    ...util.INITIAL_ASYNC_STATE,
  };
  const action = { type: 'action', payload: { id: 'def456' } };

  test('reducerMap: todoDelete.ok deletes the target item from the state', () => {
    apiStateOK.mockReturnValue({ key: 'value' });
    const result = todos.todoDeleteOK(state, action);
    const { def456: value, ...expected } = state;
    const expectedWithApi = { ...expected, api: { key: 'value' } };
    expect(result).toEqual(expectedWithApi);
  });

  test('reducerMap: todoDelete.ok handles a non-existent key', () => {
    apiStateOK.mockReturnValue({ key: 'value' });
    const result = todos.todoDeleteOK(state,  { type: 'action', payload: { id: 'def454' } });
    const expectedWithApi = { ...state, api: { key: 'value' } };
    expect(result).toEqual(expectedWithApi);
  });
});

describe('selectors', () => {
  test('allTodos: invokes withoutApi util function', () => {
    const state = { todos: { a: '1', ...util.INITIAL_ASYNC_STATE } };
    todos.select.allTodos(state);
    expect(withoutApiMock.mock.calls).toHaveLength(1);
    expect(withoutApiMock.mock.calls[0][0]).toBe(state.todos);
  });
  test('allTodosAsArray: invokes withoutApi util function', () => {
    const state = { todos: { a: '1', ...util.INITIAL_ASYNC_STATE } };
    todos.select.allTodosAsArray(state);
    expect(asValuesMock.mock.calls).toHaveLength(1);
    expect(asValuesMock.mock.calls[0][0]).toBe(state.todos);
  });
  test('apiState: invokes apiOnly util function', () => {
    const state = { todos: { a: '1', ...util.INITIAL_ASYNC_STATE } };
    todos.select.apiState(state);
    expect(apiOnlyMock.mock.calls).toHaveLength(1);
    expect(apiOnlyMock.mock.calls[0][0]).toBe(state.todos);
  });
});
