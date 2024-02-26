import { combineReducers, configureStore } from '@reduxjs/toolkit';
import settingsReducer from './reducers/settingsSlice';
import utilityReducer from './reducers/utilitySlice';
import tldraidApi from './service/tldraidApi';

const rootReducer = combineReducers({
  settings: settingsReducer,
  utility: utilityReducer,
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
