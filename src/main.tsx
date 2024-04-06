import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import AppErrorContextProvider from './context/AppErrorContext.tsx';
import store, { persistor } from './store/index.ts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppErrorContextProvider>
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}>
            <App />
          </PersistGate>
        </Provider>
      </AppErrorContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
