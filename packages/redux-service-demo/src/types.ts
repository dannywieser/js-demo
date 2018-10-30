import { ActionCreatorsMapObject } from 'redux';

export interface IReduxServiceDefinition {
  reducer: Function;
  types: { [typeKey: string]: string };
  actions: ActionCreatorsMapObject;
  forms: { [formKey: string]: string[] };
}
export interface IReduxServiceList {
  [serviceName: string]: IReduxServiceDefinition;
}

export interface IReduxServiceDemoParams {
  [paramKey: string]: string;
}
