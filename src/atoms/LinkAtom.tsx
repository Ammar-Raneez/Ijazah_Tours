import { ReactNode, CSSProperties } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

interface LinkAtomProps {
  to: string;
  children: ReactNode;
  style?: CSSProperties;
}

function LinkAtom({ to, style, ...props }: LinkAtomProps) {
  return (
    <StyledNavLink
      style={style}
      activeClassName="active"
      key={uuid()}
      to={to}
    >
      {props.children}
    </StyledNavLink>
  );
}

export default LinkAtom;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
  border-radius: 0.5rem;

  &.active {
    background-color: #7ba8ec;
  }
`;
