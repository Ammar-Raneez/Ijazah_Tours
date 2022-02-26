import { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from "react";
import {
  Theme,
  makeStyles,
  createStyles,
  useTheme,
  IconButton,
} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import { getComparator, Order, stableSort } from "../../../utils/helpers";
import TableRowTextCell from "../../../molecules/TableRowTextCell";
import LibraryTableToolbar from "../../../molecules/LibraryTableToolbar";
import LibraryTableHead from "../../../molecules/LibraryTableHead";
import TableRowIconCell from "../../../molecules/TableRowIconCell";
import SpanAtom from "../../../atoms/SpanAtom";

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
  container: {
    // maxHeight: 300
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

interface DriverTableProps {
  data: any;
}

export default function DriverTable({ data }: DriverTableProps) {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _: MouseEvent<HTMLSpanElement>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n: any) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    _: MouseEvent<HTMLTableRowElement, globalThis.MouseEvent>,
    name: string
  ) => {
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

  const handleChangePage = (_: unknown, page: number) => {
    setPage(page);
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
          addbtntext="Add Driver"
        />
        <TableContainer className={classes.container}>
          <Table
            className={classes.table}
            stickyHeader
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
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order as Order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any, index) => {
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
                      <TableRowTextCell
                        cell={{
                          align: "left",
                          title: row.name,
                          subtitle: row.tel,
                          colors: ["#464E5F", "#B5B5C3"],
                          weight: 600,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: "left",
                          title: row.description,
                          colors: ["#B5B5C3"],
                          weight: 300,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: "right",
                          title: row.rate,
                          subtitle: "INR",
                          colors: [
                            row.rate.toString().includes("-") ? "red" : "green",
                            "#B5B5C3",
                          ],
                          weight: 600,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: "right",
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
                      <TableRowTextCell
                        cell={{
                          align: "right",
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
                      <TableRowTextCell
                        cell={{
                          align: "center",
                          title: row.group,
                          marktitle:
                            row.group === "ACTIVE" || row.group === "INACTIVE",
                          colors: [
                            row.group === "ACTIVE" ? "#0A65FF" : "#B5B5C3",
                          ],
                          weight: 300,
                        }}
                      />
                      <TableRowIconCell
                        align="center"
                        onClick={() => null}
                        textcolor="#B5B5C3"
                        size="small"
                        padding="8px"
                        children={<EditOutlinedIcon />}
                      />
                      <TableRowIconCell
                        align="center"
                        onClick={() => null}
                        textcolor="#B5B5C3"
                        size="small"
                        padding="8px"
                        children={<DeleteOutlinedIcon />}
                      />
                      <TableRowIconCell
                        align="center"
                        onClick={() => null}
                        textcolor="#B5B5C3"
                        size="small"
                        padding="8px"
                        children={<MoreHorizIcon />}
                      />
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage as any}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  );
}

const tablePaginationActionsStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
      marginRight: theme.spacing(0.5),
      display: "flex",
    },
    activeUsers: {
      display: "flex",
      alignItems: "center",
      position: "absolute",
      top: theme.spacing(2),
      left: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions({
  count,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) {
  const classes = tablePaginationActionsStyle();
  const theme = useTheme();
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

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  return (
    <>
      <div className={classes.root}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>

        <div
          style={width < 700 ? { display: "none" } : {}}
          className={classes.activeUsers}
        >
          <SpanAtom
            text="ACTIVE CUSTOMERS: "
            style={{ fontSize: "0.7rem", color: "#606F89" }}
          />
          <Fragment>&nbsp;</Fragment>
          <SpanAtom
            text="479"
            style={{ fontSize: "1rem", color: "#606F89", fontWeight: 600 }}
          />
          <SpanAtom
            text="/706"
            style={{ fontSize: "0.7rem", color: "#606F89" }}
          />
        </div>
      </div>
    </>
  );
}
