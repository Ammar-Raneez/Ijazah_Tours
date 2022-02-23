import {
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import AvatarAtom from "../atoms/AvatarAtom";
import DivAtom from "../atoms/DivAtom";
import SpanAtom from "../atoms/SpanAtom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  })
);

interface HeaderProps {
  handleDrawerToggle: () => void;
}

function Header({ handleDrawerToggle }: HeaderProps) {
  const classes = useStyles();

  return (
    <DivAtom
      backgroundcolor="#C1BFBF"
      display="flex"
      justify="space-between"
      align="center"
      padding="0 0 0 1rem"
    >
      <DivAtom display="flex" align="center">
        <AvatarAtom
          margin="0px 20px 0px 0px"
          alt="Logo"
          image={require("../assets/logo.png")}
          size={60}
        />
        <Hidden xsDown>
          <SpanAtom
            margin="0px 12px 0px 0px"
            weight={500}
            size="40px"
            text="Ijazah"
            color="#1C5BBA"
          />
          <SpanAtom
            margin="0px 0px 0px 0px"
            weight={500}
            size="40px"
            text="Tours"
            color="#41E93E"
          />
        </Hidden>
      </DivAtom>
      <DivAtom>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
      </DivAtom>
    </DivAtom>
  );
}

export default Header;
