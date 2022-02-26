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
        key={uuid()}
        style={{
          fontWeight: cell.weight,
          margin: "0px",
          color: cell.colors[0],
          fontSize: "0.875rem",
        }}
      />
      <ParagraphAtom
        text={cell.subtitle}
        key={uuid()}
        style={{
          margin: "0px",
          color: cell.colors[0],
          fontSize: "0.875rem",
        }}
      />
    </TableCell>
  ) : cell.marktitle ? (
    <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        key={uuid()}
        style={{
          fontWeight: cell.weight,
          margin: "0px",
          color: cell.colors[0],
          fontSize: "0.875rem",
        }}
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
        key={uuid()}
        style={{
          fontWeight: cell.weight,
          margin: "0px",
          color: cell.colors[0],
          fontSize: "0.875rem",
        }}
      />
    </TableCell>
  );
}

export default TableRowTextCell;
