import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import ButtonAtom from "../../atoms/ButtonAtom";
import ParagraphAtom from "../../atoms/ParagraphAtom";
import CustomerProfile from "../../molecules/CustomerProfile";

interface QuotationsTableProps {
  columns?: string[];
  flexcontainer?: string;
  rowdata?: any[];
  component?: any;
}

function QuotationsTable({
  columns,
  flexcontainer,
  rowdata,
}: QuotationsTableProps) {
  return (
    <StyledTableContainer flexcontainer={flexcontainer} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns!.map((column) => (
              <StyledTableColumnCell key={uuid()} align="left">
                <strong key={uuid()}>{column}</strong>
              </StyledTableColumnCell>
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
                      <>
                        <ParagraphAtom
                          text={cell.title}
                          margin="0px"
                          color="#464E5F"
                          size="0.875rem"
                          weight={600}
                          key={uuid()}
                        />
                        <ParagraphAtom
                          text={cell.subtitle}
                          margin="0px"
                          color="#B5B5C3"
                          size="0.875rem"
                          key={uuid()}
                        />
                      </>
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
            <StyledTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={5}
              count={rowdata!.length}
              rowsPerPage={5}
              page={0}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onPageChange={() => null}
              onRowsPerPageChange={() => null}
              ActionsComponent={() => null}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </StyledTableContainer>
  );
}

export default QuotationsTable;

const StyledTableContainer = styled(TableContainer)<QuotationsTableProps>`
  ${({ flexcontainer }) =>
    flexcontainer === "true" &&
    `
			flex: 0.7;
			marginRight: 3rem;
			height: 100%;
		`}
`;

const StyledTableColumnCell = styled(TableCell)`
  strong {
    color: #b5b5c3;
  }
`;

const StyledTablePagination = styled(TablePagination)`
  .MuiTablePagination-toolbar {
    padding-right: 24px;
  }
`;
