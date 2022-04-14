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
  selectedAccomodations: UserAccomodation[];
  columns: string[];
  selectedAccomodationsNights: string[];
  selectedAccomodationsRoomTypes: string[];
  selectedAccomodationsMealPlans: string[];
  setSelectedAccomodations: any;
  setSelectedAccomodationsNights: any;
  setSelectedAccomodationsRoomTypes: any;
  setSelectedAccomodationsMealPlans: any;
  deleteAccomodation: (row: UserAccomodation) => void;
}

function AccomodationTable({
  columns,
  selectedAccomodations,
  selectedAccomodationsNights,
  selectedAccomodationsRoomTypes,
  selectedAccomodationsMealPlans,
  setSelectedAccomodations,
  setSelectedAccomodationsNights,
  setSelectedAccomodationsRoomTypes,
  setSelectedAccomodationsMealPlans,
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
                color="black"
                column={column}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedAccomodations?.length > 0 && selectedAccomodations.map((row, index) => {
            const roomTypes = Object.keys(row.categoryValues).map((cat) => (
              { value: cat, label: cat }
            ));

            const mealPlanOptions = row.rates
              .map((rate) => rate.newMealPlan)
              .map((rate) => ({ value: rate, label: rate }));

            const rowNights = selectedAccomodationsNights[index];
            const rowMealPlan = selectedAccomodationsMealPlans[index];
            const rowRoomType = selectedAccomodationsRoomTypes[index];

            const onSelectChange = (val: string, type: string) => {
              const {
                accomodation,
                accomodations,
                accomodationIndex,
              } = getAccomodationsFromStorage();

              if (type === 'Room Type') {
                const roomTypesCopy = setNewStateValue(selectedAccomodationsRoomTypes, val);
                setSelectedAccomodationsRoomTypes(roomTypesCopy);
                const updatedAcc = { ...accomodation, roomType: val };
                setNewSelectedAccomodations(accomodations, updatedAcc, accomodationIndex);
              } else {
                const mealPlansCopy = setNewStateValue(selectedAccomodationsMealPlans, val);
                setSelectedAccomodationsMealPlans(mealPlansCopy);
                const updatedAcc = { ...accomodation, mealPlan: val };
                setNewSelectedAccomodations(accomodations, updatedAcc, accomodationIndex);
              }
            };

            const onNightsChange = (val: string) => {
              const {
                accomodation,
                accomodations,
                accomodationIndex,
              } = getAccomodationsFromStorage();

              const nightsCopy = setNewStateValue(selectedAccomodationsNights, val);
              setSelectedAccomodationsNights(nightsCopy);
              const updatedAcc = { ...accomodation, nights: val };
              setNewSelectedAccomodations(accomodations, updatedAcc, accomodationIndex);
            };

            const setNewStateValue = (stateValues: string[], val: string) => {
              const copy = [...stateValues];
              const toEditNights = copy.findIndex((rt) => rt === val);
              copy.splice(toEditNights, 1);
              copy.push(val);
              return copy;
            };

            const setNewSelectedAccomodations = (
              accomodations: UserAccomodation[],
              updatedAcc: UserAccomodation,
              accomodationIndex: number,
            ) => {
              const accomodationsCopy = [...accomodations];
              accomodationsCopy.splice(accomodationIndex, 1);
              accomodationsCopy.push(updatedAcc);
              setSelectedAccomodations(accomodationsCopy);
            };

            const getAccomodationsFromStorage = () => {
              const accomodations = JSON.parse(localStorage.getItem('New Quote Accomodation')!).selectedAccomodations;
              const accomodation = accomodations?.find((acc: UserAccomodation) => (
                acc.id === row.id
              ))!;

              const accomodationIndex = accomodations?.findIndex((acc: UserAccomodation) => (
                acc.id === row.id
              ))!;

              return { accomodations, accomodation, accomodationIndex };
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
                  value={rowNights}
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
                  value={rowRoomType}
                  onSelectChange={onSelectChange}
                  options={roomTypes}
                  align="center"
                />
                <TableRowEditCell
                  key={uuid()}
                  select
                  type="Meal Plan"
                  value={rowMealPlan}
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
