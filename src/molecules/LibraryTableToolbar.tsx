import { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  lighten,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import clsx from 'clsx';

import ButtonAtom from '../atoms/ButtonAtom';
import DivAtom from '../atoms/DivAtom';
import InputAtom from '../atoms/InputAtom';
import { libraryTableToolbarStyles } from '../styles';

const useToolbarStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

interface LibraryTableToolbarProps {
  search: string;
  addbtntext: string;
  numSelected: number;
  setSearch: (value: string) => void;
}

const LibraryTableToolbar = ({
  numSelected,
  search,
  addbtntext,
  setSearch,
}: LibraryTableToolbarProps) => {
  const classes = useToolbarStyles();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener('resize', widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  let addBtnTextWidth;
  if (width < 540) {
    addBtnTextWidth = '100%';
  } else if (addbtntext.includes('Accomodation')) {
    addBtnTextWidth = '14rem';
  } else {
    addBtnTextWidth = '11rem';
  }

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <DivAtom
        style={{
          ...libraryTableToolbarStyles.container,
          flexDirection: width < 540 ? 'column' : 'row',
        }}
      >
        <DivAtom
          style={{
            ...libraryTableToolbarStyles.toolbarContainer,
            width: width < 540 ? '100%' : 'auto',
          }}
        >
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton
                size="medium"
                style={libraryTableToolbarStyles.deleteIcon}
                onClick={() => null}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton
                size="medium"
                style={libraryTableToolbarStyles.filterIcon}
                onClick={() => null}
              >
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          )}
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1"
              component="div"
            >
              {numSelected} selected
            </Typography>
          ) : (
            <InputAtom
              style={libraryTableToolbarStyles.search}
              placeholder="Search"
              adornmentposition="start"
              fullWidth={width < 540}
              value={search}
              plain="false"
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)
              }
              children={<SearchIcon />}
            />
          )}
        </DivAtom>
        {numSelected <= 0 && (
          <DivAtom
            style={{
              margin: width < 540 ? '16px 0 0 0' : '0px',
              width: width < 540 ? '100%' : 'auto',
            }}
          >
            <Link
              to={`/library/${addbtntext.split(' ')[1].toLowerCase()}/create`}
            >
              <ButtonAtom
                starticon={<AddCircleOutlineOutlinedIcon />}
                text={addbtntext}
                style={{
                  ...libraryTableToolbarStyles.addBtn,
                  width: addBtnTextWidth,
                }}
                size="large"
              />
            </Link>
          </DivAtom>
        )}
      </DivAtom>
    </Toolbar>
  );
};

export default LibraryTableToolbar;
