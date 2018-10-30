import { IBaseState } from 'redux-service-util';

export * from './todos-service';
export * from './todos-state';

export interface ITodosState {
  todos: IBaseState;
}

export interface ITodoResponse {
  ok: boolean;
  payload: any;
}

export interface ITodo {
  id?: string;
  title: string;
  completed: boolean;
}
