import { createSlice } from '@reduxjs/toolkit';

const savedMode = localStorage.getItem('themeMode') || 'light';
const initialState = {
  isLightMode: savedMode === 'light',
  mode: savedMode,
}

export const DarkLightMode = createSlice({
  name: 'DarkLightMode',
  initialState,
  reducers: {
    enableLightMode: (state) => {
      state.isLightMode = true;
      state.mode = 'light';
        localStorage.setItem('themeMode', 'light');
    },
    disableLightMode: (state) => {
      state.isLightMode = false;
      state.mode = 'dark';
      localStorage.setItem('themeMode', 'dark');
    }
  },
})

// Action creators are generated for each case reducer function
export const { enableLightMode, disableLightMode } = DarkLightMode.actions;

export default DarkLightMode.reducer;