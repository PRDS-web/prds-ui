import { useSelector } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReactRoute from '../Routes/ReactRoute.jsx';
import { useMemo } from 'react';
export default function Root () {
  const mode = useSelector((state) => state.DarkLightMode.mode) || localStorage.getItem('themeMode');
   const theme = useMemo(() => createTheme({
    palette: {
      mode: mode,
      primary: {
        main:'#edf1f4ff' , // Customize as needed
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#fff',
        paper: mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
      },
    },
  }, [mode]));

  const darkTheme = createTheme(theme);
   return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ReactRoute />
    </ThemeProvider>
  );

};