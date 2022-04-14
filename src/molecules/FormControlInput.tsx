import { ChangeEvent } from 'react';

import { FormControl, InputLabel } from '@material-ui/core';

import InputAtom from '../atoms/InputAtom';

interface FormControlInputProps {
  label: string;
  value: string | number;
  placeholder: string;
  fullWidth: boolean;
  multiline: boolean;
  rows: number;
  setValue: any;
  disabled?: boolean;
  flex?: number;
  margin?: string;
  width?: string;
  type?: string;
}

function FormControlInput({
  label,
  fullWidth,
  multiline,
  rows,
  value,
  placeholder,
  margin,
  setValue,
  disabled,
  flex,
  width,
  type,
}: FormControlInputProps) {
  return (
    <FormControl style={{ margin, flex, width }}>
      <InputLabel>{label}</InputLabel>
      <InputAtom
        plain="true"
        fullWidth={fullWidth}
        disabled={disabled}
        multiline={multiline}
        rows={rows}
        value={value}
        type={type}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </FormControl>
  );
}

export default FormControlInput;
