import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

import rootReducer from './../reducers';
import rootSagas from './../sagas';

const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({ ...rootReducer, routing: routerReducer });
const logger = createLogger();

export default function configureStore( initialState = {}, history ) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [ sagaMiddleware, routerMiddleware( history ), logger ];

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware( ...middlewares ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    ),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run( rootSagas );

  return store;
}
