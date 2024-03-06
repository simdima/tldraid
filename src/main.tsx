import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import setupStore from './store/index.ts';
import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={setupStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
