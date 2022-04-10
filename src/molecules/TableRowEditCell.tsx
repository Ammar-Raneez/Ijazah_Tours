import { FormControl, TableCell } from '@material-ui/core';

import InputAtom from '../atoms/InputAtom';
import TextFieldAtom from '../atoms/TextFieldAtom';
import { libraryStyles } from '../styles';

interface TableRowEditCellProps {
  value: string;
  type: string;
  select: boolean;
  align: 'left' | 'center' | 'right';
  options?: any;
  onSelectChange?: (val: string, type: string) => void;
  onCountChange?: (val: string) => void;
}

function TableRowEditCell({
  value,
  type,
  select,
  options,
  align,
  onSelectChange,
  onCountChange,
}: TableRowEditCellProps) {
  return select ? (
    <TableCell align={align}>
      <TextFieldAtom
        variant="standard"
        size="medium"
        label=""
        value={value}
        onChange={(e) => onSelectChange && onSelectChange(e.target.value, type)!}
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
      <FormControl>
        <InputAtom
          plain="true"
          fullWidth
          multiline={false}
          rows={1}
          value={value}
          type="number"
          onChange={(e) => onCountChange && onCountChange(e.target.value)}
          placeholder=""
          minValue={1}
        />
      </FormControl>
    </TableCell>
  );
}

export default TableRowEditCell;
