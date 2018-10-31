import {
  combineReducers,
  createStore,
  applyMiddleware,
} from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import { initializeDemoStore } from '../redux';
import { configure } from '../../config';
import exampleServices from '../../__tests__/example-services';

jest.mock('redux', () => ({
  createStore: jest.fn(),
  combineReducers: jest.fn(),
  applyMiddleware: jest.fn(),
}));

const expectedReducers = {
  serviceA: exampleServices.serviceA.reducer,
  serviceB: exampleServices.serviceB.reducer,
};

test('creates a redux store with logging disabled using the provided state', () => {
  configure({ useLogger: false });
  initializeDemoStore(exampleServices);
  expect(combineReducers).toHaveBeenCalledWith(expectedReducers);
  expect(applyMiddleware).toHaveBeenCalledWith(reduxThunk);
  expect(createStore).toHaveBeenCalled();
});

test('creates a redux store with logging enabled using the provided services object', () => {
  configure({ useLogger: true });
  initializeDemoStore(exampleServices);
  expect(combineReducers).toHaveBeenCalledWith(expectedReducers);
  expect(applyMiddleware).toHaveBeenCalledWith(reduxThunk, reduxLogger);
  expect(createStore).toHaveBeenCalled();
});
