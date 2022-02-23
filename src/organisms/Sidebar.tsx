import { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import {
  Divider,
  Drawer,
  Hidden,
  List,
  ListItem,
  makeStyles,
  Theme,
} from "@material-ui/core";
import LinkAtom from "../atoms/LinkAtom";
import LinkTextAtom from "../atoms/LinkTextAtom";
import DivAtom from "../atoms/DivAtom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(7) + 1,
    },
  },
}));

const links = [
  { key: "1", text: "Dashboard", link: "/dashboard" },
  { key: "2", text: "Quote", link: "/quote/quotations" },
  { key: "3", text: "Library", link: "/library/accomodation" },
];

interface SidebarProps {
  window?: () => Window;
  handleDrawerToggle: () => void;
  mobileOpen: boolean;
}

function Sidebar({ window, handleDrawerToggle, mobileOpen }: SidebarProps) {
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const classes = useStyles();
  const [open] = useState(true);

  const drawer = (
    <>
      <Divider />
      <StyledList>
        {links.map((link) => (
          <LinkAtom key={link.key} to={link.link}>
            <ListItem button>
              <LinkTextAtom text={link.text} />
            </ListItem>
          </LinkAtom>
        ))}
        <DivAtom
          flex={0.93}
          display="flex"
          flexdirection="column"
          justify="flex-end"
        >
          <ListItem button key="Profile">
            <LinkTextAtom text="Profile" />
          </ListItem>
          <ListItem button key="Sign Out">
            <LinkTextAtom text="Sign Out" />
          </ListItem>
        </DivAtom>
      </StyledList>
    </>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden only="lg" implementation="css">
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
          {drawer}
        </StyledDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <StyledDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
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
