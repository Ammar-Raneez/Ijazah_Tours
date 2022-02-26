import { TableCell } from "@material-ui/core";
import { MouseEventHandler } from "react";
import ButtonAtom from "../atoms/ButtonAtom";

interface TableRowButtonCellProps {
  btnwidth: string;
  btnborderradius: string;
  align: "left" | "center" | "right";
  btnsize: "small" | "medium";
  onClick: MouseEventHandler<HTMLButtonElement>;
  btndisabled?: boolean;
  btntext?: string;
  btncolors?: string[];
  cell?: any;
}

function TableRowButtonCell({
  onClick,
  align,
  btnsize,
  btnwidth,
  btnborderradius,
  btndisabled,
  cell,
  btntext,
  btncolors,
}: TableRowButtonCellProps) {
  return (
    <TableCell align={align}>
      <ButtonAtom
        style={{
          width: btnwidth,
          backgroundColor: btncolors
            ? btncolors[0]
            : cell.status === "Approved"
            ? "#41E93E"
            : "#C1BFBF",
          color: btncolors
            ? btncolors[1]
            : cell.status === "Approved"
            ? "#146521"
            : "#464E5F",
          borderRadius: btnborderradius,
        }}
        size={btnsize}
        onClick={onClick}
        text={btntext || cell.status}
        disabled={btndisabled}
      />
    </TableCell>
  );
}

export default TableRowButtonCell;
