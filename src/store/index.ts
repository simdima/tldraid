import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadAndErrorReducer from './reducers/loadAndErrorSlice';
import settingsReducer from './reducers/settingsSlice';
import utilityReducer from './reducers/utilitySlice';
import tldraidApi from './service/tldraidApi';

const rootReducer = combineReducers({
  settings: settingsReducer,
  utility: utilityReducer,
  loadAndError: loadAndErrorReducer,
  [tldraidApi.reducerPath]: tldraidApi.reducer,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(tldraidApi.middleware),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export default setupStore;
