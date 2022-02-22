import { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import { Divider, Drawer, List, ListItem, makeStyles } from "@material-ui/core";
import LinkAtom from "../atoms/LinkAtom";
import LinkTextAtom from "../atoms/LinkTextAtom";
import DivAtom from "../atoms/DivAtom";

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
        {links.map((link) => (
          <LinkAtom key={link.key} to={link.link}>
            <ListItem button>
              <LinkTextAtom text={link.text} />
            </ListItem>
          </LinkAtom>
        ))}
        <DivAtom
          flex={1}
          display="flex"
          flexdirection="column"
          justify="flex-end"
        >
          <ListItem button key="Profile">
            <LinkTextAtom text="Profile" />
          </ListItem>
          <ListItem button key="Collapse" onClick={() => setOpen(!open)}>
            <LinkTextAtom text={open ? "Collapse" : "Expand"} />
          </ListItem>
          <ListItem button key="Sign Out">
            <LinkTextAtom text="Sign Out" />
          </ListItem>
        </DivAtom>
      </StyledList>
    </StyledDrawer>
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
