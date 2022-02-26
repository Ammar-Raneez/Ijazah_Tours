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

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
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
  { key: "2", text: "Quote", link: "/quote" },
  { key: "3", text: "Library", link: "/library" },
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
          <LinkAtom key={link.key} to={`${link.link}`}>
            <ListItem button>
              <LinkTextAtom text={link.text} />
            </ListItem>
          </LinkAtom>
        ))}
        <BottomContainer>
          <ListItem button key="Profile">
            <LinkTextAtom text="Profile" />
          </ListItem>
          <ListItem button key="Sign Out">
            <LinkTextAtom text="Sign Out" />
          </ListItem>
        </BottomContainer>
      </StyledList>
    </>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden only={["lg"]} implementation="css">
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
      <Hidden mdDown implementation="css">
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

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 0.9;
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
