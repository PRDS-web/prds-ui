import { configureStore } from '@reduxjs/toolkit'
import  DarkLightModeReducer  from '../Slice/DarkLightSlice.js';
import  UserReducer from '../Slice/UserLoginSlice.js';
import ProfileReducer from '../Slice/ProfileSlice.js';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';


const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  DarkLightMode: DarkLightModeReducer,
  user: UserReducer,
  profile: ProfileReducer,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed to avoid persist-related warnings
    }),
});

export const persistor = persistStore(store);
