import { TableCell } from "@material-ui/core";
import { MouseEventHandler } from "react";
import IconAtom from "../atoms/IconAtom";

interface TableRowIconCellProps {
  onClick: MouseEventHandler<HTMLButtonElement> | any;
  textcolor: string;
  align: "left" | "center" | "right";
  size: "small" | "medium";
  padding: string;
  children: any;
}

function TableRowIconCell({
  onClick,
  textcolor,
  align,
  size,
  padding,
  ...props
}: TableRowIconCellProps) {
  return (
    <TableCell align={align}>
      <IconAtom
        onClick={onClick}
        textcolor={textcolor}
        size={size}
        padding={padding}
        children={props.children}
      />
    </TableCell>
  );
}

export default TableRowIconCell;
