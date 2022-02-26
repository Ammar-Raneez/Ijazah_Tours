import { ReactNode, CSSProperties } from "react";

interface DivAtomProps {
  children?: ReactNode;
  style?: CSSProperties;
}

function DivAtom({ style, ...props }: DivAtomProps) {
  return <DivAtom style={style}>{props.children}</DivAtom>;
}

export default DivAtom;
