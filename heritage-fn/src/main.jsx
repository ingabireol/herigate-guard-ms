import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import  { thunk }  from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import './index.css';
import reducers from './reducers/index.reducer';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Create Redux store
const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </StrictMode>
);