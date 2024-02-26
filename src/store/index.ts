import { combineReducers, configureStore } from '@reduxjs/toolkit';
import settingsReducer from './reducers/settingsSlice';
import utilityReducer from './reducers/utilitySlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  utility: utilityReducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
