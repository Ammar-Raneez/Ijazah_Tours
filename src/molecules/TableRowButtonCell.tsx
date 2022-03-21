import { MouseEventHandler } from 'react';
import { TableCell } from '@material-ui/core';

import ButtonAtom from '../atoms/ButtonAtom';

interface TableRowButtonCellProps {
  btnwidth: string;
  btnborderradius: string;
  align: 'left' | 'center' | 'right';
  btnsize: 'small' | 'medium';
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
  let backgroundColor;
  let color;
  if (btncolors) {
    [backgroundColor, color] = btncolors;
  } else {
    backgroundColor = cell.status === 'Approved' ? '#41E93E' : '#C1BFBF';
    color = cell.status === 'Approved' ? '#146521' : '#464E5F';
  }

  return (
    <TableCell align={align}>
      <ButtonAtom
        style={{
          width: btnwidth,
          borderRadius: btnborderradius,
          backgroundColor,
          color,
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
