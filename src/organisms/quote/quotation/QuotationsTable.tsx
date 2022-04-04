import { ChangeEvent, MouseEvent, useState } from 'react';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Theme,
} from '@material-ui/core';

import GuestProfile from '../../../molecules/GuestProfile';
import TableRowButtonCell from '../../../molecules/TableRowButtonCell';
import TableRowTextCell from '../../../molecules/TableRowTextCell';
import TablePaginationActions from '../../../molecules/TableBottomPagination';
import { Order } from '../../../utils/types';
import { getComparator, stableSort } from '../../../utils/helpers';
import TableHead from '../../../molecules/TableHead';

const headCells = [
  { id: 'guest', label: 'GUEST' },
  { id: 'earning', label: 'EARNINGS' },
  { id: 'commission', label: 'COMMISION' },
  { id: '...', label: '' },
  { id: '...1', label: '' },
];

interface QuotationsTableProps {
  rowdata: any[];
}

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

function QuotationsTable({ rowdata }: QuotationsTableProps) {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
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

  const handleChangePage = (_: unknown, pg: number) => {
    setPage(pg);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            stickyHeader
            aria-labelledby="tableTitle"
            size="medium"
            aria-label="Library table"
          >
            <TableHead
              classes={classes}
              headCells={headCells}
              numSelected={0}
              order={order as Order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rowdata.length}
            />
            <TableBody>
              {stableSort(rowdata, getComparator(order as Order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row: any) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell align="left">
                      <GuestProfile
                        image={row.image}
                        title={row.title}
                        titleWeight={300}
                        paraColor="#464E5F"
                      />
                    </TableCell>
                    <TableRowTextCell
                      cell={{
                        align: 'left',
                        title: row.earning,
                        colors: ['#464E5F', '#B5B5C3'],
                        weight: 300,
                      }}
                    />
                    <TableRowTextCell
                      cell={{
                        align: 'left',
                        title: row.commission,
                        colors: ['#464E5F', '#B5B5C3'],
                        weight: 300,
                      }}
                    />
                    <TableRowButtonCell
                      onClick={() => null}
                      align="right"
                      btnWidth="8rem"
                      btnSize="medium"
                      btnBorderRadius="0.5rem"
                      cell={row}
                      btnDisabled
                    />
                    <TableRowButtonCell
                      onClick={() => null}
                      align="right"
                      btnWidth="8rem"
                      btnSize="medium"
                      btnBorderRadius="0.5rem"
                      btnText="View Quote"
                      btnColors={['#C9F7F5', '#1BC5BD']}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowdata.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      </Paper>
    </div>
  );
}

export default QuotationsTable;
