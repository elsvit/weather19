import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import location, { LocationStateT } from './location';
import common, { CommonStateT } from './common';
import sagas from './sagas';

export interface IAppState {
  location: LocationStateT;
  common: CommonStateT;
}

const reducers = combineReducers<IAppState>({
  location,
  common,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagas.forEach((saga: any) => sagaMiddleware.run(saga));

export default store;
