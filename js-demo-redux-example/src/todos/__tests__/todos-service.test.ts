import * as util from 'redux-service-util';
import * as service from '../todos-service';

jest.mock('../../config', () => ({
  config: { apiBasePath: 'http://someapipath' },
}));

jest.mock('redux-service-util', () => ({
  doDelete: jest.fn(),
  doPatch: jest.fn(),
  doFetch: jest.fn(),
  doPost: jest.fn(),
}));

function createTodo(id = 'abc123', completed = false) {
  return {
    id,
    completed,
    title: `a testing todo: ${id}`,
  };
}

const doFetchMock = util.doFetch as jest.Mock;
const doDeleteMock = util.doDelete as jest.Mock;
const doPostMock = util.doPost as jest.Mock;
const doPatchMock = util.doPatch as jest.Mock;

beforeEach(() => {
  doPatchMock.mockReset();
  doFetchMock.mockReset();
  doPostMock.mockReset();
  doPatchMock.mockReset();
});

describe('the todosList service function', () => {
  test('todosList: invokes doFetch with the correct api path', () => {
    service.todosList().catch(() => {});
    expect(doFetchMock.mock.calls[0][0]).toBe('http://someapipath/todos');
  });

  test('todosList: ok api response, todo data mapped', async () => {
    const data = [createTodo('1_'), createTodo('2_')];
    doFetchMock.mockReturnValue(Promise.resolve({ data, ok: true }));
    const result: any = await service.todosList().catch(() => {});
    const expected = { '1_': data[0], '2_': data[1] };
    expect(result.payload).toEqual(expected);
    expect(result.ok).toBe(true);
  });

  test('todosList: fail api response, error data mapped', async () => {
    doFetchMock.mockReturnValue(Promise.resolve({ undefined, ok: false, status: 401 }));
    const result: any = await service.todosList().catch(() => {});
    expect(result.payload).toEqual({ status: 401 });
    expect(result.ok).toBe(false);
  });
});

describe('the todoAdd service function', () => {
  test('todoAdd: invokes doPost with the correct api path', () => {
    const todo = createTodo('123abc');
    service.todoAdd(todo).catch(() => {});
    expect(doPostMock.mock.calls[0][0]).toBe('http://someapipath/todos');
  });

  test('todoAdd: ok api response, todo new data mapped to payload', async () => {
    const todo = createTodo('123abc');
    doPostMock.mockReturnValue(Promise.resolve({ ok: true, data: { ...todo } }));
    const result: any = await service.todoAdd(todo).catch(() => {});
    const expected = { '123abc': todo };
    expect(result.payload).toEqual(expected);
    expect(result.ok).toBe(true);
  });

  test('todoAdd: fail api response, error data mapped', async () => {
    const todo = createTodo('123abc');
    doPostMock.mockReturnValue(Promise.resolve({ data: undefined, status: 401, ok: false }));
    const result: any = await service.todoAdd(todo).catch(() => {});
    expect(result.payload).toEqual({ status: 401 });
    expect(result.ok).toBe(false);
  });
});

describe('the todoDelete service function', () => {
  test('todoDelete: invokes doDelete with the correct api path', () => {
    service.todoDelete('123abc').catch(() => {});
    expect(doDeleteMock.mock.calls[0][0]).toBe('http://someapipath/todos/123abc');
  });

  test('todoDelete: ok api response, payload return with deleted id', async () => {
    doDeleteMock.mockReturnValue(Promise.resolve({ ok: true, data: {} }));
    const result: any = await service.todoDelete('abc123').catch(() => {});
    const expected = { id: 'abc123' };
    expect(result.payload).toEqual(expected);
    expect(result.ok).toBe(true);
  });

  test('todoDelete: fail api response, error data mapped', async () => {
    doDeleteMock.mockReturnValue(Promise.resolve({ payload: undefined, ok: false, status: 500 }));
    const result: any = await service.todoDelete('abc123').catch(() => {});
    expect(result.payload).toEqual({ status: 500 });
    expect(result.ok).toBe(false);
  });
});

describe('the todoComplete service function', () => {
  test('todoComplete: invokes doPatch with the correct api path', () => {
    const todo = createTodo('123abc');
    service.todoComplete(todo).catch(() => {});
    expect(doPatchMock.mock.calls[0][0]).toBe('http://someapipath/todos/123abc');
  });

  test('todoComplete: updates the completed flag for the todo to be true', () => {
    const todo = createTodo('123abc');
    service.todoComplete(todo).catch(() => {});
    const completedTodo = { ...todo, completed: true };
    expect(doPatchMock.mock.calls[0][1]).toEqual(JSON.stringify(completedTodo));
  });

  test('todoComplete: ok api response, payload return with deleted id', async () => {
    const todo = createTodo('123abc');
    doPatchMock.mockReturnValue(Promise.resolve({ ok: true, data: todo }));
    const result: any = await service.todoComplete(todo).catch(() => {});
    const expected = { '123abc': todo };
    expect(result.payload).toEqual(expected);
    expect(result.ok).toBe(true);
  });

  test('todoComplete: fail api response, error data mapped', async () => {
    const todo = createTodo('123abc');
    doPatchMock.mockReturnValue(Promise.resolve({ payload: undefined, ok: false, status: 404 }));
    const result: any = await service.todoComplete(todo).catch(() => {});
    expect(result.payload).toEqual({ status: 404 });
    expect(result.ok).toBe(false);
  });
});

describe('the todoIncomplete service function', () => {
  test('todoIncomplete: invokes doPatch with the correct api path', () => {
    const todo = createTodo('123abc');
    service.todoIncomplete(todo).catch(() => {});
    expect(doPatchMock.mock.calls[0][0]).toBe('http://someapipath/todos/123abc');
  });

  test('todoIncomplete: updates the completed flag for the todo to be false', () => {
    const todo = createTodo('123abcd', true);
    service.todoIncomplete(todo).catch(() => {});
    const incompleteTodo = { ...todo, completed: false };
    expect(doPatchMock.mock.calls[0][1]).toEqual(JSON.stringify(incompleteTodo));
  });

  test('todoIncomplete: ok api response, payload return with deleted id', async () => {
    const todo = createTodo('123abc');
    doPatchMock.mockReturnValue(Promise.resolve({ ok: true, data: todo }));
    const result: any = await service.todoIncomplete(todo).catch(() => {});
    const expected = { '123abc': todo };
    expect(result.payload).toEqual(expected);
    expect(result.ok).toBe(true);
  });

  test('todoIncomplete: ok api response but response invalid', async () => {
    const todo = createTodo('123abc');
    doPatchMock.mockReturnValue(Promise.resolve({ ok: true, data: undefined }));
    const result: any = await service.todoIncomplete(todo).catch(() => {});
    const expected = {};
    expect(result.payload).toEqual(expected);
    expect(result.ok).toBe(true);
  });

  test('todoIncomplete: fail api response, error data mapped', async () => {
    const todo = createTodo('123abc');
    doPatchMock.mockReturnValue(Promise.resolve({ payload: undefined, ok: false, status: 401 }));
    const result: any = await service.todoIncomplete(todo).catch(() => {});
    expect(result.payload).toEqual({ status: 401 });
    expect(result.ok).toBe(false);
  });
});
