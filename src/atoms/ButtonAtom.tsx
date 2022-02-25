import Button from "@material-ui/core/Button";
import { MouseEventHandler } from "react";
import styled from "styled-components";

interface ButtonAtomProps {
  text?: string;
  starticon?: any;
  filter?: string;
  disabled?: boolean;
  weight?: number;
  margin?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  textcolor: string;
  backgroundcolor: string;
  borderradius: string;
  width: string;
  size: "small" | "medium" | "large";
}

function ButtonAtom({
  text,
  starticon,
  filter,
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
      startIcon={starticon}
      filter={filter}
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
  width: ${({ width }) => width} !important;
  font-weight: ${({ weight }) => weight} !important;
  margin: ${({ margin }) => margin} !important;
  filter: ${({ filter }) =>
    `drop-shadow(${filter} rgba(0, 0, 0, 0.25))`} !important;
  text-transform: none;
`;

export default ButtonAtom;
