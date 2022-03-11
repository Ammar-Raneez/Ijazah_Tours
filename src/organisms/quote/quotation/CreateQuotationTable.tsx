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

interface CreateQuotationTableProps {
  data: [][];
  columns: string[];
}

function CreateQuotationTable({
  data,
  columns,
}: CreateQuotationTableProps) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="quotations table">
        <TableHead>
          <TableRow>
            {columns!.map((column) => (
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
          {data!.map(
            (row: []) => (
              <TableRow key={uuid()}>
                {row.map(
                  (cell: string | number, index: number) => index <= columns.length - 1 && (
                    <TableRowTextCell
                      key={uuid()}
                      cell={{
                        align: 'center',
                        title: cell,
                        colors: ['#464E5F', '#B5B5C3'],
                        weight: 400,
                      }}
                    />
                  ),
                )}
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CreateQuotationTable;
