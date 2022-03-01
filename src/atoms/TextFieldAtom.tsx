import { ReactNode, CSSProperties, ChangeEvent } from 'react';
import { InputAdornment, MenuItem, TextField } from "@material-ui/core";
import styled from "styled-components";

interface DropdownOption {
  label: string;
  value: string;
}

interface TextFieldAtomProps {
  variant: "filled" | "standard";
  value: string;
  label: string;
  select: boolean;
  size: "small" | "medium";
  adornmentposition: "start" | "end";
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  helpertext?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  disableUnderline?: boolean;
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
  disableUnderline,
  focused,
  select,
  error,
  helpertext,
  type,
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
      type={type}
      required={required}
      disabled={disabled}
      focused={focused}
      error={error}
      helperText={helpertext}
      placeholder={placeholder}
      removebg={type === "date" ? "true" : "false"}
      InputProps={
        adornmentposition === "start"
          ? {
            startAdornment: (
              <InputAdornment position={adornmentposition}>
                {props.children}
              </InputAdornment>
            ),
            disableUnderline: !(type === "date"),
          }
          : {
            endAdornment: (
              <InputAdornment position={adornmentposition}>
                {props.children}
              </InputAdornment>
            ),
            disableUnderline: !(type === "date"),
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
      InputProps={{ disableUnderline: !(disableUnderline === false) }}
      removebg={disableUnderline === false ? "true" : "false"}
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

interface StyleProps {
  removebg?: string;
}

const StyledTextFieldAtom = styled(TextField) <StyleProps>`
  .MuiInputBase-root {
    border-radius: 0.5rem;
    border-bottom: 0px;
    background-color: #dae1ec;
  }

  ${({ removebg }) => removebg === "true" && `
    .MuiInputBase-root {
      background-color: transparent;
    }
    .MuiSelect-root {
      padding: 6px 0px 7px !important;
    }
  `}

  .MuiSelect-root {
    padding: 11px;
  }
`;
