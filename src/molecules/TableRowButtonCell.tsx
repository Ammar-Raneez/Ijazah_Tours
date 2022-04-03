import { MouseEventHandler } from 'react';
import { TableCell } from '@material-ui/core';

import ButtonAtom from '../atoms/ButtonAtom';

interface TableRowButtonCellProps {
  btnWidth: string;
  btnBorderRadius: string;
  align: 'left' | 'center' | 'right';
  btnSize: 'small' | 'medium';
  onClick: MouseEventHandler<HTMLButtonElement>;
  btnDisabled?: boolean;
  btnText?: string;
  btnColors?: string[];
  cell?: { status: string };
}

function TableRowButtonCell({
  onClick,
  align,
  btnSize,
  btnWidth,
  btnBorderRadius,
  btnDisabled,
  cell,
  btnText,
  btnColors,
}: TableRowButtonCellProps) {
  let backgroundColor;
  let color;
  if (btnColors) {
    [backgroundColor, color] = btnColors;
  } else {
    backgroundColor = cell!.status === 'Approved' ? '#41E93E' : '#C1BFBF';
    color = cell!.status === 'Approved' ? '#146521' : '#464E5F';
  }

  return (
    <TableCell align={align}>
      <ButtonAtom
        style={{
          width: btnWidth,
          borderRadius: btnBorderRadius,
          backgroundColor,
          color,
        }}
        size={btnSize}
        onClick={onClick}
        text={btnText || cell!.status}
        disabled={btnDisabled}
      />
    </TableCell>
  );
}

export default TableRowButtonCell;
