import Header from "./organisms/Header";
import GlobalStyle from "./globalStyle";
import Sidebar from "./organisms/Sidebar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./organisms/Navbar";
import Quotations from "./organisms/quote/Quotations";
import Voucher from "./organisms/quote/Voucher";
import Summary from "./organisms/quote/Summary";
import DivAtom from "./atoms/DivAtom";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Header />
      <DivAtom
        display="flex"
        flex={1}
      >
        <Sidebar />
        <Switch>
          <Route path="/dashboard">
            <Navbar type="dashboard" />
          </Route>
          <Route path="/quote">
            <StyledDivAtom>
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
            </StyledDivAtom>
          </Route>
          <Route path="/library">
            <Navbar type="library" />
          </Route>
        </Switch>
      </DivAtom>
    </Router>
  );
}

export default App;

const StyledDivAtom = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  > div:nth-child(2) {
    flex: 1;
  }
`
