import { useState } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import styled from 'styled-components';

import Quotations from './pages/quote/quotation/Quotations';
import Voucher from './pages/quote/voucher/Voucher';
import Summary from './pages/quote/summary/Summary';
import Accomodation from './pages/library/accomodation/Accomodation';
import Driver from './pages/library/driver/Driver';
import Guest from './pages/library/guest/Guest';
import Dashboard from './pages/dashboard/Dashboard';
import SettingsAccomodation from './pages/settings/accomodation/SettingsAccomodation';
import Tour from './pages/settings/tour/Tour';
import UserManagement from './pages/settings/user-management/UserManagement';
import Header from './organisms/Header';
import Sidebar from './organisms/Sidebar';
import Navbar from './organisms/Navbar';
import GlobalStyle from './globalStyle';
import General from './pages/settings/general/General';

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
            <StyledDivAtom>
              <Dashboard />
            </StyledDivAtom>
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
          <Route path="/settings">
            <StyledDivAtom>
              <Navbar type="settings" />
              <Route path="/settings/accomodation">
                <SettingsAccomodation />
              </Route>
              <Route path="/settings/tour">
                <Tour />
              </Route>
              <Route path="/settings/user-management">
                <UserManagement />
              </Route>
              <Route path="/settings/general">
                <General />
              </Route>
              <Route exact path="/settings">
                <Redirect to="/settings/user-management" />
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
