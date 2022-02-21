import Button from '@mui/material/Button';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface ButtonAtomProps {
  text?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  textColor: string;
  backgroundColor: string;
  borderRadius: string;
}

function ButtonAtom({ text, onClick, textColor, backgroundColor, borderRadius }: ButtonAtomProps) {
  return (
    <StyledButton
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled(Button) <ButtonAtomProps>`
  color: ${({ textColor }) => textColor} !important;
  background-color: ${({ backgroundColor }) => backgroundColor} !important;
  border-radius: ${({ borderRadius }) => borderRadius} !important;
`

export default ButtonAtom;