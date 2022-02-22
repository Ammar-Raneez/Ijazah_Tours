import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
  }

  div#root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;