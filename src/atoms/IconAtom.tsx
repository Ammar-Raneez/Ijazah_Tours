import IconButton from "@material-ui/core/IconButton";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface IconAtomProps {
  onClick: MouseEventHandler<HTMLButtonElement> | any;
  size: "small" | "medium";
  textcolor: string;
  padding: string;
  children: any;
}

function IconAtom({ onClick, size, textcolor, padding, ...props }: IconAtomProps) {
  return (
    <StyledIcon size={size} textcolor={textcolor} padding={padding} onClick={onclick}>
      {props.children}
    </StyledIcon>
  );
}

const StyledIcon = styled(IconButton)<IconAtomProps>`
  color: ${({ color }) => color} !important;
  padding: ${({ padding }) => padding} !important;
`;

export default IconAtom;
