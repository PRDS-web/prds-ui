import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { store } from './Store/store.js';
import { Provider } from 'react-redux';
import Root from './Root/Root.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <Root />
    </Provider>
  </StrictMode>
);
