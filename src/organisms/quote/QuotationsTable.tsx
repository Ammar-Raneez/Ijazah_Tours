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
import GuestProfile from "../../molecules/GuestProfile";
import TableBottomPagination from "../../molecules/TableBottomPagination";
import TableColumnCell from "../../molecules/TableColumnCell";
import TableRowButtonCell from "../../molecules/TableRowButtonCell";
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
          {rowdata!.map((row: any) => (
            <TableRow key={uuid()}>
              {row.map((cell: any) =>
                !cell.status ? (
                  cell.image ? (
                    <TableCell key={uuid()} align="left">
                      <GuestProfile
                        image={cell.image}
                        title={cell.title}
                        subtitle={cell.subtitle}
                        titleweight={600}
                        key={uuid()}
                      />
                    </TableCell>
                  ) : (
                    <TableRowTextCell
                      key={uuid()}
                      cell={{
                        align: "left",
                        title: cell.title,
                        subtitle: cell.subtitle,
                        colors: ["#464E5F", "#B5B5C3"],
                        weight: 600,
                      }}
                    />
                  )
                ) : (
                  <React.Fragment key={uuid()}>
                    <TableRowButtonCell
                      key={uuid()}
                      onClick={() => null}
                      align="right"
                      btnwidth="8rem"
                      btnsize="medium"
                      btnborderradius="0.5rem"
                      cell={cell}
                      btndisabled
                    />
                    <TableRowButtonCell
                      key={uuid()}
                      onClick={() => null}
                      align="right"
                      btnwidth="8rem"
                      btnsize="medium"
                      btnborderradius="0.5rem"
                      btntext="View Quote"
                      btncolors={["#C9F7F5", "#1BC5BD"]}
                    />
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
