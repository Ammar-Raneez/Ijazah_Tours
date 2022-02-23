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
  margin?: string;
  backgroundcolor?: string;
  height?: string;
  width?: string;
  borderradius?: string;
  overflowx?: string;
  overflowy?: string;
  children?: any;
}

function DivAtom({
  display,
  flexdirection,
  justify,
  align,
  flex,
  padding,
  margin,
  backgroundcolor,
  height,
  width,
  borderradius,
  overflowx,
  overflowy,
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
      margin={margin}
      backgroundcolor={backgroundcolor}
      height={height}
      width={width}
      borderradius={borderradius}
      overflowx={overflowx}
      overflowy={overflowy}
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
  margin: ${({ margin }) => margin};
  background-color: ${({ backgroundcolor }) => backgroundcolor};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: ${({ borderradius }) => borderradius};
  overflow-x: ${({ overflowx }) => overflowx};
  overflow-y: ${({ overflowy }) => overflowy};
`;
