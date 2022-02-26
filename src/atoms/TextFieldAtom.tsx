import { ReactNode, CSSProperties, ChangeEvent } from 'react';
import { InputAdornment, MenuItem, TextField } from "@material-ui/core";
import styled from "styled-components";

interface DropdownOption {
  label: string;
  value: string;
}

interface TextFieldAtomProps {
  value: string;
  label: string;
  select: boolean;
  variant: "filled" | "standard";
  size: "small" | "medium";
  adornmentposition: "start" | "end";
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  helpertext?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  focused?: boolean;
  error?: boolean;
  options?: DropdownOption[];
  children?: ReactNode;
  style?: CSSProperties;
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
  style,
  ...props
}: TextFieldAtomProps) {
  return !select ? (
    <StyledTextFieldAtom
      value={value}
      style={style}
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
      InputProps={
        adornmentposition === "start"
          ? {
              startAdornment: (
                <InputAdornment position={adornmentposition}>
                  {props.children}
                </InputAdornment>
              ),
              disableUnderline: true,
            }
          : {
              endAdornment: (
                <InputAdornment position={adornmentposition}>
                  {props.children}
                </InputAdornment>
              ),
              disableUnderline: true,
            }
      }
    />
  ) : (
    <StyledTextFieldAtom
      select
      style={style}
      value={value}
      onChange={onChange}
      variant={variant}
      size={size}
      label={label}
      InputProps={{ disableUnderline: true }}
    >
      {options!.map((option: DropdownOption) => (
        <MenuItem value={option.value} key={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </StyledTextFieldAtom>
  );
}

export default TextFieldAtom;

const StyledTextFieldAtom = styled(TextField)`
  .MuiInputBase-root {
    border-radius: 0.5rem;
    border-bottom: 0px;
    background-color: #dae1ec;
  }

  .MuiInput-underline::before,
  .MuiInput-underline::after,
  .MuiInput-underline:hover {
    border-bottom: 0px;
  }

  .MuiSelect-root {
    padding: 11px;
  }
`;
