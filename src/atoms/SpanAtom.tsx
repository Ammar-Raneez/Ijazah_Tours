import styled from "styled-components";

interface SpanAtomProps {
  text?: string;
  color: string;
  size: string;
  margin: string;
  weight: number;
}

function SpanAtom({ text, color, size, margin, weight }: SpanAtomProps) {
  return (
    <StyledSpan
      color={color}
      size={size}
      weight={weight}
      margin={margin}
    >
      {text}
    </StyledSpan>
  );
}

export default SpanAtom;

const StyledSpan = styled.span<SpanAtomProps>`
  color: ${({ color }) => color} !important;
  font-size: ${({ size }) => size} !important;
  margin: ${({ margin }) => margin} !important;
  font-weight: ${({ weight }) => weight} !important;
`