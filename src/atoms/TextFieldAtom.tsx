import { InputAdornment, MenuItem, TextField } from '@mui/material';

interface DropdownOption {
  label: string;
  value: string;
}

interface TextFieldAtomProps {
  variant: 'outlined' | 'filled' | 'standard';
  size: 'small' | 'medium';
  adornmentPosition: 'start' | 'end';
  label: string;
  required?: boolean;
  disabled?: boolean;
  focused?: boolean;
  error?: boolean;
  select: boolean;
  helperText?: string;
  placeholder?: string;
  value: any;
  onChange: any;
  dropdownOptions?: DropdownOption[];
  children?: any;
}

function TextFieldAtom({
  variant,
  size,
  adornmentPosition,
  label,
  required,
  disabled,
  focused,
  select,
  error,
  helperText,
  placeholder,
  value,
  onChange,
  dropdownOptions,
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
        helperText={helperText}
        placeholder={placeholder}
        InputProps={adornmentPosition === 'start' ? {
          startAdornment: (
            <InputAdornment
              position={adornmentPosition}
            >
              {props.children}
            </InputAdornment>
          )
        }: {
          endAdornment: (
            <InputAdornment
              position={adornmentPosition}
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
      {dropdownOptions!.map((option: DropdownOption) => (
        <MenuItem value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    )
  );
}

export default TextFieldAtom;
