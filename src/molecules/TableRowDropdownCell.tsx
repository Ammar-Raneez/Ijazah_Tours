// import { ChangeEvent } from 'react';
import { TableCell } from '@material-ui/core';

import TextFieldAtom from '../atoms/TextFieldAtom';
import { libraryStyles } from '../styles';

interface TableRowDropdownCellProps {
  value: string;
  options: any;
  align: 'left' | 'center' | 'right';
  // setValue: any;
}

function TableRowDropdownCell({
  value,
  options,
  align,
  // setValue,
}: TableRowDropdownCellProps) {
  return (
    <TableCell align={align}>
      <TextFieldAtom
        variant="standard"
        size="medium"
        label=""
        value={value}
        onChange={() => null}
        options={options}
        adornmentPosition="end"
        style={{
          ...libraryStyles.textField,
          flex: 1,
        }}
        disableUnderline={false}
        select
      />
    </TableCell>
  );
}

export default TableRowDropdownCell;
