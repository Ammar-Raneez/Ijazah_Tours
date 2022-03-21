import {
  createStyles,
  Hidden,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import AvatarAtom from '../atoms/AvatarAtom';
import DivAtom from '../atoms/DivAtom';
import SpanAtom from '../atoms/SpanAtom';
import { headerStyles } from '../styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}));

interface HeaderProps {
  handleDrawerToggle: () => void;
}

function Header({ handleDrawerToggle }: HeaderProps) {
  const classes = useStyles();

  return (
    <DivAtom style={headerStyles.container}>
      <DivAtom style={headerStyles.logoContainer}>
        <AvatarAtom
          style={headerStyles.avatar}
          alt="Logo"
          image={require('../assets/logo.png')}
        />
        <Hidden xsDown>
          <SpanAtom style={headerStyles.spanI} text="Ijazah" />
          <SpanAtom style={headerStyles.spanT} text="Tours" />
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
