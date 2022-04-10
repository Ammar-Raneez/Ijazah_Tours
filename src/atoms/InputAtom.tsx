import { ReactNode, CSSProperties, ChangeEvent } from 'react';
import { Input, InputAdornment } from '@material-ui/core';
import styled from 'styled-components';

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
  minValue?: number;
  adornmentPosition?: 'start' | 'end';
  children?: ReactNode;
  style?: CSSProperties;
}

function InputAtom({
  adornmentPosition,
  plain,
  type,
  required,
  disabled,
  multiline,
  rows,
  minValue,
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
      style={{ ...style, color: 'black' }}
      value={value}
      onChange={onChange}
      required={required}
      disabled={disabled}
      error={error}
      placeholder={placeholder}
      fullWidth={fullWidth}
      disableUnderline={plain === 'false'}
      startAdornment={
        adornmentPosition && (
          <InputAdornment position={adornmentPosition}>
            {props.children}
          </InputAdornment>
        )
      }
      inputProps={{
        min: minValue || 0,
      }}
    />
  );
}

export default InputAtom;

const StyledInput = styled(Input)<InputAtomProps>`
  ${({ plain }) => plain === 'false' && inputBaseStyle}
`;

const inputBaseStyle = `
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
