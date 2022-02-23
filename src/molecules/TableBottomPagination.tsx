import { TablePagination } from "@material-ui/core";
import styled from "styled-components";

interface TableBottomPaginationProps {
  rowdata?: any[];
  rows?: number[];
  rowsperpage: number;
  colspan?: number;
  onPageChange: () => void;
  onRowsPerPageChange: () => void;
  ActionsComponent: any;
}

function TableBottomPagination({
  rowdata,
  rows,
  rowsperpage,
  colspan,
  onPageChange,
  onRowsPerPageChange,
  ActionsComponent,
}: TableBottomPaginationProps) {
  return (
    <StyledTablePagination
      rowsPerPageOptions={[...rows!, { label: "All", value: -1 }]}
      colSpan={colspan}
      count={rowdata!.length}
      rowsPerPage={rowsperpage}
      page={0}
      SelectProps={{
        inputProps: { "aria-label": "rows per page" },
        native: true,
      }}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      ActionsComponent={ActionsComponent}
    />
  );
}

export default TableBottomPagination;

const StyledTablePagination = styled(TablePagination)`
  .MuiTablePagination-toolbar {
    padding-right: 24px;
  }
`;
