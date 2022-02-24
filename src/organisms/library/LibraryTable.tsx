import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import clsx from "clsx";
import { Theme, makeStyles, IconButton } from "@material-ui/core";
import { lighten } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import SearchIcon from "@material-ui/icons/Search";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import FilterListIcon from "@material-ui/icons/FilterList";
import { LIBRARY_HOTEL_DATA } from "../../data";
import { getComparator, Order, stableSort } from "../../utils/helpers";
import TableRowTextCell from "../../molecules/TableRowTextCell";
import TableColumnCell from "../../molecules/TableColumnCell";
import IconAtom from "../../atoms/IconAtom";
import InputAtom from "../../atoms/InputAtom";
import DivAtom from "../../atoms/DivAtom";
import ButtonAtom from "../../atoms/ButtonAtom";

const headCells = [
  { id: "name", label: "NAME" },
  { id: "desc", label: "DESCRIPTION" },
  { id: "rate", numeric: true, label: "RATE" },
  { id: "location", numeric: true, label: "LOCATION" },
  { id: "ratings", numeric: true, label: "RATINGS" },
  { id: "group", label: "GROUP" },
  { id: "...", label: "" },
  { id: "...1", label: "" },
  { id: "...2", label: "" },
];

interface LibraryTableHeadProps {
  classes: any;
  numSelected: number;
  onRequestSort: any;
  onSelectAllClick: any;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function LibraryTableHead({
  classes,
  onSelectAllClick,
  order,
  orderBy,
  numSelected,
  rowCount,
  onRequestSort,
}: LibraryTableHeadProps) {
  const createSortHandler = (property: any) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableColumnCell
            color="#B5B5C3"
            key={headCell.id}
            align={
              headCell.id === "group"
                ? "center"
                : headCell.numeric
                ? "right"
                : "left"
            }
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableColumnCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

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
              filter="5px 5px 4px"
            />
          </DivAtom>
        )}
      </DivAtom>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function LibraryTable() {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (_: any, property: any) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = LIBRARY_HOTEL_DATA.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <LibraryTableToolbar
          search={search}
          setSearch={setSearch}
          numSelected={selected.length}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="Library table"
          >
            <LibraryTableHead
              classes={classes}
              numSelected={selected.length}
              order={order as Order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={LIBRARY_HOTEL_DATA.length}
            />
            <TableBody>
              {stableSort(
                LIBRARY_HOTEL_DATA,
                getComparator(order as Order, orderBy)
              )
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `library-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell>
                        <TableRowTextCell
                          cell={{
                            title: row.name,
                            subtitle: row.tel,
                            colors: ["#464E5F", "#B5B5C3"],
                            weight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="right">
                        <TableRowTextCell
                          cell={{
                            title: row.rate,
                            subtitle: "INR",
                            colors: [
                              row.rate.toString().includes("-")
                                ? "red"
                                : "green",
                              "#B5B5C3",
                            ],
                            weight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TableRowTextCell
                          cell={{
                            title: row.location,
                            subtitle: "INR",
                            colors: [
                              row.location.toString().includes("-")
                                ? "red"
                                : "green",
                              "#B5B5C3",
                            ],
                            weight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <TableRowTextCell
                          cell={{
                            title: row.ratings,
                            subtitle: "INR",
                            colors: [
                              row.ratings.toString().includes("-")
                                ? "red"
                                : "green",
                              "#B5B5C3",
                            ],
                            weight: 600,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <TableRowTextCell
                          cell={{
                            title: row.group,
                            marktitle:
                              row.group === "ACTIVE" ||
                              row.group === "INACTIVE",
                            colors: [
                              row.group === "ACTIVE" ? "#0A65FF" : "#B5B5C3",
                            ],
                            weight: 300,
                          }}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconAtom
                          onClick={() => null}
                          textcolor="#B5B5C3"
                          size="small"
                          padding="8px"
                          children={<EditOutlinedIcon />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconAtom
                          onClick={() => null}
                          textcolor="#B5B5C3"
                          size="small"
                          padding="8px"
                          children={<DeleteOutlinedIcon />}
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconAtom
                          padding="8px"
                          onClick={() => null}
                          textcolor="#B5B5C3"
                          size="small"
                          children={<MoreHorizIcon />}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={LIBRARY_HOTEL_DATA.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
