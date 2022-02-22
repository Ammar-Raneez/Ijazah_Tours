import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif !important;
    font-family: 'Poppins', sans-serif !important;
  }

  body {
    margin: 0;
    padding: 0;
  }

  div#root {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
`;

export default GlobalStyle;