import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../../molecules/TableColumnCell';
import TableRowTextCell from '../../../molecules/TableRowTextCell';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
});

interface Rate {
  newRateStart: string;
  newRateEnd: string;
  newMealPlan: string;
  newSinglePrice: string;
  newDoublePrice: string;
  newTriplePrice: string;
}

interface AccomodationPriceTableProps {
  data: Rate[];
  columns: string[];
}

function AccomodationPriceTable({
  data,
  columns,
}: AccomodationPriceTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="quotations table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableColumnCell
                key={uuid()}
                align="center"
                color="b5b5c3"
                column={column}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: Rate) => (
            <TableRow key={uuid()}>
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.newRateStart,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.newRateEnd,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.newMealPlan,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.newSinglePrice,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.newDoublePrice,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.newTriplePrice,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AccomodationPriceTable;
