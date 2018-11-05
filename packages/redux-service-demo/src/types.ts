import { ActionCreatorsMapObject } from 'redux';

export interface IReduxServiceDefinition {
  reducer: Function;
  types: any;
  actions: ActionCreatorsMapObject;
  forms: { [formKey: string]: string[] };
}
export interface IReduxServiceList {
  [serviceName: string]: IReduxServiceDefinition;
}

export interface IReduxServiceDemoParams {
  [paramKey: string]: string;
}
