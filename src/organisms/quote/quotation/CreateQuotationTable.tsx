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
import CloseIcon from '@material-ui/icons/Close';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../../molecules/TableColumnCell';
import TableRowDropdownCell from '../../../molecules/TableRowDropdownCell';
import TableRowIconCell from '../../../molecules/TableRowIconCell';
import TableRowTextCell from '../../../molecules/TableRowTextCell';
import { QuotationAccomodation } from '../../../utils/types';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));

interface CreateQuotationTableProps {
  data: QuotationAccomodation[];
  columns: string[];
  mealPlanOptions: any;
  roomTypes: any;
  deleteAccomodation: (row: QuotationAccomodation) => void;
}

function CreateQuotationTable({
  data,
  columns,
  mealPlanOptions,
  roomTypes,
  deleteAccomodation,
}: CreateQuotationTableProps) {
  const classes = useStyles();

  return (
    <TableContainer className={classes.paper} component={Paper}>
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
          {data.map((row) => (
            <TableRow key={uuid()}>
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.location,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.nights,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.category,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.accomodation,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.pax,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowDropdownCell
                key={uuid()}
                value={row.roomType}
                options={roomTypes}
              />
              <TableRowDropdownCell
                key={uuid()}
                value={row.mealPlan}
                options={mealPlanOptions}
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.city,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowIconCell
                align="center"
                onClick={() => deleteAccomodation(row)}
                textcolor="#B5B5C3"
                size="small"
                padding="8px"
                children={<CloseIcon style={{ color: 'black' }} />}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CreateQuotationTable;
