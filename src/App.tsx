import Header from "./organisms/Header";
import GlobalStyle from "./globalStyle";
import Sidebar from "./organisms/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Container>
        <Sidebar />
        <Switch>
          <Route path="/">
            <p>Test</p>
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
`;
