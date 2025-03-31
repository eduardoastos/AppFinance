import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './app/contexts/AuthContext';
import AppRoutes from './app/routes';
import { GlobalStyles } from './app/globals';
import { darkTheme } from './app/themes/dark';
import {lightTheme } from './app/themes/light';

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = React.useState('lightTheme');
  const theme = currentTheme === 'lightTheme' ? lightTheme : darkTheme;

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);