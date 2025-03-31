import React, { useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import { GlobalStyles } from './globals';
import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';

const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Recupera o tema do localStorage ou usa o padrão
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'lightTheme';
  });
  
  // Salva no localStorage sempre que o tema mudar
  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);
  
  const theme = currentTheme === 'lightTheme' ? lightTheme : darkTheme;
  
  // Função para alternar o tema
  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="root-layout">
        <Header 
          currentTheme={currentTheme} 
          onThemeChange={handleThemeChange} 
        />
        <div className="content-container">
          <Sidebar activeItem="dashboard" />
          <main className="main-content">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;