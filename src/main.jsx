import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store, persistor } from './Store/store.js';
import { Provider } from 'react-redux';
import Root from './Root/Root.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
console.log()
createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="878291443758-hm626oec8qtjbtftrt49j38hqoj1l64i.apps.googleusercontent.com">
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);
