import Button from '@material-ui/core/Button';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonAtomProps {
  text?: string;
  starticon?: any;
  shadow?: string;
  disabled?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  textcolor: string;
  backgroundcolor: string;
  borderradius: string;
  size: 'small' | 'medium' | 'large';
}

function ButtonAtom({
  text,
  starticon,
  shadow,
  disabled,
  onClick,
  textcolor,
  backgroundcolor,
  borderradius,
  size,
}: ButtonAtomProps) {
  return (
    <StyledButton
      onClick={onClick}
      textcolor={textcolor}
      backgroundcolor={backgroundcolor}
      borderradius={borderradius}
      starticon={starticon}
      shadow={shadow}
      disabled={disabled}
      size={size}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled(Button)<ButtonAtomProps>`
  color: ${({ textcolor }) => textcolor} !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  border-radius: ${({ borderradius }) => borderradius} !important;
  box-shadow: ${({ shadow })=> shadow} !important;
`;

export default ButtonAtom;
