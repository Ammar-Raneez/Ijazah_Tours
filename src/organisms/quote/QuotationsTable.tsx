import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React from "react";
import { v4 as uuid } from "uuid";
import ButtonAtom from "../../atoms/ButtonAtom";
import CustomerProfile from "../../molecules/CustomerProfile";
import TableBottomPagination from "../../molecules/TableBottomPagination";
import TableColumnCell from "../../molecules/TableColumnCell";
import TableRowTextCell from "../../molecules/TableRowTextCell";

interface QuotationsTableProps {
  columns?: string[];
  rowdata?: any[];
  component?: any;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    overflow: "scroll",
  },
});

function QuotationsTable({ columns, rowdata }: QuotationsTableProps) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="quotations table">
        <TableHead>
          <TableRow>
            {columns!.map((column) => (
              <TableColumnCell align="left" color="b5b5c3" column={column} />
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowdata!.map((row: any) => (
            <TableRow key={uuid()}>
              {row.map((cell: any) =>
                !cell.status ? (
                  <TableCell key={uuid()} align="left">
                    {cell.image ? (
                      <CustomerProfile
                        image={cell.image}
                        title={cell.title}
                        subtitle={cell.subtitle}
                        titleweight={600}
                        key={uuid()}
                      />
                    ) : (
                      <TableRowTextCell
                        cell={{
                          title: cell.title,
                          subtitle: cell.subtitle,
                          colors: ["#464E5F", "#B5B5C3"],
                          weight: 600
                        }}
                      />
                    )}
                  </TableCell>
                ) : (
                  <React.Fragment key={uuid()}>
                    <TableCell key={uuid()} align="right">
                      <ButtonAtom
                        width="8rem"
                        size="medium"
                        backgroundcolor={
                          cell.status === "Approved" ? "#41E93E" : "#C1BFBF"
                        }
                        key={uuid()}
                        onClick={() => null}
                        textcolor={
                          cell.status === "Approved" ? "#146521" : "#464E5F"
                        }
                        borderradius="0.5rem"
                        text={cell.status}
                        disabled
                      />
                    </TableCell>
                    <TableCell key={uuid()} align="right">
                      <ButtonAtom
                        width="8rem"
                        size="medium"
                        backgroundcolor="#C9F7F5"
                        onClick={() => null}
                        textcolor="#1BC5BD"
                        borderradius="0.5rem"
                        text="View Quote"
                        key={uuid()}
                      />
                    </TableCell>
                  </React.Fragment>
                )
              )}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableBottomPagination
              rowdata={rowdata}
              rows={[5, 10, 25]}
              rowsperpage={5}
              colspan={5}
              onPageChange={() => null}
              onRowsPerPageChange={() => null}
              ActionsComponent={() => null}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default QuotationsTable;
