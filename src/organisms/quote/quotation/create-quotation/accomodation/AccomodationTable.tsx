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
import { UserAccomodation } from '../../../../../utils/types';

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
  data: UserAccomodation[];
  columns: string[];
  deleteAccomodation: (row: UserAccomodation) => void;
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
            const [roomTypes] = useState(
              Object.keys(row.categoryValues).map((cat) => ({ value: cat, label: cat })),
            );
            const [mealPlanOptions] = useState(
              row.rates.map((rate) => rate.newMealPlan).map((rate) => ({ value: rate, label: rate })),
            );

            const [nights, setNights] = useState(row.nights);
            const [roomType, setRoomType] = useState(row.roomType);
            const [mealPlan, setMealPlan] = useState(row.mealPlan);

            const [accomodations] = useState<UserAccomodation[]>(
              localStorage.getItem('New Quote Accomodation')
                ? JSON.parse(localStorage.getItem('New Quote Accomodation')!).selectedAccomodations
                : [],
            );
            const [accomodation, setAccomodation] = useState<UserAccomodation>(
              accomodations?.find((acc: UserAccomodation) => acc.id === row.id)!,
            );
            const [accomodationIndex] = useState<number>(
              accomodations?.findIndex((acc: UserAccomodation) => acc.id === row.id),
            );

            const onSelectChange = (val: string, type: string) => {
              if (type === 'Room Type') {
                setRoomType(val);
                const updatedAcc = { ...accomodation, roomType: val };
                setAccomodation(updatedAcc);
                saveUpdatedAccomodation(updatedAcc);
              } else {
                setMealPlan(val);
                const updatedAcc = { ...accomodation, mealPlan: val };
                setAccomodation(updatedAcc);
                saveUpdatedAccomodation(updatedAcc);
              }
            };

            const onNightsChange = (val: string) => {
              setNights(val);
              const updatedAcc = { ...accomodation, nights: val };
              setAccomodation(updatedAcc);
              saveUpdatedAccomodation(updatedAcc);
            };

            const saveUpdatedAccomodation = (updatedAcc: UserAccomodation) => {
              const accomodationsCopy = [...accomodations];
              accomodationsCopy.splice(accomodationIndex, 1);
              accomodationsCopy.push(updatedAcc);
              localStorage.setItem(
                'New Quote Accomodation',
                JSON.stringify({ selectedAccomodations: accomodationsCopy }),
              );
            };

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
                  type="Nights"
                  select={false}
                  value={nights}
                  onCountChange={onNightsChange}
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
                    title: row.pax,
                    colors: ['#464E5F'],
                    weight: 400,
                  }}
                />
                <TableRowEditCell
                  key={uuid()}
                  select
                  type="Room Type"
                  value={roomType}
                  onSelectChange={onSelectChange}
                  options={roomTypes}
                  align="center"
                />
                <TableRowEditCell
                  key={uuid()}
                  select
                  type="Meal Plan"
                  value={mealPlan}
                  onSelectChange={onSelectChange}
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
