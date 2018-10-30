import { doPatch, doFetch, doPost, doDelete } from 'redux-service-util';
import { config } from '../config';
import { ITodo, ITodoResponse } from '.';

export const apiPath = (path: string) => `${config.apiBasePath}${path}`;

const TODOS_PATH = '/todos';
const todosPath = () => apiPath(TODOS_PATH);
const todoPath = (todoId: string) => `${apiPath(TODOS_PATH)}/${todoId}`;

export const mapTodoPayload = (data: ITodo = undefined): {[id: string]: ITodo} => {
  const { id = '' } = data || {};
  return id ? { [id]: { ...data } } : {};
};

export const body = (todo: ITodo, update = {}) => JSON.stringify({ ...todo, ...update });
export const patchTodo = async (todo: ITodo, patchBody: string): Promise<ITodoResponse> => {
  const { id } = todo;
  const { ok, data, status } = await doPatch(todoPath(id), patchBody);
  const payload = ok ? mapTodoPayload(data) : { ...data, status };
  return { ok, payload };
};

const todoReduce = (todos: ITodo[], todo: ITodo) => ({ ...todos, [todo.id]: { ...todo } });
export const todosList = async (): Promise<ITodoResponse> => {
  const { ok, data, status } = await doFetch(todosPath());
  const payload = ok ? data.reduce(todoReduce, {}) : { ...data, status };
  return { ok, payload };
};

export const todoAdd = async (todo: ITodo): Promise<ITodoResponse>  => {
  const { id, ...scrubbedTodo } = todo;
  const { ok, data, status } = await doPost(todosPath(), body(scrubbedTodo));
  const payload = ok ? mapTodoPayload(data) : { ...data, status };
  return { ok, payload };
};

export const todoDelete = async (id: string): Promise<ITodoResponse> => {
  const { ok, data, status } = await doDelete(todoPath(id));
  const payload = ok ? { id } : { ...data, status };
  return { ok, payload };
};

export const todoComplete = async (todo: ITodo) => patchTodo(todo, body(todo, { completed: true }));
export const todoIncomplete = async (todo: ITodo) => patchTodo(todo, body(todo, { completed: false }));
