'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import { Provider as ReduxProvider } from 'react-redux';
import  store  from "./store/index";

export default function Providers({ children }) {
  return (

    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
