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
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import TableColumnCell from '../../../../molecules/TableColumnCell';
import TableRowTextCell from '../../../../molecules/TableRowTextCell';
import SpanAtom from '../../../../atoms/SpanAtom';
import DivAtom from '../../../../atoms/DivAtom';
import { selectWithNavbarWidth } from '../../../../redux/containerSizeSlice';
import { voucherStyles } from '../../../../styles';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 650,
    overflow: 'scroll',
  },
  accomodationPaper: {
    marginTop: theme.spacing(2),
    width: '60%',
  },
  guestPaper: {
    marginTop: theme.spacing(2),
    width: '50%',
  },
}));

interface VoucherGuestTableProps {
  data: any;
  accColumns: string[];
  guestColumns: string[];
}

function VoucherGuestTable({
  data,
  accColumns,
  guestColumns,
}: VoucherGuestTableProps) {
  const width = useSelector(selectWithNavbarWidth);
  const classes = useStyles();

  const getChildrenAgeString = () => {
    let ageString = '';
    data.guestDetails.children.forEach((child: string, index: number) => {
      if (index === data.guestDetails.children.length - 1) {
        ageString += child;
      } else {
        ageString = `${ageString} ${child}, `;
      }
    });

    return ageString;
  };

  const GuestTable = () => (
    <TableContainer
      style={width < 1500 ? { width: '100%' } : {}}
      className={classes.guestPaper}
      component={Paper}
    >
      <Table className={classes.table} aria-label="approval accomodation table">
        <TableHead>
          <TableRow style={{ borderTop: '1px solid #41E93E' }}>
            {guestColumns.map((column) => (
              <TableColumnCell
                greenBorder
                key={uuid()}
                align="center"
                color="#1C5BBA"
                column={column}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={uuid()}>
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: data.guestDetails.adults,
                colors: ['#464E5F'],
                weight: 400,
              }}
            />
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: data.guestDetails.children.length,
                colors: ['#464E5F'],
                weight: 400,
              }}
            />
            <TableRowTextCell
              key={uuid()}
              cell={{
                align: 'center',
                title: getChildrenAgeString(),
                colors: ['#464E5F'],
                weight: 400,
              }}
            />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  const AccomodationTable = () => (
    <TableContainer
      style={width < 1500 ? { width: '100%' } : {}}
      className={classes.accomodationPaper}
      component={Paper}
    >
      <Table className={classes.table} aria-label="approval accomodation table">
        <TableHead>
          <TableRow style={{ borderTop: '1px solid #41E93E' }}>
            {accColumns.map((column) => (
              <TableColumnCell
                greenBorder
                key={uuid()}
                align="center"
                color="#1C5BBA"
                column={column}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.accomodationDetails.map((row: any) => (
            <TableRow key={uuid()}>
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
                  title: row.city,
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <DivAtom style={voucherStyles.voucherTemplate.summaryDetails.multiTableContainer}>
        <p style={voucherStyles.voucherTemplate.summaryDetails.detailContainer}>
          <SpanAtom
            text="Guest Name"
            style={voucherStyles.voucherTemplate.summaryDetails.label}
          />
          <SpanAtom
            text={data.guestDetails.refNum}
            style={voucherStyles.voucherTemplate.summaryDetails.detail}
          />
        </p>
        <GuestTable />
        <AccomodationTable />
      </DivAtom>
    </>
  );
}

export default VoucherGuestTable;
