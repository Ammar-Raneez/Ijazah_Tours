import { TableCell } from "@material-ui/core";
import { MouseEventHandler } from "react";
import ButtonAtom from "../atoms/ButtonAtom";

interface TableRowButtonCellProps {
  onClick: MouseEventHandler<HTMLButtonElement> | any;
  align: "left" | "center" | "right";
  btnsize: "small" | "medium";
  btnwidth: string;
  btnborderradius: string;
  btndisabled?: boolean;
  cell?: any;
  btntext?: string;
  btncolors?: string[];
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
  btncolors
}: TableRowButtonCellProps) {
  return (
    <TableCell align={align}>
      <ButtonAtom
        width={btnwidth}
        size={btnsize}
        backgroundcolor={btncolors ? btncolors[0] : cell.status === "Approved" ? "#41E93E" : "#C1BFBF"}
        onClick={onClick}
        textcolor={btncolors ? btncolors[1] : cell.status === "Approved" ? "#146521" : "#464E5F"}
        borderradius={btnborderradius}
        text={btntext || cell.status}
        disabled={btndisabled}
      />
    </TableCell>
  );
}

export default TableRowButtonCell;
