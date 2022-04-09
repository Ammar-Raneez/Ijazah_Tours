import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Theme,
} from '@material-ui/core';
import styled from 'styled-components';
import { getAuth, signOut } from 'firebase/auth';
import clsx from 'clsx';

import LinkAtom from '../atoms/LinkAtom';
import LinkTextAtom from '../atoms/LinkTextAtom';
import ButtonAtom from '../atoms/ButtonAtom';
import { logout } from '../redux/userSlice';
import { navbarStyles } from '../styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
}));

const permLinks = [
  { key: '1', text: 'Dashboard', link: '/dashboard' },
  { key: '2', text: 'Quote', link: '/quote' },
  { key: '3', text: 'Library', link: '/library' },
  { key: '4', text: 'Settings', link: '/settings' },
];

const tempLinks = [
  { key: '1', text: 'Dashboard', link: '/dashboard' },
  { key: '2', text: 'Quote', link: '/quote' },
  { key: '3', text: 'Library', link: '/library' },
  { key: '4', text: 'Settings', link: '/settings' },
  { key: '5', text: 'View Profile', link: '/user-profile' },
];

interface SidebarProps {
  wind?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

function Sidebar({ wind, handleDrawerToggle, mobileOpen }: SidebarProps) {
  const container = wind !== undefined ? () => wind().document.body : undefined;
  const [open] = useState(true);

  const dispatch = useDispatch();
  const classes = useStyles();

  const onLogout = async () => {
    await signOut(getAuth());
    dispatch(logout());
  };

  const DrawerList = ({ type }: { type: string }) => {
    const links = type === 'perm' ? permLinks : tempLinks;

    return (
      <>
        <Divider />
        <StyledList>
          {links.map((link) => (
            <LinkAtom key={link.key} to={`${link.link}`}>
              <ListItem button>
                <LinkTextAtom text={link.text} />
              </ListItem>
            </LinkAtom>
          ))}
          {type === 'temp' && (
            <ListItem button>
              <ButtonAtom
                style={navbarStyles.logoutBtn}
                text="Sign Out"
                size="small"
                onClick={onLogout}
              />
            </ListItem>
          )}
        </StyledList>
      </>
    );
  };

  return (
    <nav className={classes.drawer} aria-label="drawable-sidebar">
      <Hidden only={['lg']} implementation="css">
        <StyledDrawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <DrawerList type="temp" />
        </StyledDrawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <StyledDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          <DrawerList type="perm" />
        </StyledDrawer>
      </Hidden>
    </nav>
  );
}

export default Sidebar;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: auto;
    background-color: #4283e4;
  }

  > * {
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
