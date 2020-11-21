import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import saga from './sagas';

const composeEnhancers =
  // @ts-ignore
  (DEV &&
  typeof window === 'object' && // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default (initialState) => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];

  const enhancers = composeEnhancers(applyMiddleware(...middlewares));

  const store = createStore(reducer, initialState || {}, enhancers);

  sagaMiddleware.run(saga);

  return store;
};
