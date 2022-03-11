import { TableCell } from '@material-ui/core';
import { v4 as uuid } from 'uuid';
import ParagraphAtom from '../atoms/ParagraphAtom';
import { tableRowTextCellStyles } from '../styles';

interface TableRowTextCellProps {
  cell: {
    title: string | number;
    align: 'left' | 'center' | 'right';
    subtitle?: string;
    marktitle?: boolean;
    colors: string[];
    weight: number;
  };
}

function TableRowTextCell({ cell }: TableRowTextCellProps) {
  let cellData;
  if (cell.subtitle) {
    cellData = <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        key={uuid()}
        style={{
          ...tableRowTextCellStyles.paragraph,
          fontWeight: cell.weight,
          color: cell.colors[0],
        }}
      />
      <ParagraphAtom
        text={cell.subtitle}
        key={uuid()}
        style={{
          ...tableRowTextCellStyles.paragraph,
          color: cell.colors[0],
        }}
      />
    </TableCell>;
  } else if (cell.marktitle) {
    cellData = <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        key={uuid()}
        style={{
          ...tableRowTextCellStyles.paragraph,
          fontWeight: cell.weight,
          color: cell.colors[0],
        }}
        markstyle={{
          border:
            cell.title === 'ACTIVE' ? '1px solid #0A65FF' : '1px solid #B5B5C3',
          borderRadius: '11px',
          backgroundColor: cell.title === 'ACTIVE' ? '#0A65FF' : 'transparent',
          padding: '0.4rem',
          color: cell.title === 'ACTIVE' ? 'white' : '#B5B5C3',
        }}
        mark
      />
    </TableCell>;
  } else {
    cellData = <TableCell align={cell.align}>
      <ParagraphAtom
        text={cell.title}
        key={uuid()}
        style={{
          ...tableRowTextCellStyles.paragraph,
          fontWeight: cell.weight,
          color: cell.colors[0],
        }}
      />
    </TableCell>;
  }

  return cellData;
}

export default TableRowTextCell;
