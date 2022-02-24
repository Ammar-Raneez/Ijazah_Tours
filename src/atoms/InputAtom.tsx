import { Input, InputAdornment } from "@material-ui/core";
import styled from "styled-components";

interface InputAtomProps {
  adornmentposition: "start" | "end";
  fullWidth: boolean;
  required?: boolean;
  disabled?: boolean;
  padding?: string;
  error?: boolean;
  placeholder?: string;
  value: any;
  onChange: any;
  children?: any;
}

function InputAtom({
  adornmentposition,
  required,
  disabled,
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
      style={padding ? { padding } : {}}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disableUnderline
      startAdornment={
        <InputAdornment position={adornmentposition}>
          {props.children}
        </InputAdornment>
      }
    />
  );
}

export default InputAtom;

const StyledInput = styled(Input)`
  &.MuiInputBase-root {
    border-bottom: 0px;
    border-radius: 0.5rem;
    background-color: #dae1ec;
  }

  .MuiInputAdornment-root {
    color: #6f809e !important;
    margin-left: 8px;
  }
`;
