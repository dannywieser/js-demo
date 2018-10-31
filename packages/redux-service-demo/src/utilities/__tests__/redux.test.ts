import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { initializeDemoStore } from '../redux';
import { configure } from '../../config';
import services from '../../__tests__/example-services';

jest.mock('redux', () => ({
  createStore: jest.fn(),
  combineReducers: jest.fn(),
  applyMiddleware: jest.fn(),
}));

const expectedReducers = {
  serviceA: services.serviceA.reducer,
  serviceB: services.serviceB.reducer,
};

test('creates a redux store with logging disabled using the provided state', () => {
  configure({ useLogger: false });
  initializeDemoStore(services);
  expect(combineReducers).toHaveBeenCalledWith(expectedReducers);
  expect(applyMiddleware).toHaveBeenCalledWith(thunk);
  expect(createStore).toHaveBeenCalled();
});

test('creates a redux store with logging enabled using the provided services object', () => {
  configure({ useLogger: true });
  initializeDemoStore(services);
  expect(combineReducers).toHaveBeenCalledWith(expectedReducers);
  expect(applyMiddleware).toHaveBeenCalledWith(thunk, logger);
  expect(createStore).toHaveBeenCalled();
});
