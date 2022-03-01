import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { v4 as uuid } from "uuid";
import TableColumnCell from "../../../molecules/TableColumnCell";
import TableRowTextCell from "../../../molecules/TableRowTextCell";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    overflow: "scroll",
  },
});

interface AccomodationTableProps {
  accomodationData: [string, string, number, string][];
  columns: string[];
}

function AddAccomodationTable({
  accomodationData,
  columns,
}: AccomodationTableProps) {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="quotations table">
        <TableHead>
          <TableRow>
            {columns!.map((column) => (
              <TableColumnCell
                key={uuid()}
                align="left"
                color="b5b5c3"
                column={column}
              />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {accomodationData!.map((row: [string, string, number, string]) => (
            <TableRow key={uuid()}>
              {row.map((cell: string | number) => (
                <TableRowTextCell
                  key={uuid()}
                  cell={{
                    align: "left",
                    title: cell,
                    colors: ["#464E5F", "#B5B5C3"],
                    weight: 400,
                  }}
                />
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AddAccomodationTable;
