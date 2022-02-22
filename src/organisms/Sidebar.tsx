import { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import clsx from "clsx";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const drawerWidth = 240;

const useStyles = makeStyles((theme: any) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
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

function Sidebar() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  return (
    <StyledDrawer
      variant="permanent"
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
    >
      <Divider />
      <StyledList>
        {links.map((link) => {
          return (
            <NavLink
              activeClassName="navigation-link--active"
              key={uuid()}
              className="navigation-link"
              to={link.link}
            >
              <ListItem button key={link.key}>
                <StyledListItemText primary={link.text} />
              </ListItem>
            </NavLink>
          );
        })}
        <LogContainer>
          <ListItem button key="Profile">
            <StyledListItemText primary="Profile" />
          </ListItem>
          <ListItem button key="Collapse" onClick={() => setOpen(!open)}>
            <StyledListItemText primary={open ? "Collapse" : "Expand"} />
          </ListItem>
          <ListItem button key="Sign Out">
            <StyledListItemText primary="Sign Out" />
          </ListItem>
        </LogContainer>
      </StyledList>
    </StyledDrawer>
  );
}

export default Sidebar;

const StyledDrawer = styled(Drawer)`
  .MuiDrawer-paper {
    top: auto;
    height: 92%;
    background-color: #4283e4;
  }

  > * {
    ::-webkit-scrollbar {
      display: none;
    }
  }

  .navigation-link {
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
    &--active {
      background-color: #7ba8ec;
    }
  }
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const StyledListItemText = styled(ListItemText)`
  color: white;

  .MuiListItemText-primary {
    font-weight: 600;
    font-size: 1.4rem;
  }
`;

const LogContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

