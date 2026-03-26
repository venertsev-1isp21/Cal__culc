import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { queryClient } from './queryClient';
import { store } from './app/store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>

        <ReactQueryDevtools initialIsOpen={false} />
      </React.StrictMode>
    </QueryClientProvider>
  </Provider>
);

reportWebVitals();
