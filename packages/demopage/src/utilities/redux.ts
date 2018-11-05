import {
  combineReducers,
  createStore,
  applyMiddleware,
  ReducersMapObject,
} from 'redux';
import reduxThunk from 'redux-thunk';
import reduxLogger from 'redux-logger';

export const demoStore = (reducers: ReducersMapObject) => {
  const combinedReducers = combineReducers(reducers);
  const middlewares = [reduxThunk, reduxLogger];
  return createStore(combinedReducers, applyMiddleware(...middlewares));
};
