import { configureStore } from '@reduxjs/toolkit'
import  DarkLightModeReducer  from '../Slice/DarkLightSlice.js';
import  UserReducer from '../Slice/UserLoginSlice.js';
import ProfileReducer from '../Slice/ProfileSlice.js';
import storage from 'redux-persist/lib/storage'; 
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';
import EnquirySlice from '../Slice/EnquirySlice.js';
import JobSlice from '../Slice/JobSlice.js';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'DarkLightMode']
};

const rootReducer = combineReducers({
  DarkLightMode: DarkLightModeReducer,
  user: UserReducer,
  profile: ProfileReducer,
  enquiry: EnquirySlice,
  jobstore: JobSlice,
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
