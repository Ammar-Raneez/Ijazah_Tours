import { TableCell } from "@material-ui/core";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

interface TableColumnCellProps {
  column?: string;
  align?: "left" | "center" | "right" | "justify" | "inherit"
  color: string;
}

function TableColumnCell({ column, align, color }: TableColumnCellProps) {
  return (
    <StyledTableColumnCell color={color} align={align}>
      <strong key={uuid()}>{column}</strong>
    </StyledTableColumnCell>
  );
}

export default TableColumnCell;

const StyledTableColumnCell = styled(TableCell)<TableColumnCellProps>`
  strong {
    color: ${({ color }) => color};
  }
`;
