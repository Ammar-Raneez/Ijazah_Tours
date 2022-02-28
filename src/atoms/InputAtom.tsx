import { ReactNode, CSSProperties, ChangeEvent } from 'react';
import { Input, InputAdornment } from "@material-ui/core";
import styled from "styled-components";

interface InputAtomProps {
  value: string | number;
  fullWidth: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  plain?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  error?: boolean;
  rows?: number;
  adornmentposition?: "start" | "end";
  children?: ReactNode;
  style?: CSSProperties;
}

function InputAtom({
  adornmentposition,
  plain,
  type,
  required,
  disabled,
  multiline,
  rows,
  error,
  placeholder,
  fullWidth,
  value,
  onChange,
  style,
  ...props
}: InputAtomProps) {
  return (
    <StyledInput
      multiline={multiline}
      rows={rows}
      plain={plain}
      type={type}
      style={style}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disableUnderline={plain === "false"}
      startAdornment={
        adornmentposition && (
          <InputAdornment position={adornmentposition}>
            {props.children}
          </InputAdornment>
        )
      }
      inputProps={{
        min: 0
      }}
    />
  );
}

export default InputAtom;

const StyledInput = styled(Input)<InputAtomProps>`
  ${({ plain }) =>
    plain === "false" &&
    `
      &.MuiInputBase-root {
        border-bottom: 0px;
        border-radius: 0.5rem;
        background-color: #dae1ec;
      }

      .MuiInputAdornment-root {
        color: #6f809e !important;
        margin-left: 8px;
      }
    `}
`;
