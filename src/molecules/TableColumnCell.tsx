import { TableCell } from "@material-ui/core";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

interface TableColumnCellProps {
  column?: string;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  color: string;
  sortDirection?: any;
  children?: any;
}

function TableColumnCell({
  column,
  align,
  color,
  sortDirection,
  ...props
}: TableColumnCellProps) {
  return (
    <StyledTableColumnCell
      sortDirection={sortDirection}
      key={uuid()}
      color={color}
      align={align}
      style={props.children ? { color, fontWeight: "bold" } : {}}
    >
      {!props.children ? (
        <strong key={uuid()}>{column}</strong>
      ) : (
        props.children
      )}
    </StyledTableColumnCell>
  );
}

export default TableColumnCell;

const StyledTableColumnCell = styled(TableCell)<TableColumnCellProps>`
  strong {
    color: ${({ color }) => color};
  }
`;
