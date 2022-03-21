import { ElementType } from 'react';
import { TablePagination } from '@material-ui/core';
import { TablePaginationActionsProps } from '@material-ui/core/TablePagination/TablePaginationActions';
import styled from 'styled-components';

interface TableBottomPaginationProps {
  rowsperpage: number;
  ActionsComponent: ElementType<TablePaginationActionsProps>;
  onPageChange: () => void;
  onRowsPerPageChange: () => void;
  rowdata?: any[];
  rows?: number[];
  colspan?: number;
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
      rowsPerPageOptions={[...rows!, { label: 'All', value: -1 }]}
      colSpan={colspan}
      count={rowdata!.length}
      rowsPerPage={rowsperpage}
      page={0}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
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
