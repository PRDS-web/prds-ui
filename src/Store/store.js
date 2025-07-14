import { configureStore } from '@reduxjs/toolkit'
import  DarkLightModeReducer  from '../Slice/DarkLightSlice.js';

export const store = configureStore({
  reducer: {
    DarkLightMode: DarkLightModeReducer
  },
})