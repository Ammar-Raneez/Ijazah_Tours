import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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
import General from './pages/settings/general/General';
import Login from './pages/login/Login';
import Header from './organisms/Header';
import Sidebar from './organisms/Sidebar';
import Navbar from './organisms/Navbar';
import { onSizeChange } from './redux/containerSizeSlice';
import GlobalStyle from './globalStyle';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setHeight(window.innerHeight - 180);
    setWidth(window.innerWidth);
    dispatch(
      onSizeChange({
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    );

    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      dispatch(
        onSizeChange({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      );
    });
    const heightListener = window.addEventListener('resize', () => {
      setHeight(window.innerHeight - 180);
      dispatch(
        onSizeChange({
          width: window.innerWidth,
          height: window.innerHeight,
        }),
      );
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [width, height]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <Router>
        <GlobalStyle />
        <Switch>
          <Route path="/dashboard">
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Root>
              <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
              <StyledDivAtom>
                <Dashboard />
              </StyledDivAtom>
            </Root>
          </Route>
          <Route path="/quote">
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Root>
              <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
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
            </Root>
          </Route>
          <Route path="/library">
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Root>
              <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
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
            </Root>
          </Route>
          <Route path="/settings">
            <Header handleDrawerToggle={handleDrawerToggle} />
            <Root>
              <Sidebar
                mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}
              />
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
            </Root>
          </Route>

          <Route path="/login">
            <StyledDivAtom isFullScreen>
              <Login />
            </StyledDivAtom>
          </Route>
          <Route exact path="/">
            <StyledDivAtom isFullScreen>
              <Login />
            </StyledDivAtom>
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;

interface StyledDivProps {
  isFullScreen?: boolean;
}

const Root = styled.div`
  display: flex;
  flex: 1;
`;

const StyledDivAtom = styled.div<StyledDivProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow-x: scroll;

  ${({ isFullScreen }) => isFullScreen && fullScreenOverflowStyle}

  > div:nth-child(2) {
    flex: 1;
  }
`;

const fullScreenOverflowStyle = `
  overflow: visible;
`;
