// import { ChangeEvent } from 'react';
import { TableCell } from '@material-ui/core';

import TextFieldAtom from '../atoms/TextFieldAtom';
import { libraryStyles } from '../styles';

interface TableRowDropdownCellProps {
  value: string;
  options: any;
  // setValue: any;
}

function TableRowDropdownCell({
  value,
  options,
  // setValue,
}: TableRowDropdownCellProps) {
  return (
    <TableCell>
      <TextFieldAtom
        variant="standard"
        size="medium"
        label=""
        value={value}
        onChange={() => null}
        options={options}
        adornmentposition="end"
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
