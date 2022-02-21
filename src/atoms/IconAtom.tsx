import { IconButton } from '@mui/material';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface IconAtomProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  size: 'small' | 'medium' | 'large';
  children: any;
}

function IconAtom({ onClick, size, ...props }: IconAtomProps) {
  return (
    <StyledIcon size={size} onClick={onClick}>
      {props.children}
    </StyledIcon>
  );
}

const StyledIcon = styled(IconButton)`
  color: ${({ color }) => color} !important;
`

export default IconAtom;
