import { IconButton } from '@mui/material';
import { MouseEventHandler } from 'react';
import styled from 'styled-components';

interface IconAtomProps {
  onclick: MouseEventHandler<HTMLButtonElement>;
  size: 'small' | 'medium' | 'large';
  children: any;
}

function IconAtom({ onclick, size, ...props }: IconAtomProps) {
  return (
    <StyledIcon size={size} onClick={onclick}>
      {props.children}
    </StyledIcon>
  );
}

const StyledIcon = styled(IconButton)`
  color: ${({ color }) => color} !important;
`

export default IconAtom;
