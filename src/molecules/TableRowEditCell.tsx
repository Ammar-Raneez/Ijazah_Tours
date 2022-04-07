import { TableCell } from '@material-ui/core';

import TextFieldAtom from '../atoms/TextFieldAtom';
import { libraryStyles } from '../styles';
import FormControlInput from './FormControlInput';

interface TableRowEditCellProps {
  value: string;
  select: boolean;
  align: 'left' | 'center' | 'right';
  options?: any;
  setValue?: any;
}

function TableRowEditCell({
  value,
  select,
  options,
  align,
  setValue,
}: TableRowEditCellProps) {
  return select ? (
    <TableCell align={align}>
      <TextFieldAtom
        variant="standard"
        size="medium"
        label=""
        value={value}
        onChange={(e) => setValue(e.target.value)}
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
  ) : (
    <TableCell align={align}>
      <FormControlInput
        flex={1}
        type="number"
        label=""
        fullWidth
        multiline={false}
        rows={1}
        value={value}
        setValue={setValue}
        placeholder=""
        margin="0"
      />
    </TableCell>
  );
}

export default TableRowEditCell;
