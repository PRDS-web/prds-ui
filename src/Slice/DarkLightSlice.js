import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLightMode: true,
  mode: localStorage.getItem('themeMode') || 'light'
}

export const DarkLightMode = createSlice({
  name: 'DarkLightMode',
  initialState,
  reducers: {
    enableLightMode: (state) => {
      state.isLightMode = true;
      state.mode ='light';
    },
    disableLightMode: (state) => {
      state.isLightMode = false;
      state.mode ='dark';
    }
  },
})

// Action creators are generated for each case reducer function
export const { enableLightMode, disableLightMode } = DarkLightMode.actions;

export default DarkLightMode.reducer;