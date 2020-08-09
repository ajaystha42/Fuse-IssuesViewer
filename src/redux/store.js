import { createStore, applyMiddleware, compose } from "redux";

import reducer from './reducers'

import promiseMiddleware from 'redux-promise';


const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(promiseMiddleware)
)

const store = createStore(reducer, enhancer)

export default store
