import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { config } from '../config';
import { IReduxServiceList } from '../types';

export function initializeDemoStore(services: IReduxServiceList) {
  const servicesReducer = (state: Object, service: string) => ({ ...state, [service]: services[service].reducer });
  const allServiceReducers = Object.keys(services).reduce(servicesReducer, {});
  const combinedReducers = combineReducers(allServiceReducers);
  const middlewares = [thunk];
  if (config.useLogger) {
    middlewares.push(logger);
  }
  return createStore(combinedReducers, applyMiddleware(...middlewares));
}
