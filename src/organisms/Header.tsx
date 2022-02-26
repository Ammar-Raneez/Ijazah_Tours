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
      [theme.breakpoints.up("lg")]: {
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
      style={{
        backgroundColor: "#C1BFBF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: "1rem",
      }}
    >
      <DivAtom style={{ display: "flex", alignItems: "center" }}>
        <AvatarAtom
          style={{ marginRight: "20px", height: "30px", width: "30px" }}
          alt="Logo"
          image={require("../assets/logo.png")}
        />
        <Hidden xsDown>
          <SpanAtom
            style={{
              marginRight: "12px",
              fontWeight: 500,
              color: "#1C5BBA",
              fontSize: "40px",
            }}
            text="Ijazah"
          />
          <SpanAtom
            style={{
              margin: "0px",
              fontWeight: 500,
              color: "#41E93E",
              fontSize: "40px",
            }}
            text="Tours"
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
