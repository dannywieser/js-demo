import {
  actionAsync,
  INITIAL_ASYNC_STATE,
  createReducer,
  reducerAsyncActions,
  typeOK,
  apiOnly,
  withoutApi,
  asValues,
  apiStateOK,
  IBaseState,
  IAction,
  IApiState,
} from 'redux-service-util';
import { ITodo, ITodosState } from '.';
import * as service from './todos-service';

export const INITIAL_STATE = INITIAL_ASYNC_STATE;

export enum types {
  todosList = 'todosList',
  todoAdd = 'todoAdd',
  todoDelete = 'todoDelete',
  todoComplete = 'todoComplete',
  todoIncomplete = 'todoIncomplete',
}

// action creators
const todosListOptions = {
  type: types.todosList,
  fetched: true,
  handler: service.todosList,
};
const todosList = () => actionAsync(todosListOptions);
const todoAddOptions = {
  type: types.todoAdd,
  updating: 'new',
  handler: service.todoAdd,
};
const todoAdd = (todo: ITodo)  => actionAsync(todoAddOptions, todo);
const todoDeleteOptions = (todoId: string) => ({
  type: types.todoDelete,
  updating: todoId,
  handler: service.todoDelete,
});
const todoDelete = (todoId: string) => actionAsync(todoDeleteOptions(todoId), todoId);
const todoCompleteOptions = (todo: ITodo) => ({
  type: types.todoComplete,
  updating: todo.id,
  handler: service.todoComplete,
});
const todoComplete = (todo: ITodo) => actionAsync(todoCompleteOptions(todo), todo);
const todoIncompleteOptions = (todo: ITodo) => ({
  type: types.todoIncomplete,
  updating: todo.id,
  handler: service.todoIncomplete,
});
const todoIncomplete = (todo: ITodo) => actionAsync(todoIncompleteOptions(todo), todo);

export const actions: {[actionName: string]: Function} = {
  todosList,
  todoAdd,
  todoDelete,
  todoComplete,
  todoIncomplete,
};

export const todoDeleteOK = (state: IBaseState, action: IAction) => {
  const { id  } = action.payload as any;
  const { [id.toString()]: value, ...withoutDeleted } = state as any;
  const { api } = state;
  return { ...withoutDeleted, api: apiStateOK(api) };
};

// standard async actions, handled via bb-js-data-service-util helpers
const asyncActions = [
  types.todosList,
  types.todoAdd,
  types.todoDelete,
  types.todoComplete,
  types.todoIncomplete,
];

export const reducerMap = {
  ...reducerAsyncActions(
    asyncActions,
    { [typeOK(types.todoDelete)]: (state: IBaseState, action: IAction) => todoDeleteOK(state, action) },
  ),
};
export const reducer = createReducer(INITIAL_STATE, reducerMap);

// selectors
const allTodos = (state: ITodosState): { [id: string]: ITodo } => withoutApi(state.todos);
const allTodosAsArray = (state: ITodosState) => asValues(state.todos) as ITodo[];
const apiState = (state: ITodosState): IApiState => apiOnly(state.todos);
export const select = { allTodos, allTodosAsArray, apiState };
