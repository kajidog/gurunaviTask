import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

export default function createStore() {
  return reduxCreateStore(
    combineReducers({
      ...reducers,
    }),
    applyMiddleware(
      logger,
      thunk,
    )
  );
}
