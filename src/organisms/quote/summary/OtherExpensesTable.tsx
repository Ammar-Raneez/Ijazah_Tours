import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../../molecules/TableColumnCell';
import TableRowIconCell from '../../../molecules/TableRowIconCell';
import TableRowTextCell from '../../../molecules/TableRowTextCell';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
});

interface OtherExpensesTableProps {
  data: any;
  columns: string[];
  deleteExpense: any;
}

function OtherExpensesTable({
  data,
  columns,
  deleteExpense,
}: OtherExpensesTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="accomodations price table">
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
          {data.map((row: any, index: number) => (
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
                  title: row.remark,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.price,
                  colors: ['#464E5F', '#B5B5C3'],
                  weight: 400,
                }}
              />
              <TableRowIconCell
                align="center"
                onClick={() => deleteExpense(index)}
                textColor="#B5B5C3"
                size="small"
                padding="8px"
                children={<DeleteOutlinedIcon style={{ color: 'red' }} />}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OtherExpensesTable;
