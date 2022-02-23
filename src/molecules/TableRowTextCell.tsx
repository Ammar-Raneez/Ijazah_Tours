import { v4 as uuid } from "uuid";
import ParagraphAtom from "../atoms/ParagraphAtom";

interface TableRowTextCellProps {
  cell: {
    title: string;
    subtitle?: string;
    colors: string[];
    weight: number;
  };
}

function TableRowTextCell({ cell }: TableRowTextCellProps) {
  return cell.subtitle ? (
    <>
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
    </>
  ) : (
    <ParagraphAtom
      text={cell.title}
      margin="0px"
      color={cell.colors[0]}
      size="0.875rem"
      weight={cell.weight}
      key={uuid()}
    />
  );
}

export default TableRowTextCell;
