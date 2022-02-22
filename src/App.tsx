import Header from "./organisms/Header";
import GlobalStyle from "./globalStyle";
import Sidebar from "./organisms/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./organisms/Navbar";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Container>
        <Sidebar />
        <Switch>
          <Route path="/">
            <Navbar type="dashboard" />
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
