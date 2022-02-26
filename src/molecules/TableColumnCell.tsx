import { TableCell } from "@material-ui/core";
import { ReactNode } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { Order } from "../utils/helpers";

interface TableColumnCellProps {
  color: string;
  column?: string;
  align?: "left" | "center" | "right" | "justify" | "inherit";
  sortDirection?: Order | false;
  children?: ReactNode;
}

function TableColumnCell({
  column,
  align,
  color,
  sortDirection,
  ...props
}: TableColumnCellProps) {
  return (
    <TableCell
      sortDirection={sortDirection}
      key={uuid()}
      color={color}
      align={align}
      style={props.children ? { color, fontWeight: "bold" } : {}}
    >
      {!props.children ? (
        <strong style={{ color }} key={uuid()}>{column}</strong>
      ) : (
        props.children
      )}
    </TableCell>
  );
}

export default TableColumnCell;
