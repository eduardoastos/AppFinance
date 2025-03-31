import { createGlobalStyle } from 'styled-components';
// import { ThemeType } from './themes/dark';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
  }
  
  .root-layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .content-container {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100%;
  }

  .main-content {
    flex: 1;
    margin-left: 400px;
    margin-top: 120px;
    overflow-x: hidden;
  }
`;