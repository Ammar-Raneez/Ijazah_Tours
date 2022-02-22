import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Lato', sans-serif;
    font-family: 'Poppins', sans-serif;
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