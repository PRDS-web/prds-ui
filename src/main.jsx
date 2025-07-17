import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store,persistor } from './Store/store.js';
import { Provider } from 'react-redux';
import Root from './Root/Root.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@mui/material';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<CircularProgress />} persistor={persistor}>
        <Root />
      </PersistGate>
    </Provider>
  </StrictMode>
);
