import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../../molecules/TableColumnCell';
import TableRowTextCell from '../../../molecules/TableRowTextCell';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));

interface SummaryTransportTableProps {
  data: any;
  columns: string[];
}

function SummaryTransportTable({
  data,
  columns,
}: SummaryTransportTableProps) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.paper} component={Paper}>
      <Table className={classes.table} aria-label="costing table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableColumnCell
                key={uuid()}
                align="center"
                color="black"
                column={column}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={uuid()}>
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: data.transportRate,
                colors: ['#464E5F'],
                weight: 400,
              }}
            />
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: data.transportDays,
                colors: ['#464E5F'],
                weight: 400,
              }}
            />
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: data.transportTotal,
                colors: ['#464E5F'],
                weight: 400,
              }}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SummaryTransportTable;
