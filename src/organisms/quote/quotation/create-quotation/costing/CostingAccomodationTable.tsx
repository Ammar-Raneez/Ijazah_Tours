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

import TableColumnCell from '../../../../../molecules/TableColumnCell';
import TableRowDropdownCell from '../../../../../molecules/TableRowDropdownCell';
import TableRowTextCell from '../../../../../molecules/TableRowTextCell';
import { QuotationCostingAccomodation } from '../../../../../utils/types';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));

interface CostingAccomodationTableProps {
  data: QuotationCostingAccomodation[];
  columns: string[];
  accTotal: string;
  mealPlanOptions: any;
  roomTypes: any;
}

function CostingAccomodationTable({
  data,
  columns,
  accTotal,
  mealPlanOptions,
  roomTypes,
}: CostingAccomodationTableProps) {
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
                align="center"
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.roomRate,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
              <TableRowDropdownCell
                key={uuid()}
                value={row.mealPlan}
                options={mealPlanOptions}
                align="center"
              />
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: row.total,
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
            </TableRow>
          ))}
          <TableRow>
            {[0, 0, 0, 0, 0, 0, 0].map(() => (
              <TableRowTextCell
                key={uuid()}
                cell={{
                  align: 'center',
                  title: '',
                  colors: ['#464E5F'],
                  weight: 400,
                }}
              />
            ))}
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: accTotal,
                colors: ['#464E5F'],
                weight: 600,
              }}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CostingAccomodationTable;