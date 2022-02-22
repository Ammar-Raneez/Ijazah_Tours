import { InputAdornment, MenuItem, TextField } from '@mui/material';

interface DropdownOption {
  label: string;
  value: string;
}

interface TextFieldAtomProps {
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium';
  adornmentposition: 'start' | 'end';
  label: string;
  required?: boolean;
  disabled?: boolean;
  focused?: boolean;
  error?: boolean;
  select: boolean;
  helpertext?: string;
  placeholder?: string;
  value: any;
  onChange: any;
  options?: DropdownOption[];
  children?: any;
}

function TextFieldAtom({
  variant,
  size,
  adornmentposition,
  label,
  required,
  disabled,
  focused,
  select,
  error,
  helpertext,
  placeholder,
  value,
  onChange,
  options,
  ...props
}: TextFieldAtomProps) {
  return (
    !select ? (
      <TextField
        value={value}
        onChange={onChange}
        variant={variant}
        size={size}
        label={label}
        required={required}
        disabled={disabled}
        focused={focused}
        error={error}
        helperText={helpertext}
        placeholder={placeholder}
        InputProps={adornmentposition === 'start' ? {
          startAdornment: (
            <InputAdornment
              position={adornmentposition}
            >
              {props.children}
            </InputAdornment>
          )
        }: {
          endAdornment: (
            <InputAdornment
              position={adornmentposition}
            >
              {props.children}
            </InputAdornment>
          )
        }}
      />
    ) : (
      <TextField
      select
      value={value}
      onChange={onChange}
      variant={variant}
      size={size}
      label={label}
    >
      {options!.map((option: DropdownOption) => (
        <MenuItem value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    )
  );
}

export default TextFieldAtom;
