import {
  ChangeEvent, Fragment, MouseEvent, useEffect, useState,
} from 'react';
import {
  Theme,
  makeStyles,
  createStyles,
  useTheme,
  IconButton,
} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import TableRowTextCell from '../../../molecules/TableRowTextCell';
import LibraryTableToolbar from '../../../molecules/LibraryTableToolbar';
import LibraryTableHead from '../../../molecules/LibraryTableHead';
import TableRowIconCell from '../../../molecules/TableRowIconCell';
import SpanAtom from '../../../atoms/SpanAtom';
import { getComparator, stableSort } from '../../../utils/helpers';
import { LibraryGuest, Order, Status } from '../../../utils/types';
import { libraryTableStyles } from '../../../styles';

const headCells = [
  { id: 'name', label: 'NAME' },
  { id: 'ref', label: 'REF NUMBER' },
  { id: 'tel', label: 'TEL NUMBER' },
  { id: 'country', label: 'COUNTRY' },
  { id: 'status', label: 'STATUS' },
  { id: '...', label: '' },
  { id: '...1', label: '' },
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

interface GuestTableProps {
  data: LibraryGuest[];
  deleteGuest: (row: LibraryGuest) => void;
  onEditGuestClick: (row: LibraryGuest) => void;
}

export default function GuestTable({ data, deleteGuest, onEditGuestClick }: GuestTableProps) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (
    _: MouseEvent<HTMLSpanElement>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n: any) => n.refNum);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (
    _: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    row: any,
  ) => {
    const selectedIndex = selected.indexOf(row.refNum);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.refNum);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_: unknown, pg: number) => {
    setPage(pg);
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
          addbtntext="Add Guest"
        />
        <TableContainer>
          <Table
            className={classes.table}
            stickyHeader
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="Library table"
          >
            <LibraryTableHead
              classes={classes}
              headCells={headCells}
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
                .map((row: LibraryGuest, index) => {
                  const isItemSelected = isSelected(row.refNum);
                  const labelId = `library-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                          onClick={(e) => handleClick(e, row)}
                        />
                      </TableCell>
                      <TableRowTextCell
                        cell={{
                          align: 'left',
                          title: row.name,
                          colors: ['#B5B5C3'],
                          weight: 500,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: 'left',
                          title: row.refNum,
                          colors: ['#B5B5C3'],
                          weight: 500,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: 'left',
                          title: row.tel,
                          colors: ['#B5B5C3'],
                          weight: 500,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: 'left',
                          title: row.country,
                          colors: ['#B5B5C3'],
                          weight: 500,
                        }}
                      />
                      <TableRowTextCell
                        cell={{
                          align: 'left',
                          title: row.status,
                          marktitle:
                            row.status === 'ACTIVE' || row.status === 'INACTIVE',
                          colors: [
                            row.status === 'ACTIVE' ? '#0A65FF' : '#B5B5C3',
                          ],
                          weight: 300,
                        }}
                      />
                      <TableRowIconCell
                        align="center"
                        onClick={() => onEditGuestClick(row)}
                        textcolor="#B5B5C3"
                        size="small"
                        padding="8px"
                        children={<EditOutlinedIcon style={{ color: 'green' }} />}
                      />
                      <TableRowIconCell
                        align="center"
                        onClick={() => deleteGuest(row)}
                        textcolor="#B5B5C3"
                        size="small"
                        padding="8px"
                        children={<DeleteOutlinedIcon style={{ color: 'red' }} />}
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={() => TablePaginationActions({
            rowsPerPage,
            page,
            active: data?.filter((obj: { status: Status }) => obj.status === 'ACTIVE').length,
            count: data.length,
            onPageChange: handleChangePage,
          })}
        />
      </Paper>
    </div>
  );
}

const tablePaginationActionsStyle = makeStyles((theme: Theme) => createStyles({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(0.5),
    display: 'flex',
  },
  activeUsers: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2.5),
  },
}));

interface TablePaginationActionsProps {
  active: number;
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions({
  count,
  active,
  page,
  rowsPerPage,
  onPageChange,
}: TablePaginationActionsProps) {
  const classes = tablePaginationActionsStyle();
  const theme = useTheme();
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

  const handleBackButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: MouseEvent<HTMLButtonElement>,
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
          {theme.direction === 'rtl' ? (
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
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>

        <div
          style={width < 700 ? { display: 'none' } : {}}
          className={classes.activeUsers}
        >
          <SpanAtom text="ACTIVE CUSTOMERS: " style={libraryTableStyles.totalUsers} />
          <Fragment>&nbsp;</Fragment>
          <SpanAtom text={`${active}/`} style={libraryTableStyles.activeUsers} />
          <SpanAtom text={String(count)} style={libraryTableStyles.totalUsers} />
        </div>
      </div>
    </>
  );
}
