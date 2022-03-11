import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';
import Header from './organisms/Header';
import GlobalStyle from './globalStyle';
import Sidebar from './organisms/Sidebar';
import Navbar from './organisms/Navbar';
import Quotations from './pages/quote/quotation/Quotations';
import Voucher from './pages/quote/voucher/Voucher';
import Summary from './pages/quote/summary/Summary';
import Accomodation from './pages/library/accomodation/Accomodation';
import Driver from './pages/library/driver/Driver';
import Guest from './pages/library/guest/Guest';
import Tasks from './pages/task/tasks/Tasks';
import Customer from './pages/task/customer/Customer';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Router>
      <GlobalStyle />
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Root>
        <Sidebar
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Switch>
          <Route path="/dashboard">
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
              <Route exact path="/quote">
                <Redirect to="/quote/quotations" />
              </Route>
            </StyledDivAtom>
          </Route>
          <Route path="/library">
            <StyledDivAtom>
              <Navbar type="library" />
              <Route path="/library/accomodation">
                <Accomodation />
              </Route>
              <Route path="/library/driver">
                <Driver />
              </Route>
              <Route path="/library/guest">
                <Guest />
              </Route>
              <Route exact path="/library">
                <Redirect to="/library/accomodation" />
              </Route>
            </StyledDivAtom>
          </Route>
          <Route path="/task">
            <StyledDivAtom>
              <Navbar type="task" />
              <Route path="/task/tasks">
                <Tasks />
              </Route>
              <Route path="/task/customer">
                <Customer />
              </Route>
              <Route exact path="/task">
                <Redirect to="/task/tasks" />
              </Route>
            </StyledDivAtom>
          </Route>
        </Switch>
      </Root>
    </Router>
  );
}

export default App;

const Root = styled.div`
  display: flex;
  flex: 1;
`;

const StyledDivAtom = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;

  > div:nth-child(2) {
    flex: 1;
  }
`;
