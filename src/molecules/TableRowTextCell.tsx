import { TableCell } from "@material-ui/core";
import { v4 as uuid } from "uuid";
import ParagraphAtom from "../atoms/ParagraphAtom";

interface TableRowTextCellProps {
  cell: {
    title: string | number;
    align: "left" | "center" | "right";
    subtitle?: string;
    marktitle?: boolean;
    colors: string[];
    weight: number;
  };
}

function TableRowTextCell({ cell }: TableRowTextCellProps) {
  return cell.subtitle ? (
    <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        margin="0px"
        color={cell.colors[0]}
        size="0.875rem"
        weight={cell.weight}
        key={uuid()}
      />
      <ParagraphAtom
        text={cell.subtitle}
        margin="0px"
        color={cell.colors[1]}
        size="0.875rem"
        key={uuid()}
      />
    </TableCell>
  ) : cell.marktitle ? (
    <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        margin="0px"
        color={cell.colors[0]}
        size="0.875rem"
        weight={cell.weight}
        key={uuid()}
        markstyle={{
          border:
            cell.title === "ACTIVE" ? "1px solid #0A65FF" : "1px solid #B5B5C3",
          borderRadius: "11px",
          backgroundColor: cell.title === "ACTIVE" ? "#0A65FF" : "transparent",
          padding: "0.4rem",
          color: cell.title === "ACTIVE" ? "white" : "#B5B5C3",
        }}
        mark
      />
    </TableCell>
  ) : (
    <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        margin="0px"
        color={cell.colors[0]}
        size="0.875rem"
        weight={cell.weight}
        key={uuid()}
      />
    </TableCell>
  );
}

export default TableRowTextCell;
