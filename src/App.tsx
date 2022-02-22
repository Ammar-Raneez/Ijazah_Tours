import Header from "./organisms/Header";
import GlobalStyle from "./globalStyle";
import Sidebar from "./organisms/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./organisms/Navbar";
import Quotations from "./organisms/quote/Quotations";
import Voucher from "./organisms/quote/Voucher";
import Summary from "./organisms/quote/Summary";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <Container>
        <Sidebar />
        <Switch>
          <Route path="/dashboard">
            <Navbar type="dashboard" />
          </Route>
          <Route path="/quote">
            <MainContent>
              <Navbar type="quote" />
              <Route path="/quote/quotations">
                <Quotations />
              </Route>
              <Route path="/quote/voucher">
                <Voucher />
              </Route>
              <Route path="/quote/summary">
                <Summary />
              </Route>
            </MainContent>
          </Route>
          <Route path="/library">
            <Navbar type="library" />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;

const Container = styled.div`
  display: flex;
  height: 91.5vh;
`;

const MainContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  > div:nth-child(2) {
    flex: 1;
  }
`
