import { Input, InputAdornment } from "@material-ui/core";
import styled from "styled-components";

interface InputAtomProps {
  fullWidth: boolean;
  adornmentposition?: "start" | "end";
  plain?: string;
  required?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  padding?: string;
  error?: boolean;
  placeholder?: string;
  value: any;
  onChange: any;
  children?: any;
}

function InputAtom({
  adornmentposition,
  plain,
  required,
  disabled,
  multiline,
  rows,
  padding,
  error,
  placeholder,
  fullWidth,
  value,
  onChange,
  ...props
}: InputAtomProps) {
  return (
    <StyledInput
      multiline={multiline}
      rows={rows}
      plain={plain}
      style={padding ? { padding } : {}}
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
    />
  );
}

export default InputAtom;

const StyledInput = styled(Input)<InputAtomProps>`
  ${({ plain }) => (
    plain === 'false' && `
      &.MuiInputBase-root {
        border-bottom: 0px;
        border-radius: 0.5rem;
        background-color: #dae1ec;
      }

      .MuiInputAdornment-root {
        color: #6f809e !important;
        margin-left: 8px;
      }
    `
  )}
`;
