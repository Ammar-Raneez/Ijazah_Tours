import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

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
import DivAtom from './atoms/DivAtom';
import { onSizeChange } from './redux/containerSizeSlice';
import { login, logout } from './redux/userSlice';
import ProtectedRoute from './utils/ProtectedRoute';
import { getUserOnLogin, widthHeightDynamicStyle } from './utils/helpers';
import GlobalStyle from './globalStyle';
import { fetchingDataIndicatorStyles } from './styles';

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [getInitialUser, setGetInitialUser] = useState(false);

  const [withNavbarHeight, setWithNavbarHeight] = useState(0);
  const [withNavbarWidth, setWithNavbarWidth] = useState(0);
  const [withoutNavbarHeight, setWithoutNavbarHeight] = useState(0);
  const [withoutNavbarWidth, setWithoutNavbarWidth] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(getAuth(), async (usr) => {
      if (usr) {
        setGetInitialUser(false);
        const userData = await getUserOnLogin(usr);
        dispatch(login(userData));
        setGetInitialUser(true);
      } else {
        setGetInitialUser(false);
        dispatch(logout());
        setGetInitialUser(true);
      }
    });
  }, []);

  useEffect(() => {
    setWithNavbarHeight(
      widthHeightDynamicStyle(
        window.innerWidth,
        1400,
        window.innerHeight - 170,
        window.innerHeight - 160,
      ) as number,
    );
    setWithoutNavbarHeight(
      widthHeightDynamicStyle(
        window.innerWidth,
        1400,
        window.innerHeight - 120,
        window.innerHeight - 110,
      ) as number,
    );

    setWithNavbarWidth(window.innerWidth);
    setWithoutNavbarWidth(window.innerWidth);
    dispatchContainerSize();

    const widthListener = window.addEventListener('resize', () => {
      setWithNavbarWidth(window.innerWidth);
      dispatchContainerSize();
    });
    const heightListener = window.addEventListener('resize', () => {
      setWithNavbarHeight(window.innerHeight - 160);
      dispatchContainerSize();
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', heightListener as any);
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [withNavbarWidth, withoutNavbarWidth, withNavbarHeight, withoutNavbarHeight]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const dispatchContainerSize = () => {
    dispatch(
      onSizeChange({
        withNavbarWidth: window.innerWidth,
        withoutNavbarWidth: window.innerWidth,
        withNavbarHeight: widthHeightDynamicStyle(
          window.innerWidth,
          1400,
          window.innerHeight - 170,
          window.innerHeight - 160,
        ) as number,
        withoutNavbarHeight: widthHeightDynamicStyle(
          window.innerWidth,
          1400,
          window.innerHeight - 120,
          window.innerHeight - 110,
        ) as number,
      }),
    );
  };

  return (
    <>
      <Router>
        <GlobalStyle />
        {getInitialUser ? (
          <Switch>
            <ProtectedRoute path="/dashboard">
              <>
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
              </>
            </ProtectedRoute>
            <ProtectedRoute path="/quote">
              <Header handleDrawerToggle={handleDrawerToggle} />
              <Root>
                <Sidebar
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
                <StyledDivAtom>
                  <Navbar type="quote" />
                  <ProtectedRoute path="/quote/quotations">
                    <Quotations />
                  </ProtectedRoute>
                  <ProtectedRoute path="/quote/voucher">
                    <Voucher />
                  </ProtectedRoute>
                  <ProtectedRoute path="/quote/summary">
                    <Summary />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/quote">
                    <Redirect to="/quote/quotations" />
                  </ProtectedRoute>
                </StyledDivAtom>
              </Root>
            </ProtectedRoute>
            <ProtectedRoute path="/library">
              <Header handleDrawerToggle={handleDrawerToggle} />
              <Root>
                <Sidebar
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
                <StyledDivAtom>
                  <Navbar type="library" />
                  <ProtectedRoute path="/library/accomodation">
                    <Accomodation />
                  </ProtectedRoute>
                  <ProtectedRoute path="/library/driver">
                    <Driver />
                  </ProtectedRoute>
                  <ProtectedRoute path="/library/guest">
                    <Guest />
                  </ProtectedRoute>
                  <ProtectedRoute exact path="/library">
                    <Redirect to="/library/accomodation" />
                  </ProtectedRoute>
                </StyledDivAtom>
              </Root>
            </ProtectedRoute>
            <ProtectedRoute path="/settings">
              <Header handleDrawerToggle={handleDrawerToggle} />
              <Root>
                <Sidebar
                  mobileOpen={mobileOpen}
                  handleDrawerToggle={handleDrawerToggle}
                />
                <StyledDivAtom>
                  <Navbar type="settings" />
                  <ProtectedRoute path="/settings/accomodation">
                    <SettingsAccomodation />
                  </ProtectedRoute>
                  <ProtectedRoute path="/settings/tour">
                    <Tour />
                  </ProtectedRoute>
                  <ProtectedRoute path="/settings/user-management">
                    <UserManagement />
                  </ProtectedRoute>
                  <ProtectedRoute path="/settings/general">
                    <General />
                  </ProtectedRoute>
                  <Route exact path="/settings">
                    <Redirect to="/settings/user-management" />
                  </Route>
                </StyledDivAtom>
              </Root>
            </ProtectedRoute>

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
        ) : (
          <DivAtom
            style={{
              ...fetchingDataIndicatorStyles.container,
              height: '100vh',
            }}
          >
            <CircularProgress size={50} color="primary" />
          </DivAtom>
        )}
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
