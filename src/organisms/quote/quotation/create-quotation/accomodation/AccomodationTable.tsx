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
  setSelectedAccomodationsNights: any;
  setSelectedAccomodationsRoomTypes: any;
  deleteAccomodation: (row: UserAccomodation) => void;
}

function AccomodationTable({
  columns,
  selectedAccomodations,
  selectedAccomodationsNights,
  selectedAccomodationsRoomTypes,
  setSelectedAccomodationsNights,
  setSelectedAccomodationsRoomTypes,
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

            const onRoomTypeChange = (v: string) => {
              const temp = [...selectedAccomodationsRoomTypes];
              temp.splice(index, 1, v);
              setSelectedAccomodationsRoomTypes(temp);
            };

            // const onNightsChange = (v: string) => {
            //   console.log(v);
            // };

            const onNightsChangeBlur = (v: string) => {
              const temp = [...selectedAccomodationsNights];
              temp.splice(index, 1, v);
              setSelectedAccomodationsNights(temp);
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
                  value={selectedAccomodationsNights[index]}
                  onCountChange={onNightsChangeBlur}
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
                  value={selectedAccomodationsRoomTypes[index] || ''}
                  onSelectChange={onRoomTypeChange}
                  options={roomTypes}
                  align="center"
                />
                <TableRowTextCell
                  key={uuid()}
                  cell={{
                    align: 'center',
                    title: row.mealPlan,
                    colors: ['#464E5F'],
                    weight: 400,
                  }}
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
