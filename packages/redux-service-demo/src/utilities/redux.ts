import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { config } from '../config';
import { IReduxServiceList } from '../types';

export function initializeDemoStore(services: IReduxServiceList) {
  const servicesReducer = (state: Object, service: string) => ({ ...state, [service]: services[service].reducer });
  const allServiceReducers = Object.keys(services).reduce(servicesReducer, {});
  const combinedReducers = combineReducers(allServiceReducers);
  const middlewares = [reduxThunk];
  if (config.useLogger) {
    middlewares.push(reduxLogger);
  }
  return createStore(combinedReducers, applyMiddleware(...middlewares));
}
