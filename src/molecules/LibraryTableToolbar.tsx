import {
  IconButton,
  lighten,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import clsx from "clsx";
import { useEffect, useState } from "react";
import ButtonAtom from "../atoms/ButtonAtom";
import DivAtom from "../atoms/DivAtom";
import InputAtom from "../atoms/InputAtom";

const useToolbarStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

interface LibraryTableToolbarProps {
  numSelected: number;
  search: string;
  setSearch: any;
}

const LibraryTableToolbar = ({
  numSelected,
  search,
  setSearch,
}: LibraryTableToolbarProps) => {
  const classes = useToolbarStyles();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(window.innerWidth);
    const widthListener = window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    const removeEventListeners = () => {
      window.removeEventListener("resize", widthListener as any);
    };

    return removeEventListeners();
  }, [width]);

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <DivAtom
        width="100%"
        display="flex"
        flexdirection={width < 540 ? "column" : "row"}
        align="center"
        justify="space-between"
      >
        <DivAtom
          align="center"
          display="flex"
          width={width < 540 ? "100%" : "auto"}
        >
          {numSelected > 0 ? (
            <Tooltip title="Delete">
              <IconButton
                size="medium"
                style={{ padding: "0px 8px 0px 0px", color: "red" }}
                onClick={() => null}
              >
                <DeleteOutlinedIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Filter list">
              <IconButton
                size="medium"
                style={{ padding: "0px 8px 0px 0px", color: "#0A65FF" }}
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
              padding="4px"
              placeholder="Search"
              adornmentposition="start"
              fullWidth={width < 540}
              value={search}
              onChange={(e: any) => setSearch(e.target.value)}
              children={<SearchIcon />}
            />
          )}
        </DivAtom>
        {!(numSelected > 0) && (
          <DivAtom
            margin={width < 540 ? "16px 0 0 0" : "0px"}
            width={width < 540 ? "100%" : "auto"}
          >
            <ButtonAtom
              starticon={<AddCircleOutlineOutlinedIcon />}
              text="Add Hotel"
              textcolor="white"
              backgroundcolor="#0A65FF"
              onClick={() => null}
              size="large"
              borderradius="0.5rem"
              width={width < 540 ? "100%" : "11rem"}
              margin="0"
            />
          </DivAtom>
        )}
      </DivAtom>
    </Toolbar>
  );
};

export default LibraryTableToolbar;
