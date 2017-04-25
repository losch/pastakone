import {createStore, combineReducers, Reducer, Store, compose} from 'redux';
import persistState from 'redux-localstorage'
import settings, {SettingsState} from './settings';

export interface StoreInterface {
  settings: SettingsState
}

// Root reducer
const rootReducer = combineReducers(
  {
    settings: settings
  }
) as Reducer<StoreInterface>;

// Middlewares
const enhancer = compose(
  persistState(['settings'], {key: 'pastakone'}),
);

const store: Store<StoreInterface> = createStore(rootReducer, enhancer);

export default store;
