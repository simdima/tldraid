import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import settingsReducer from './reducers/settingsSlice';
import utilityReducer from './reducers/utilitySlice';

const rootReducer = combineReducers({
  settings: settingsReducer,
  utility: utilityReducer,
});

const persistedReducer = persistReducer(
  {
    key: 'tldraid',
    storage,
    version: 4,
    blacklist: ['utility'],
  },
  rootReducer
);

const setupStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
        },
      }),
  });

const store = setupStore();
const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export { persistor };
export default store;
