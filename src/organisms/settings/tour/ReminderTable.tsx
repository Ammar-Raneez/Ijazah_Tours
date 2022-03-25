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

interface ReminderTableProps {
  data: { id: string; title: string; desc: string; type: string }[];
  columns: string[];
}

function ReminderTable({
  data,
  columns,
}: ReminderTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="reminder table">
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
          {data.map((row: { title: string; desc: string; type: string }) => (
            <TableRow key={uuid()}>
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.title,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.desc,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.type,
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

export default ReminderTable;
