import { createStore, combineReducers } from 'redux';
import gameReducer from './reducers/gameReducer';
import seasonReducer from './reducers/seasonReducer';

const rootReducer = combineReducers({
  game: gameReducer,
  seasons:seasonReducer,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);