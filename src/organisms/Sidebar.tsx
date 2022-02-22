import { useState } from "react";
import styled from "styled-components";
import clsx from "clsx";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  makeStyles,
} from "@material-ui/core";
import LinkAtom from "../atoms/LinkAtom";
import LinkTextAtom from "../atoms/LinkTextAtom";

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
          <LinkAtom to={link.link}>
            <ListItem button key={link.key}>
              <LinkTextAtom text={link.text} />
            </ListItem>
          </LinkAtom>
        ))}
        <BottomContainer>
          <ListItem button key="Profile">
            <LinkTextAtom text="Profile" />
          </ListItem>
          <ListItem button key="Collapse" onClick={() => setOpen(!open)}>
            <LinkTextAtom text={open ? "Collapse" : "Expand"} />
          </ListItem>
          <ListItem button key="Sign Out">
            <LinkTextAtom text="Sign Out" />
          </ListItem>
        </BottomContainer>
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
`;

const StyledList = styled(List)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const BottomContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
