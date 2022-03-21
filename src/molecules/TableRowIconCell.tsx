import { MouseEventHandler, ReactNode } from 'react';
import { TableCell } from '@material-ui/core';

import IconAtom from '../atoms/IconAtom';

interface TableRowIconCellProps {
  padding: string;
  textcolor: string;
  align: 'left' | 'center' | 'right';
  size: 'small' | 'medium';
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
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
        style={{ color: textcolor, padding }}
        size={size}
        children={props.children}
      />
    </TableCell>
  );
}

export default TableRowIconCell;
