import './index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App.tsx';
import AppErrorContextProvider from './context/AppErrorContext.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppErrorContextProvider>
        <App />
      </AppErrorContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
