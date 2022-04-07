import { useState } from 'react';
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

import TableColumnCell from '../../../../../molecules/TableColumnCell';
import TableRowEditCell from '../../../../../molecules/TableRowEditCell';
import TableRowIconCell from '../../../../../molecules/TableRowIconCell';
import TableRowTextCell from '../../../../../molecules/TableRowTextCell';
import { LibraryAccomodation } from '../../../../../utils/types';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
  paper: {
    marginTop: theme.spacing(2),
  },
}));

interface AccomodationTableProps {
  data: LibraryAccomodation[];
  columns: string[];
  deleteAccomodation: (row: LibraryAccomodation) => void;
}

function AccomodationTable({
  data,
  columns,
  deleteAccomodation,
}: AccomodationTableProps) {
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
          {data.map((row) => {
            const [nights, setNights] = useState('0');

            const [roomTypes] = useState(
              Object.keys(row.categoryValues).map((cat) => ({ value: cat, label: cat })),
            );
            const [mealPlanOptions] = useState(
              row.rates.map((rate) => rate.newMealPlan).map((rate) => ({ value: rate, label: rate })),
            );

            const [roomType, setRoomType] = useState(roomTypes?.[0].value);
            const [mealPlan, setMealPlan] = useState(mealPlanOptions?.[0].value);

            return (
              <TableRow key={uuid()}>
                <TableRowTextCell
                  key={uuid()}
                  cell={{
                    align: 'center',
                    title: row.country,
                    colors: ['#464E5F'],
                    weight: 400,
                  }}
                />
                <TableRowEditCell
                  key={uuid()}
                  select={false}
                  value={nights}
                  setValue={setNights}
                  align="center"
                />
                <TableRowTextCell
                  key={uuid()}
                  cell={{
                    align: 'center',
                    title: row.accomodationType,
                    colors: ['#464E5F'],
                    weight: 400,
                  }}
                />
                <TableRowTextCell
                  key={uuid()}
                  cell={{
                    align: 'center',
                    title: row.name,
                    colors: ['#464E5F'],
                    weight: 400,
                  }}
                />
                <TableRowTextCell
                  key={uuid()}
                  cell={{
                    align: 'center',
                    title: 'single',
                    colors: ['#464E5F'],
                    weight: 400,
                  }}
                />
                <TableRowEditCell
                  key={uuid()}
                  select
                  value={roomType}
                  setValue={setRoomType}
                  options={roomTypes}
                  align="center"
                />
                <TableRowEditCell
                  key={uuid()}
                  select
                  value={mealPlan}
                  setValue={setMealPlan}
                  options={mealPlanOptions}
                  align="center"
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
                  textColor="#B5B5C3"
                  size="small"
                  padding="8px"
                  children={<CloseIcon style={{ color: 'black' }} />}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AccomodationTable;
