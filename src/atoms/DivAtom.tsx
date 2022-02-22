import styled from "styled-components";

interface DivAtomProps {
  display?: "flex" | "inline" | "inline-block";
  flexdirection?: "column" | "row";
  justify?:
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | "flex-start"
    | "flex-end";
  align?: "center" | "space-between" | "flex-start" | "flex-end" | "stretch";
  flex?: number;
  padding?: string;
  backgroundcolor?: string;
  height?: string;
  width?: string;
  borderradius?: string;
  children?: any;
}

function DivAtom({
  display,
  flexdirection,
  justify,
  align,
  flex,
  padding,
  backgroundcolor,
  height,
  width,
  borderradius,
  ...props
}: DivAtomProps) {
  return (
    <StyledDivAtom
      display={display}
      flexdirection={flexdirection}
      align={align}
      justify={justify}
      flex={flex}
      padding={padding}
      backgroundcolor={backgroundcolor}
      height={height}
      width={width}
      borderradius={borderradius}
    >
      {props.children}
    </StyledDivAtom>
  );
}

export default DivAtom;

const StyledDivAtom = styled.div<DivAtomProps>`
  display: ${({ display }) => display};
  flex-direction: ${({ flexdirection }) => flexdirection};
  justify-content: ${({ justify }) => justify};
  align-items: ${({ align }) => align};
  flex: ${({ flex }) => flex};
  padding: ${({ padding }) => padding};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: ${({ borderradius }) => borderradius};
`;
