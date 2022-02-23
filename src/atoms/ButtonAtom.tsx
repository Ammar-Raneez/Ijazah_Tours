import Button from "@material-ui/core/Button";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface ButtonAtomProps {
  text?: string;
  starticon?: any;
  shadow?: string;
  disabled?: boolean;
  weight?: number;
  margin?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  textcolor: string;
  backgroundcolor: string;
  borderradius: string;
  width: string;
  size: "small" | "medium" | "large";
}

function ButtonAtom({
  text,
  starticon,
  shadow,
  disabled,
  weight,
  margin,
  onClick,
  textcolor,
  backgroundcolor,
  borderradius,
  width,
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
      width={width}
      weight={weight}
      margin={margin}
    >
      {text}
    </StyledButton>
  );
}

const StyledButton = styled(Button)<ButtonAtomProps>`
  color: ${({ textcolor }) => textcolor} !important;
  background-color: ${({ backgroundcolor }) => backgroundcolor} !important;
  border-radius: ${({ borderradius }) => borderradius} !important;
  box-shadow: ${({ shadow }) => shadow} !important;
  width: ${({ width }) => width} !important;
  font-weight: ${({ weight }) => weight} !important;
  margin: ${({ margin }) => margin} !important;
  text-transform: none;
`;

export default ButtonAtom;
